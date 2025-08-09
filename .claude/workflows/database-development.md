# Database Development Workflow

## Drizzle ORM & PostgreSQL Integration Pattern

This workflow template guides database development using Drizzle ORM with PostgreSQL.

### 1. Schema Definition
All schema definitions in `src/models/Schema.ts`:

```typescript
import { relations } from 'drizzle-orm';
import { boolean, index, integer, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

// Example table definition
export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  authorId: uuid('author_id').notNull().references(() => users.id),
  published: boolean('published').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, table => ({
  // Indexes for performance
  authorIdx: index('posts_author_idx').on(table.authorId),
  publishedIdx: index('posts_published_idx').on(table.published),
}));

// Define relationships
export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
```

### 2. Migration Generation
After schema changes, generate migrations:

```bash
# Generate migration files
npm run db:generate

# This creates files in migrations/ directory with SQL commands
```

### 3. Database Operations
Common database operations pattern:

```typescript
import { and, desc, eq } from 'drizzle-orm';
// src/app/api/posts/route.ts
import { db } from '@/libs/DB';
import { posts } from '@/models/Schema';

// Create
export async function POST(request: Request) {
  const data = await request.json();

  const [newPost] = await db
    .insert(posts)
    .values(data)
    .returning();

  return Response.json(newPost);
}

// Read with relations
export async function GET() {
  const allPosts = await db
    .select()
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt));

  return Response.json(allPosts);
}

// Update
export async function PUT(request: Request) {
  const { id, ...data } = await request.json();

  const [updatedPost] = await db
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();

  return Response.json(updatedPost);
}

// Delete
export async function DELETE(request: Request) {
  const { id } = await request.json();

  await db
    .delete(posts)
    .where(eq(posts.id, id));

  return Response.json({ success: true });
}
```

### 4. Validation Integration
Create validation schemas for database operations:

```typescript
// src/validations/PostValidation.ts
import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  authorId: z.string().uuid('Invalid author ID'),
  published: z.boolean().default(false),
});

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.string().uuid('Invalid post ID'),
});
```

### 5. Database Utilities
Common database utilities in `src/libs/DB.ts`:

```typescript
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';
import * as schema from '@/models/Schema';

// Database connection
const client = new PGlite(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

// Transaction utility
export async function withTransaction<T>(
  callback: (tx: typeof db) => Promise<T>
): Promise<T> {
  return db.transaction(callback);
}

// Query builder utilities
export const queryBuilder = {
  // Pagination
  paginate: (page: number = 1, limit: number = 10) => ({
    offset: (page - 1) * limit,
    limit,
  }),

  // Common filters
  published: eq(schema.posts.published, true),
  byAuthor: (authorId: string) => eq(schema.posts.authorId, authorId),
};
```

### 6. Testing Database Operations
Test database operations thoroughly:

```typescript
// tests/integration/Database.spec.ts
import { beforeEach, expect, test } from 'vitest';
import { db } from '@/libs/DB';
import { posts, users } from '@/models/Schema';

beforeEach(async () => {
  // Clean database before each test
  await db.delete(posts);
  await db.delete(users);
});

test('should create and retrieve posts', async () => {
  // Test implementation
  const user = await db.insert(users).values({
    email: 'test@example.com',
    name: 'Test User',
  }).returning();

  const post = await db.insert(posts).values({
    title: 'Test Post',
    content: 'Test content',
    authorId: user[0].id,
  }).returning();

  expect(post[0]).toHaveProperty('id');
  expect(post[0].title).toBe('Test Post');
});
```

### 7. Performance Optimization
Database performance best practices:

```typescript
// Add appropriate indexes
export const posts = pgTable('posts', {
  // ... columns
}, table => ({
  // Composite indexes for common queries
  authorPublishedIdx: index('posts_author_published_idx')
    .on(table.authorId, table.published),

  // Full-text search index
  titleContentIdx: index('posts_search_idx')
    .on(table.title, table.content),
}));

// Optimized queries with select only needed fields
const publicPosts = await db
  .select({
    id: posts.id,
    title: posts.title,
    createdAt: posts.createdAt,
    author: {
      name: users.name,
    },
  })
  .from(posts)
  .leftJoin(users, eq(posts.authorId, users.id))
  .where(eq(posts.published, true))
  .limit(10);
```

### Development Checklist
- [ ] Schema defined with proper types and constraints
- [ ] Indexes added for query performance
- [ ] Relations defined between tables
- [ ] Migration generated and reviewed
- [ ] API routes implement CRUD operations
- [ ] Validation schemas created
- [ ] Error handling implemented
- [ ] Database operations tested
- [ ] Performance optimizations applied
- [ ] Transaction boundaries identified

### Common Patterns
- Use transactions for multi-table operations
- Always validate input before database operations
- Implement proper error handling and logging
- Use prepared statements for repeated queries
- Add appropriate indexes for performance
- Follow naming conventions for tables and columns
- Use soft deletes when appropriate
- Implement audit trails for sensitive data

### Migration Best Practices
- Review generated SQL before applying
- Test migrations on development data
- Plan rollback procedures
- Use descriptive migration names
- Avoid breaking changes in production
- Back up database before major migrations
- Monitor performance impact of schema changes

### Integration with Project Stack
- Uses Better Auth tables for user management
- Integrates with API routes for data access
- Works with Zod validation schemas
- Supports TypeScript for type safety
- Compatible with testing frameworks
- Integrates with error monitoring via Sentry
