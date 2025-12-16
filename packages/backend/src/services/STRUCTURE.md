# Services Architecture

This directory contains service modules for the application.

## Current Structure

```
services/
└── auth/              # Authentication & user management
    ├── types.ts       # Auth type exports
    └── user/          # User operations
        ├── delete.ts  # Delete user
        └── get.ts     # Get user by id
```

## Usage

```typescript
// Get a user
import { getUser } from '@starter/backend/services/auth/user/get';

// Delete user
import { deleteUser } from '@starter/backend/services/auth/user/delete';

// Types
import type { User } from '@starter/backend/services/auth/types';
```

## Adding New Domains

Follow this pattern for new features:

```
services/
  notes/
    types.ts
    note/
      create.ts
      get.ts
      update.ts
      delete.ts
      list.ts
```

## Design Principles

1. **Operation Separation** - Each operation in its own file
2. **Explicit Imports** - No barrel files; import directly
3. **Type First** - Define types before implementation
4. **No Hidden Coupling** - Modules only depend on `db`, `schema`, and shared types
