// app/portal/genealogy/page.tsx (or wherever this component lives)
import { Suspense } from "react";
import { getOrganizationalChart } from "./actions";
import { SidebarInset } from "@/components/ui/sidebar";
import GenealogyClient from "./genealogyClient";

// Loading component
function GenealogyLoading() {
  return (
    <SidebarInset className="w-full">
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading organizational chart...</div>
      </div>
    </SidebarInset>
  );
}

// Main server component
export default async function Genealogy() {
  const orgData = await getOrganizationalChart();

  return (
    <Suspense fallback={<GenealogyLoading />}>
      <GenealogyClient orgData={orgData} />
    </Suspense>
  );
}
