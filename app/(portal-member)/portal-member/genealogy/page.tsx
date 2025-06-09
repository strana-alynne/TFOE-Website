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

export default function Genealogy() {
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
        <h1 className="text-2xl font-bold mb-6">
          Eagles Club Organizational Chart
        </h1>

        <div className="space-y-8">
          {/* Top Executive Officials */}
          <section>
            <h2 className="text-lg font-bold mb-4">A. Elected Officials</h2>

            {/* Level 1: President, Vice President */}
            <div className="flex justify-center">
              <div className="space-y-4 mb-4 w-full max-w-md">
                <OfficialCard
                  title="National President"
                  name="Jonathan L. Sampan"
                  eagle={true}
                />
                <OfficialCard
                  title="Governor"
                  name="Jonathan L. Sampan"
                  eagle={true}
                />
                <OfficialCard
                  title="Club President"
                  name="Jonathan L. Sampan"
                  eagle={true}
                />
                <OfficialCard
                  title="Club Vice-President"
                  name="Christopher A. Nellas"
                  eagle={true}
                />
              </div>
            </div>

            {/* Level 3: Assemblymen, Assistant Secretary, Assistant Treasurer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <OfficialCard
                  title="Club Assemblymen"
                  name="Nelson M. Maderazo"
                  eagle={true}
                />
                <OfficialCard
                  title="Club Assemblymen"
                  name="Larry Laquian"
                  eagle={true}
                />
              </div>
            </div>

            {/* Alternate Assemblymen */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <OfficialCard
                title="Club Alternate Assemblymen"
                name="Darwin C. De Jesus"
                eagle={true}
              />
              <OfficialCard
                title="Club Alternate Assemblymen"
                name="Paul Brian G. Kwong"
                eagle={true}
              />
              <OfficialCard
                title="Club Alternate Assemblymen"
                name="Mark Christian G. Santos"
                eagle={true}
              />
            </div>

            <h2 className="text-lg font-bold mb-4">B. Appointed Officials</h2>

            {/* Level 2: Vice President, Secretary, Treasurer */}
            <div className="flex justify-center">
              <div className="space-y-4 mb-4 w-full max-w-md">
                <OfficialCard
                  title="Club Secretary"
                  name="Raffy A. Amarante"
                  eagle={true}
                  highlighted={true}
                />
                <OfficialCard
                  title="Club Assistant Secretary"
                  name="Jose Manuel Lim"
                  eagle={true}
                />
                <OfficialCard
                  title="Club Treasurer"
                  name="Imelda Maderazo"
                  eagle={true}
                />
                <OfficialCard
                  title="Club Assistant Treasurer"
                  name="TBA"
                  eagle={true}
                  highlighted={true}
                />
                <OfficialCard
                  title="Club Auditor"
                  name="Eddemar"
                  eagle={true}
                />
                <OfficialCard
                  title="Club Assistant Auditor"
                  name="TBA"
                  eagle={true}
                  highlighted={true}
                />
              </div>
            </div>
          </section>

          {/* Board of Directors */}
          <section>
            <h2 className="text-lg font-bold mb-4">Club Board of Directors</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <OfficialCard
                title="Board Member"
                name="Glenn Bautista"
                eagle={true}
                highlighted={true}
              />
              <OfficialCard
                title="Board Member"
                name="Mark Anthony Dela Cruz"
                eagle={true}
              />
              <OfficialCard
                title="Board Member"
                name="Nelson Maderazo"
                eagle={true}
              />
              <OfficialCard
                title="Board Member"
                name="Paul Brian G. Kwong"
                eagle={true}
              />
              <OfficialCard
                title="Board Member"
                name="TBA"
                eagle={true}
                highlighted={true}
              />
            </div>
          </section>

          {/* Committees - First Row */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Ways & Means Committee */}
              <CommitteeCard
                title="Ways & Means Committee"
                chairman="Jonathan Sampan"
                members={[
                  { name: "Raffy Amarante", highlighted: false },
                  { name: "Christopher Nellas", highlighted: false },
                  { name: "TBA", highlighted: true },
                ]}
              />

              {/* Tribunal & Grievance Committee */}
              <CommitteeCard
                title="Tribunal & Grievance Committee"
                chairman="Eric Christian Baldoza"
                members={[
                  { name: "TBA", highlighted: true },
                  { name: "TBA", highlighted: true },
                  { name: "TBA", highlighted: true },
                ]}
              />

              {/* Oversight Committee */}
              <CommitteeCard
                title="Oversight Committee"
                chairman="Christopher A. Nellas"
                members={[
                  { name: "TBA", highlighted: true },
                  { name: "TBA", highlighted: true },
                  { name: "TBA", highlighted: true },
                ]}
              />
            </div>
          </section>

          {/* Committees - Second Row */}
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Alalavang Agila & Special Projects Committee */}
              <CommitteeCard
                title="Alalayang Agila & Special Projects Committee"
                chairman="Mark Joseph Abrenica"
                members={[
                  { name: "TBA", highlighted: true },
                  { name: "TBA", highlighted: true },
                  { name: "TBA", highlighted: true },
                ]}
              />

              {/* Protocol & Peace Committee */}
              <CommitteeCard
                title="Protocol & Peace Committee"
                chairman="Nelson Maderazo"
                members={[
                  { name: "TBA", highlighted: true },
                  { name: "TBA", highlighted: true },
                  { name: "TBA", highlighted: true },
                ]}
              />

              {/* Committee Awards & Recognition */}
              <CommitteeCard
                title="Committee Awards & Recognition"
                chairman="Paul Brian Kwong"
                members={[
                  { name: "TBA", highlighted: true },
                  { name: "TBA", highlighted: true },
                  { name: "TBA", highlighted: true },
                ]}
              />
            </div>
          </section>

          {/* Public Information Committee */}
          <section>
            <div className="flex justify-center">
              <div className="w-full md:w-1/2">
                <CommitteeCard
                  title="Public Information Officer & Public Relation Committee"
                  chairman="JP Canlas"
                  members={[
                    { name: "TBA", highlighted: true },
                    { name: "TBA", highlighted: true },
                    { name: "TBA", highlighted: true },
                  ]}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </SidebarInset>
  );
}

// Reusable card component for each official
function OfficialCard({
  title,
  name,
  eagle = false,
  highlighted = false,
}: {
  title: string;
  name: string;
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
        <div className="flex items-center justify-center">
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
      </CardContent>
    </Card>
  );
}

// Committee card component with chairman and members
function CommitteeCard({
  title,
  chairman,
  members,
}: {
  title: string;
  chairman: string;
  members: { name: string; highlighted: boolean }[];
}) {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="pb-2 border-b">
          <p className="text-xs text-center mb-1">Chairman</p>
          <div className="flex items-center justify-center">
            <Badge variant="outline" className="mr-2 italic">
              Eagle
            </Badge>
            <span className="font-semibold">{chairman}</span>
          </div>
        </div>

        <div>
          <p className="text-xs text-center mb-1">Members</p>
          <div className="space-y-2">
            {members.map((member, index) => (
              <div key={index} className="flex items-center justify-center">
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
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
