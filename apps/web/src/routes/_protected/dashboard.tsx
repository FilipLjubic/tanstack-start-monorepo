import { createFileRoute } from '@tanstack/react-router';

const DashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-semibold text-2xl">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-medium">Getting Started</h3>
          <p className="mt-2 text-muted-foreground text-sm">
            This is a starter template. Customize it to build your application.
          </p>
        </div>
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
      </div>
    </div>
  );
};

export const Route = createFileRoute('/_protected/dashboard')({
  component: DashboardPage,
});
