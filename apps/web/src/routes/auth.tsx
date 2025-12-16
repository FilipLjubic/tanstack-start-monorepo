import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: AuthLayoutComponent,
});

function AuthLayoutComponent() {
  return <Outlet />;
}
