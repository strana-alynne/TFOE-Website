import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "@mui/icons-material";
import { ProcessedOrgData } from "./actions";

interface GenealogyClientProps {
  orgData: ProcessedOrgData | null;
}

export default function GenealogyClient({ orgData }: GenealogyClientProps) {
  function fillEmptyPositions<T extends { name: string; imageUrl?: string }>(
    data: T[] | undefined,
    requiredCount: number
  ): T[] {
    const existing = data || [];
    const filled = [...existing];

    // Add TBA entries for missing positions
    while (filled.length < requiredCount) {
      filled.push({
        name: "TBA",
        imageUrl: undefined,
      } as T);
    }

    return filled;
  }

  if (!orgData) {
    return (
      <SidebarInset className="w-full">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">No organizational data found</div>
        </div>
      </SidebarInset>
    );
  }
  return (
    <SidebarInset className="w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                href="/portal/genealogy"
                className="text-muted-foreground"
              >
                Eagles Club Organizational Chart
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">
            Eagles Club Organizational Chart
          </h1>
        </div>

        <div className="space-y-8">
          {/* Top Executive Officials */}
          <section>
            <h2 className="text-lg font-bold mb-4">A. Elected Officials</h2>

            {/* Level 1: President, Vice President */}
            <div className="flex justify-center">
              <div className="space-y-4 mb-4 w-full max-w-md">
                <OfficialCard
                  title="National President"
                  name={orgData.natlpresident?.name ?? "TBA"}
                  eagle={true}
                  highlighted={
                    !orgData.natlpresident?.name ||
                    orgData.natlpresident?.name === "TBA"
                  }
                  photo={orgData.natlpresident?.imageUrl || "/logo.png"}
                />
                <OfficialCard
                  title="Governor"
                  name={orgData.governor?.name ?? "TBA"}
                  eagle={true}
                  highlighted={
                    !orgData.governor?.name || orgData.governor?.name === "TBA"
                  }
                  photo={orgData.governor?.imageUrl || "/logo.png"}
                />
                <OfficialCard
                  title="Club President"
                  name={orgData.clubpresident?.name ?? "TBA"}
                  eagle={true}
                  highlighted={
                    !orgData.clubpresident?.name ||
                    orgData.clubpresident?.name === "TBA"
                  }
                  photo={orgData.clubpresident?.imageUrl || "/logo.png"}
                />
                <OfficialCard
                  title="Club Vice-President"
                  name={orgData.clubvicepresident?.name ?? "TBA"}
                  eagle={true}
                  highlighted={
                    !orgData.clubvicepresident?.name ||
                    orgData.clubvicepresident?.name === "TBA"
                  }
                  photo={orgData.clubvicepresident?.imageUrl || "/logo.png"}
                />
              </div>
            </div>

            {/* Assemblymen */}
            {orgData.assemblymen && orgData.assemblymen.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orgData.assemblymen.map((member, index) => (
                    <OfficialCard
                      key={index}
                      title="Club Assemblymen"
                      name={member.name}
                      eagle={true}
                      photo={member.imageUrl || "/logo.png"}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Alternate Assemblymen */}
            {orgData.alternateassemblymen &&
              orgData.alternateassemblymen.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {orgData.alternateassemblymen.map((member, index) => (
                    <OfficialCard
                      key={index}
                      title="Club Alternate Assemblymen"
                      name={member.name}
                      eagle={true}
                      photo={member.imageUrl || "/logo.png"}
                    />
                  ))}
                </div>
              )}

            <h2 className="text-lg font-bold mb-4">B. Appointed Officials</h2>

            {/* Level 2: Vice President, Secretary, Treasurer */}
            <div className="flex justify-center">
              <div className="space-y-4 mb-4 w-full max-w-md">
                <OfficialCard
                  title="Club Secretary"
                  name={orgData.secretary?.name ?? "TBA"}
                  eagle={true}
                  highlighted={
                    !orgData.secretary?.name ||
                    orgData.secretary?.name === "TBA"
                  }
                  photo={orgData.secretary?.imageUrl || "/logo.png"}
                />
                <OfficialCard
                  title="Club Assistant Secretary"
                  name={orgData.assistantsecretary?.name ?? "TBA"}
                  eagle={true}
                  highlighted={
                    !orgData.assistantsecretary?.name ||
                    orgData.assistantsecretary?.name === "TBA"
                  }
                  photo={orgData.assistantsecretary?.imageUrl || "/logo.png"}
                />
                <OfficialCard
                  title="Club Treasurer"
                  name={orgData.treasurer?.name ?? "TBA"}
                  eagle={true}
                  highlighted={
                    !orgData.treasurer?.name ||
                    orgData.treasurer?.name === "TBA"
                  }
                  photo={orgData.treasurer?.imageUrl || "/logo.png"}
                />
                <OfficialCard
                  title="Club Assistant Treasurer"
                  name={orgData.assistanttreasurer?.name ?? "TBA"}
                  eagle={true}
                  highlighted={
                    !orgData.assistanttreasurer?.name ||
                    orgData.assistanttreasurer?.name === "TBA"
                  }
                  photo={orgData.assistanttreasurer?.imageUrl || "/logo.png"}
                />
                <OfficialCard
                  title="Club Auditor"
                  name={orgData.auditor?.name ?? "TBA"}
                  eagle={true}
                  highlighted={
                    !orgData.auditor?.name || orgData.auditor?.name === "TBA"
                  }
                  photo={orgData.auditor?.imageUrl || "/logo.png"}
                />
                <OfficialCard
                  title="Club Assistant Auditor"
                  name={orgData.assistantauditor?.name ?? "TBA"}
                  eagle={true}
                  highlighted={
                    !orgData.assistantauditor?.name ||
                    orgData.assistantauditor?.name === "TBA"
                  }
                  photo={orgData.assistantauditor?.imageUrl || "/logo.png"}
                />
              </div>
            </div>
          </section>

          {/* Board of Directors */}
          {orgData.clubdirectors && orgData.clubdirectors.length > 0 && (
            <section>
              <h2 className="text-lg font-bold mb-4">
                Club Board of Directors
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {fillEmptyPositions(orgData.clubdirectors, 5).map(
                  (director, index) => (
                    <OfficialCard
                      key={index}
                      title="Board Member"
                      name={director.name}
                      eagle={true}
                      highlighted={!director.name || director.name === "TBA"}
                      photo={director.imageUrl || "/logo.png"}
                    />
                  )
                )}
              </div>
            </section>
          )}

          {/* Committees - First Row */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Ways & Means Committee */}
              <CommitteeCard
                title="Ways & Means Committee"
                chairman={orgData.waysandmeans?.name ?? "TBA"}
                chairmanPhoto={orgData.waysandmeans?.imageUrl || "/logo.png"}
                members={fillEmptyPositions(orgData.waysandmeansmembers, 3).map(
                  (member) => ({
                    name: member.name,
                    highlighted: !member.name || member.name === "TBA",
                    photo: member.imageUrl || "/logo.png",
                  })
                )}
              />

              {/* Tribunal & Grievance Committee */}
              <CommitteeCard
                title="Tribunal & Grievance Committee"
                chairman={orgData.tribunalchair?.name ?? "TBA "}
                chairmanPhoto={orgData.tribunalchair?.imageUrl || "/logo.png"}
                members={fillEmptyPositions(orgData.tribunalmembers, 3).map(
                  (member) => ({
                    name: member.name,
                    highlighted: !member.name || member.name === "TBA",
                    photo: member.imageUrl || "/logo.png",
                  })
                )}
              />

              {/* Oversight Committee */}

              <CommitteeCard
                title="Oversight Committee"
                chairman={orgData.oversightchair?.name ?? "TBA"}
                chairmanPhoto={orgData.oversightchair?.imageUrl || "/logo.png"}
                members={
                  fillEmptyPositions(orgData.oversightmembers, 3).map(
                    (member) => ({
                      name: member.name,
                      highlighted: !member.name || member.name === "TBA",
                      photo: member.imageUrl || "/logo.png",
                    })
                  ) || []
                }
              />
            </div>
          </section>

          {/* Committees - Second Row */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Alalavang Agila & Special Projects Committee */}
              <CommitteeCard
                title="Alalayang Agila & Special Projects Committee"
                chairman={orgData.alalayagilachair?.name ?? "TBA"}
                chairmanPhoto={
                  orgData.alalayagilachair?.imageUrl || "/logo.png"
                }
                members={
                  fillEmptyPositions(orgData.alalayagilachairmembers, 3).map(
                    (member) => ({
                      name: member.name,
                      highlighted: !member.name || member.name === "TBA",
                      photo: member.imageUrl || "/logo.png",
                    })
                  ) || []
                }
              />

              {/* Protocol & Peace Committee */}

              <CommitteeCard
                title="Protocol & Peace Committee"
                chairman={orgData.protocolchair?.name ?? "TBA"}
                chairmanPhoto={orgData.protocolchair?.imageUrl || "/logo.png"}
                members={
                  fillEmptyPositions(orgData.protocolmembers, 3).map(
                    (member) => ({
                      name: member.name,
                      highlighted: !member.name || member.name === "TBA",
                      photo: member.imageUrl || "/logo.png",
                    })
                  ) || []
                }
              />

              {/* Committee Awards & Recognition */}

              <CommitteeCard
                title="Committee Awards & Recognition"
                chairman={orgData.awardschair?.name ?? "TBA"}
                chairmanPhoto={orgData.awardschair?.imageUrl || "/logo.png"}
                members={
                  fillEmptyPositions(orgData.awardsmembers, 3).map(
                    (member) => ({
                      name: member.name,
                      highlighted: !member.name || member.name === "TBA",
                      photo: member.imageUrl || "/logo.png",
                    })
                  ) || []
                }
              />
            </div>
          </section>

          {/* Public Information Committee */}

          <section>
            <div className="flex justify-center">
              <div className="w-full md:w-1/2">
                <CommitteeCard
                  title="Public Information Officer & Public Relation Committee"
                  chairman={orgData.publicinfochair?.name ?? "TBA"}
                  chairmanPhoto={
                    orgData.publicinfochair?.imageUrl || "/logo.png"
                  }
                  members={
                    fillEmptyPositions(orgData.publicinfomembers, 3).map(
                      (member) => ({
                        name: member.name,
                        highlighted: !member.name || member.name === "TBA",
                        photo: member.imageUrl || "/logo.png",
                      })
                    ) || []
                  }
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </SidebarInset>
  );
}

function OfficialCard({
  title,
  name,
  photo,
  eagle = false,
  highlighted = false,
}: {
  title: string;
  name: string;
  photo?: string;
  eagle?: boolean;
  highlighted?: boolean;
}) {
  return (
    <Card
      className={`border shadow-sm ${highlighted ? "border-red-500 border-2" : ""}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-3">
          {photo && (
            <div className="flex-shrink-0">
              <img
                src={photo}
                alt={`${name} photo`}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
              />
            </div>
          )}
          <div className="flex items-center">
            {eagle && (
              <Badge
                variant={highlighted ? "destructive" : "outline"}
                className="mr-2 italic"
              >
                Eagle
              </Badge>
            )}
            <span
              className={`font-semibold ${highlighted ? "text-red-500" : ""}`}
            >
              {name}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Updated CommitteeCard component with circular photos
function CommitteeCard({
  title,
  chairman,
  chairmanPhoto,
  members,
}: {
  title: string;
  chairman: string;
  chairmanPhoto?: string;
  members: { name: string; highlighted: boolean; photo?: string }[];
}) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="pb-2 border-b">
          <p className="text-xs text-center mb-1">Chairman</p>
          <div className="flex items-center justify-center gap-3">
            {chairmanPhoto && (
              <div className="flex-shrink-0">
                <img
                  src={chairmanPhoto}
                  alt={`${chairman} photo`}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                />
              </div>
            )}
            <div className="flex items-center">
              <Badge variant="outline" className="mr-2 italic">
                Eagle
              </Badge>
              <span className="font-semibold">{chairman}</span>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-center mb-1">Members</p>
          <div className="space-y-2">
            {members.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3"
              >
                {member.photo && (
                  <div className="flex-shrink-0">
                    <img
                      src={member.photo}
                      alt={`${member.name} photo`}
                      className="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                    />
                  </div>
                )}
                <div className="flex items-center">
                  <Badge
                    variant={member.highlighted ? "destructive" : "outline"}
                    className="mr-2 italic"
                  >
                    Eagle
                  </Badge>
                  <span
                    className={`${member.highlighted ? "text-red-500 font-semibold" : "font-semibold"}`}
                  >
                    {member.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
