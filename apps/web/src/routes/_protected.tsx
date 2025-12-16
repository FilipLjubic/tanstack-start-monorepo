import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@starter/ui/components/shadcn/breadcrumb';
import { Separator } from '@starter/ui/components/shadcn/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@starter/ui/components/shadcn/sidebar';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AppSidebar } from '@/components/shared/layout/app-sidebar';
import { UserProvider } from '@/contexts/user-context';

const ProtectedLayout = () => {
  const { user } = Route.useLoaderData();

  return (
    <UserProvider user={user}>
      <SidebarProvider defaultOpen={true}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </UserProvider>
  );
};

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/auth/login' });
    }
  },
  loader: ({ context }) => {
    if (!context.user) {
      throw new Error('User not found in context after auth check');
    }
    return { user: context.user };
  },
  component: ProtectedLayout,
});
