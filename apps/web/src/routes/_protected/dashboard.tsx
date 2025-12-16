/**
 * EXAMPLE: Dashboard with Notes CRUD - DELETE when building your own features
 *
 * This dashboard demonstrates:
 * - Server functions with protected middleware
 * - TanStack Query for data fetching and mutations
 * - Basic CRUD operations pattern
 *
 * To remove this example:
 * 1. Replace this file with your own dashboard
 * 2. Delete apps/web/src/server/note/ directory
 * 3. Delete packages/backend/src/services/note/ directory
 * 4. Remove the note table from packages/backend/src/schema.ts
 * 5. Remove notes key from apps/web/src/lib/query-keys.ts
 */

import type { Note } from '@starter/backend/services/note/types';
import { Button } from '@starter/ui/components/shadcn/button';
import { Input } from '@starter/ui/components/shadcn/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { queryKeys } from '../../lib/query-keys';
import { createNoteAction } from '../../server/note/create';
import { deleteNoteAction } from '../../server/note/delete';
import { getNotes } from '../../server/note/list';

const NoteItem = ({ note, onDelete }: { note: Note; onDelete: () => void }) => {
  return (
    <div className="flex items-center justify-between rounded-lg border bg-card p-4">
      <div>
        <h3 className="font-medium">{note.title}</h3>
        {note.content && (
          <p className="mt-1 text-muted-foreground text-sm">{note.content}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const NotesExample = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');

  const { data: notes = [], isLoading } = useQuery({
    queryKey: queryKeys.notes.list,
    queryFn: () => getNotes(),
  });

  const createMutation = useMutation({
    mutationFn: createNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.list });
      setTitle('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notes.list });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      createMutation.mutate({ data: { title: title.trim() } });
    }
  };

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleSubmit}
        className="flex gap-2"
      >
        <Input
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={createMutation.isPending}
        />
        <Button
          type="submit"
          disabled={!title.trim() || createMutation.isPending}
        >
          Add
        </Button>
      </form>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          No notes yet. Create one above.
        </p>
      ) : (
        <div className="space-y-2">
          {notes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              onDelete={() =>
                deleteMutation.mutate({ data: { noteId: note.id } })
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-medium">Authentication</h3>
          <p className="mt-2 text-muted-foreground text-sm">
            You are signed in with Better Auth and Google OAuth.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-medium">Database</h3>
          <p className="mt-2 text-muted-foreground text-sm">
            PostgreSQL with Drizzle ORM is ready to use.
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-medium">Server Functions</h3>
          <p className="mt-2 text-muted-foreground text-sm">
            Type-safe server functions with middleware support.
          </p>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <div className="mb-4">
          <h3 className="font-medium">Notes Example</h3>
          <p className="text-muted-foreground text-sm">
            A simple CRUD example. Delete this when building your own features.
          </p>
        </div>
        <NotesExample />
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_protected/dashboard')({
  component: DashboardPage,
});
