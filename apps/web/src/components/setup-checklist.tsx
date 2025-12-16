/**
 * DELETE THIS FILE WHEN SETUP IS COMPLETE
 *
 * This component guides new users through the initial setup process.
 * Once your app is configured, remove this file and update the landing page.
 */

import { Badge } from '@starter/ui/components/shadcn/badge';
import { Button } from '@starter/ui/components/shadcn/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@starter/ui/components/shadcn/card';
import { Link } from '@tanstack/react-router';
import { CheckCircle2, Circle, ExternalLink } from 'lucide-react';

type SetupStatus = {
  database: boolean;
  googleAuth: boolean;
  authSecret: boolean;
  allComplete: boolean;
};

const StatusIcon = ({ done }: { done: boolean }) =>
  done ? (
    <CheckCircle2 className="h-5 w-5 text-green-500" />
  ) : (
    <Circle className="h-5 w-5 text-muted-foreground" />
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
        <div className="rounded-md bg-muted/50 p-3 font-mono text-sm">
          {children}
        </div>
      )}
    </div>
  </div>
);

export const SetupChecklist = ({ status }: { status: SetupStatus }) => {
  if (status.allComplete) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle>Setup Complete</CardTitle>
          <CardDescription>
            Your app is configured and ready to use.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button asChild>
            <Link to="/auth/login">Go to Login</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Setup Checklist</CardTitle>
          <Badge variant="outline">
            {
              [status.database, status.googleAuth, status.authSecret].filter(
                Boolean
              ).length
            }
            /3
          </Badge>
        </div>
        <CardDescription>
          Complete these steps to get your app running.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <SetupStep
          title="1. Database Connection"
          description="Connect to PostgreSQL via Supabase or direct connection."
          done={status.database}
        >
          <div className="space-y-2">
            <p className="text-muted-foreground">For local development:</p>
            <code>cd packages/backend && pnpm supabase start</code>
            <p className="mt-2 text-muted-foreground">Then run migrations:</p>
            <code>pnpm --filter @starter/backend drizzle:migrate</code>
          </div>
        </SetupStep>

        <SetupStep
          title="2. Auth Secret"
          description="Set a secure secret for session encryption."
          done={status.authSecret}
        >
          <div className="space-y-2">
            <p className="text-muted-foreground">Generate a secure secret:</p>
            <code>openssl rand -base64 32</code>
            <p className="mt-2 text-muted-foreground">
              Add to your .env files:
            </p>
            <code>BETTER_AUTH_SECRET=your-generated-secret</code>
          </div>
        </SetupStep>

        <SetupStep
          title="3. Google OAuth (Optional)"
          description="Enable Google sign-in for your users."
          done={status.googleAuth}
        >
          <div className="space-y-2">
            <p className="text-muted-foreground">
              Create credentials in Google Cloud Console:
            </p>
            <a
              href="https://console.cloud.google.com/apis/credentials"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Google Cloud Console <ExternalLink className="h-3 w-3" />
            </a>
            <p className="mt-2 text-muted-foreground">
              Add to your .env files:
            </p>
            <code>
              GOOGLE_CLIENT_ID=...
              <br />
              GOOGLE_CLIENT_SECRET=...
            </code>
            <p className="mt-2 text-muted-foreground text-xs">
              You can add other providers (GitHub, Discord, etc.) in
              packages/backend/src/auth.ts
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
