/**
 * DELETE THIS FILE WHEN SETUP IS COMPLETE
 *
 * This component guides new users through the initial setup process.
 * Once your app is configured, remove this file and update the landing page.
 */

import { Badge } from '@starter/ui/components/shadcn/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@starter/ui/components/shadcn/card';
import { CheckCircle2, Circle, ExternalLink } from 'lucide-react';
import type { SetupStatus } from '@/server/setup/status';

const StatusIcon = ({ done }: { done: boolean }) =>
  done ? (
    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
  ) : (
    <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
  );

const SetupStep = ({
  title,
  description,
  done,
  children,
}: {
  title: string;
  description: string;
  done: boolean;
  children?: React.ReactNode;
}) => (
  <div className="flex gap-4">
    <div className="mt-0.5">
      <StatusIcon done={done} />
    </div>
    <div className="flex-1 space-y-2">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      {!done && children && (
        <div className="rounded-md bg-muted/50 p-3 text-sm">{children}</div>
      )}
    </div>
  </div>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="block rounded bg-background/80 px-2 py-1 font-mono text-xs">
    {children}
  </code>
);

const Confetti = ({ delay, color }: { delay: string; color: string }) => (
  <div
    className="absolute animate-[confetti-fall_3s_ease-in-out_forwards] opacity-0"
    style={{
      left: `${Math.random() * 100}%`,
      animationDelay: delay,
      color,
    }}
  >
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      className="animate-[confetti-spin_1s_linear_infinite]"
      style={{ animationDelay: delay }}
      aria-hidden="true"
    >
      {Math.random() > 0.5 ? (
        <circle
          cx="6"
          cy="6"
          r="5"
          fill="currentColor"
        />
      ) : (
        <rect
          x="1"
          y="1"
          width="10"
          height="10"
          rx="2"
          fill="currentColor"
          transform={`rotate(${Math.random() * 45} 6 6)`}
        />
      )}
    </svg>
  </div>
);

const confettiColors = [
  '#10b981',
  '#f59e0b',
  '#ec4899',
  '#8b5cf6',
  '#06b6d4',
  '#f97316',
];

const SetupComplete = ({ isProduction }: { isProduction: boolean }) => (
  <div className="relative mx-auto w-full max-w-lg">
    <style>
      {`
        @keyframes confetti-fall {
          0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(200px) rotate(720deg); opacity: 0; }
        }
        @keyframes confetti-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes check-draw {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
      `}
    </style>

    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {confettiColors.flatMap((color, i) =>
        Array.from({ length: 4 }, (_, j) => (
          <Confetti
            key={`${i}-${j}`}
            delay={`${(i * 4 + j) * 0.1}s`}
            color={color}
          />
        ))
      )}
    </div>

    <div className="relative overflow-hidden rounded-3xl border-2 border-amber-300/60 border-dashed bg-gradient-to-br from-amber-50 via-white to-emerald-50 p-10 shadow-xl dark:border-amber-500/30 dark:from-amber-950/20 dark:via-background dark:to-emerald-950/20">
      <div className="absolute top-4 right-4 font-mono text-[10px] text-amber-600/40 uppercase tracking-widest dark:text-amber-400/30">
        Setup Complete
      </div>

      <div className="absolute bottom-0 left-0 h-32 w-32 translate-x-[-50%] translate-y-[50%] rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="absolute top-0 right-0 h-24 w-24 translate-x-[50%] translate-y-[-50%] rounded-full bg-amber-400/20 blur-3xl" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full bg-emerald-400/30"
            style={{ animation: 'pulse-ring 2s ease-out infinite' }}
          />
          <div
            className="absolute inset-0 rounded-full bg-emerald-400/20"
            style={{ animation: 'pulse-ring 2s ease-out infinite 0.5s' }}
          />
          <div
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 shadow-emerald-500/30 shadow-lg"
            style={{ animation: 'wiggle 0.5s ease-in-out 0.3s' }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{
                strokeDasharray: 100,
                animation: 'check-draw 0.5s ease-out 0.5s forwards',
                strokeDashoffset: 100,
              }}
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <div className="space-y-3 text-center">
          <h3 className="font-light font-serif text-3xl text-foreground/90 italic tracking-tight">
            You did it!
          </h3>
          <p className="mx-auto max-w-xs text-balance text-muted-foreground leading-relaxed">
            {isProduction
              ? 'Your production deployment is fully configured and ready to go.'
              : 'Everything is configured and your app is ready to launch. Time to build something great.'}
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50/80 px-5 py-2.5 dark:border-emerald-800 dark:bg-emerald-950/50">
          <div className="flex -space-x-1">
            <div className="h-2.5 w-2.5 rounded-full border-2 border-emerald-50 bg-emerald-500 dark:border-emerald-950" />
            <div className="h-2.5 w-2.5 rounded-full border-2 border-emerald-50 bg-emerald-500 dark:border-emerald-950" />
            <div className="h-2.5 w-2.5 rounded-full border-2 border-emerald-50 bg-emerald-500 dark:border-emerald-950" />
          </div>
          <span className="font-medium text-emerald-700 text-sm dark:text-emerald-300">
            All checks passed
          </span>
        </div>
      </div>
    </div>
  </div>
);

const LocalSetupChecklist = ({ status }: { status: SetupStatus }) => {
  const completedCount = [
    status.database.connected && status.database.migrated,
    status.googleAuth,
  ].filter(Boolean).length;

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Local Development Setup</CardTitle>
          <Badge variant="outline">{completedCount}/2</Badge>
        </div>
        <CardDescription>
          Complete these steps to run the app locally.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SetupStep
          title="1. Database"
          description="Start local Supabase and run migrations."
          done={status.database.connected && status.database.migrated}
        >
          <div className="space-y-3">
            {!status.database.connected ? (
              <>
                <p className="text-muted-foreground">
                  Start local Supabase (requires Docker):
                </p>
                <Code>pnpm --filter @starter/backend db:start</Code>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">
                  Database connected. Run migrations and seed:
                </p>
                <Code>pnpm --filter @starter/backend db:reset</Code>
              </>
            )}
          </div>
        </SetupStep>

        <SetupStep
          title="2. Google OAuth"
          description="Enable Google sign-in for authentication."
          done={status.googleAuth}
        >
          <div className="space-y-3">
            <p className="text-muted-foreground">
              1. Create OAuth credentials:
            </p>
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Google Cloud Console <ExternalLink className="h-3 w-3" />
            </a>
            <p className="text-muted-foreground">
              2. Configure OAuth consent screen
            </p>
            <p className="text-muted-foreground">
              3. Create OAuth 2.0 credentials (Web application)
            </p>
            <p className="text-muted-foreground">
              4. Add authorized redirect URI:
            </p>
            <Code>http://localhost:3000/api/auth/callback/google</Code>
            <p className="text-muted-foreground">5. Add to apps/web/.env:</p>
            <Code>
              GOOGLE_CLIENT_ID=your-client-id
              <br />
              GOOGLE_CLIENT_SECRET=your-client-secret
            </Code>
            <p className="text-muted-foreground text-xs">
              Restart the dev server after updating .env
            </p>
          </div>
        </SetupStep>

        <div className="border-muted-foreground/20 border-t pt-4">
          <p className="text-muted-foreground text-xs">
            Once configured, delete{' '}
            <code className="rounded bg-muted px-1">
              apps/web/src/components/setup-checklist.tsx
            </code>{' '}
            and update the landing page.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const ProductionSetupChecklist = ({ status }: { status: SetupStatus }) => {
  const completedCount = [
    status.database.connected && status.database.migrated,
    status.googleAuth,
  ].filter(Boolean).length;

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Production Setup</CardTitle>
          <Badge variant="outline">{completedCount}/2</Badge>
        </div>
        <CardDescription>
          Complete these steps to get your Railway deployment working.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SetupStep
          title="1. Database"
          description="Connect to a PostgreSQL database and run migrations."
          done={status.database.connected && status.database.migrated}
        >
          <div className="space-y-3">
            {!status.database.connected ? (
              <>
                <p className="text-muted-foreground">
                  Add DATABASE_URL in Railway variables. Options:
                </p>
                <ul className="list-disc space-y-1 pl-4 text-muted-foreground text-xs">
                  <li>
                    <a
                      href="https://supabase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Supabase
                    </a>{' '}
                    - Free tier, includes extras
                  </li>
                  <li>
                    <a
                      href="https://neon.tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Neon
                    </a>{' '}
                    - Serverless Postgres
                  </li>
                  <li>Railway Postgres - Add as service in project</li>
                </ul>
                <p className="text-muted-foreground">
                  Then redeploy the service.
                </p>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">
                  Database connected. Run migrations from your local machine:
                </p>
                <Code>
                  # Create packages/backend/.env.prod with production
                  DATABASE_URL
                  <br />
                  pnpm --filter @starter/backend db:migrate:prod
                </Code>
              </>
            )}
          </div>
        </SetupStep>

        <SetupStep
          title="2. Google OAuth"
          description="Enable Google sign-in for your users."
          done={status.googleAuth}
        >
          <div className="space-y-3">
            <p className="text-muted-foreground">
              1. Create OAuth credentials:
            </p>
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Google Cloud Console <ExternalLink className="h-3 w-3" />
            </a>
            <p className="text-muted-foreground">
              2. Configure OAuth consent screen
            </p>
            <p className="text-muted-foreground">
              3. Create OAuth 2.0 credentials (Web application)
            </p>
            <p className="text-muted-foreground">
              4. Add authorized redirect URI:
            </p>
            <Code>https://your-app.railway.app/api/auth/callback/google</Code>
            <p className="text-muted-foreground">
              5. Add to Railway variables:
            </p>
            <Code>
              GOOGLE_CLIENT_ID=your-client-id
              <br />
              GOOGLE_CLIENT_SECRET=your-client-secret
            </Code>
            <p className="text-muted-foreground text-xs">
              Railway will automatically redeploy with the new variables.
            </p>
          </div>
        </SetupStep>

        <div className="border-muted-foreground/20 border-t pt-4">
          <p className="text-muted-foreground text-xs">
            Once configured, delete{' '}
            <code className="rounded bg-muted px-1">
              apps/web/src/components/setup-checklist.tsx
            </code>{' '}
            and update the landing page.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const SetupChecklist = ({ status }: { status: SetupStatus }) => {
  if (status.allComplete) {
    return <SetupComplete isProduction={status.isProduction} />;
  }

  if (status.isProduction) {
    return <ProductionSetupChecklist status={status} />;
  }

  return <LocalSetupChecklist status={status} />;
};
