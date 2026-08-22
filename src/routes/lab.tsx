import { createFileRoute } from "@tanstack/react-router";
import { DensityLab } from "@/components/density-lab";
import { AppShell, PageHead } from "@/components/shell";

export const Route = createFileRoute("/lab")({ component: LabPage });

function LabPage() {
  return (
    <AppShell>
      <PageHead
        kicker="Volume V"
        title="A model, not a mirror."
        lede="Pick a Norwood stage. The numbers estimate visible hair, dormant organs, and what each horizon could mean for a 100 cm² crown field. They are teaching tools. They are not your biopsy."
      />
      <div className="pb-12">
        <DensityLab />
      </div>
    </AppShell>
  );
}
