import { Button } from '@starter/ui/components/shadcn/button';
import { createFileRoute, Link } from '@tanstack/react-router';
import { SetupChecklist } from '@/components/setup-checklist';
import { getSetupStatus } from '@/server/setup/status';

const FeatureCard = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="rounded-lg border border-border bg-card p-6">
    <h3 className="font-semibold text-lg">{title}</h3>
    <p className="mt-2 text-muted-foreground text-sm">{description}</p>
  </div>
);

const LandingPage = () => {
  const status = Route.useLoaderData();

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center gap-8 px-4 py-16">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-bold font-display text-4xl tracking-tight sm:text-5xl">
            TanStack Monorepo Starter
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            A production-ready starter template with TanStack Start, Better
            Auth, Drizzle ORM, and Railway deployment.
          </p>
        </div>

        {/* DELETE THIS BLOCK WHEN SETUP IS COMPLETE */}
        <SetupChecklist status={status} />
        {/* END DELETE */}

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
          >
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </Button>
        </div>

        <div className="mt-8 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="TanStack Start"
            description="Full-stack React framework with file-based routing and server functions"
          />
          <FeatureCard
            title="Better Auth"
            description="Type-safe authentication with Google OAuth and session management"
          />
          <FeatureCard
            title="Drizzle ORM"
            description="TypeScript ORM with PostgreSQL and automatic migrations"
          />
          <FeatureCard
            title="Railway Ready"
            description="Pre-configured for one-click deployment to Railway"
          />
          <FeatureCard
            title="React 19"
            description="Latest React with compiler optimization enabled"
          />
          <FeatureCard
            title="Tailwind CSS v4"
            description="Utility-first CSS with shadcn/ui components"
          />
        </div>
      </main>
    </div>
  );
};

export const Route = createFileRoute('/_public/')({
  component: LandingPage,
  loader: () => getSetupStatus(),
  head: () => ({
    meta: [
      { title: 'TanStack Starter' },
      {
        name: 'description',
        content:
          'A monorepo starter with TanStack Start, Better Auth, Drizzle, and Railway deployment',
      },
    ],
  }),
});
