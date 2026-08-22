import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/shell";

export const Route = createFileRoute("/tooth")({
  component: ToothLayout,
});

function ToothLayout() {
  return (
    <AppShell organ="tooth">
      <Outlet />
    </AppShell>
  );
}
