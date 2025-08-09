# Authentication Flow Development Workflow

## Better Auth Integration Pattern

This workflow template guides development of authentication features using Better Auth.

### 1. Authentication Schema Extensions
When extending user authentication:

```typescript
// src/models/Schema.ts - Add custom fields to user table
export const users = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('emailVerified').notNull().default(false),
  image: text('image'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
  updatedAt: timestamp('updatedAt').notNull().defaultNow(),
  // Add custom fields here
});
```

### 2. Authentication Configuration
Better Auth configuration in `src/libs/Auth.ts`:

```typescript
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  plugins: [
    // Add plugins as needed
  ],
});
```

### 3. API Route Implementation
Authentication API routes follow this pattern:

```typescript
// src/app/api/auth/[...all]/route.ts
import { auth } from '@/libs/Auth';

export const { GET, POST } = auth.handler;
```

### 4. Client-Side Integration
Authentication client setup in `src/libs/AuthClient.ts`:

```typescript
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

export const { useSession, signIn, signOut } = authClient;
```

### 5. Form Components
Authentication forms should use React Hook Form with Zod validation:

```typescript
import { zodResolver } from '@hookform/resolvers/zod';
// src/components/AuthForm.tsx
import { useForm } from 'react-hook-form';
import { signInSchema } from '@/validations/AuthValidation';

export function SignInForm() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
  });

  // Implementation here
}
```

### 6. Validation Schemas
Authentication validation in `src/validations/AuthValidation.ts`:

```typescript
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
```

### 7. Middleware Integration
Route protection in `src/middleware.ts`:

```typescript
import { betterFetch } from '@better-fetch/fetch';

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch('/api/auth/get-session', {
    baseURL: request.nextUrl.origin,
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  // Route protection logic
}
```

### 8. Testing Authentication
Test authentication flows comprehensively:

```typescript
// tests/integration/Auth.spec.ts
import { expect, test } from '@playwright/test';

test.describe('Authentication', () => {
  test('should sign in successfully', async ({ page }) => {
    // Test implementation
  });

  test('should handle invalid credentials', async ({ page }) => {
    // Test implementation
  });
});
```

### Development Checklist
- [ ] Database schema updated if needed
- [ ] Validation schemas created/updated
- [ ] API routes implemented
- [ ] Client-side hooks configured
- [ ] Forms created with proper validation
- [ ] Middleware updated for route protection
- [ ] Email templates configured
- [ ] Error handling implemented
- [ ] Tests written for all flows
- [ ] Internationalization added
- [ ] Security review completed

### Common Patterns
- Always use server-side session validation
- Implement proper CSRF protection
- Use secure cookie settings
- Handle email verification flows
- Implement password reset functionality
- Add rate limiting for auth endpoints
- Log security events for monitoring

### Integration with Project Stack
- Uses Drizzle ORM for data persistence
- Integrates with Arcjet for rate limiting
- Uses Zod for validation
- Supports internationalization with next-intl
- Works with Tailwind CSS components
- Compatible with Sentry error monitoring
