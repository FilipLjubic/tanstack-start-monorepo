# Services Architecture

This directory contains service modules for the application.

Search for `DELETE` in the project to find example code that can be removed.

## Current Structure

```
services/
├── auth/              # Authentication & user management
│   ├── types.ts       # Auth type exports
│   └── user/          # User operations
│       ├── delete.ts  # Delete user account
│       └── get.ts     # Get user by id
├── health/            # Health check endpoint
│   └── check.ts       # Database health check
└── note/              # Example CRUD (deletable)
    ├── types.ts
    ├── create.ts
    ├── delete.ts
    └── list.ts
```

## Usage

```typescript
import { getUser } from '@starter/backend/services/auth/user/get';
import { deleteUser } from '@starter/backend/services/auth/user/delete';
import type { User } from '@starter/backend/services/auth/types';

import { listNotes } from '@starter/backend/services/note/list';
import { createNote } from '@starter/backend/services/note/create';
import type { Note } from '@starter/backend/services/note/types';
```

## Adding New Domains

Follow this pattern for new features:

```
services/
  posts/
    types.ts
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
