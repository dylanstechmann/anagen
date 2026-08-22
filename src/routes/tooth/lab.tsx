import { createFileRoute } from "@tanstack/react-router";
import { ToothLab } from "@/components/tooth-lab";
import { PageHead } from "@/components/shell";

export const Route = createFileRoute("/tooth/lab")({ component: ToothLabPage });

function ToothLabPage() {
  return (
    <>
      <PageHead
        kicker="Tooth · Lab"
        title="Name the tissue that died."
        lede="Punch, fire, and lasers do not delete ‘teeth.’ They kill some of six tissues. The method follows from which ones. Defaults below are a plausible mixed injury — not yours."
      />
      <div className="pb-12">
        <ToothLab />
      </div>
    </>
  );
}
