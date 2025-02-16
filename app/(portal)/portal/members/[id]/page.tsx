import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Download } from "@mui/icons-material";
import { IdCard } from "lucide-react";

export default async function MembersProfile({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id; // No need to await

  // Fetch member data on the server
  async function getMemberById(id: string) {
    try {
      const response = await fetch(`http://localhost:3000/api/members/${id}`, {
        cache: "no-store", // Ensures fresh data on every request
      });
      if (!response.ok) throw new Error("Failed to fetch member data");
      const data = await response.json();
      return data.member;
    } catch (error) {
      console.error("Error fetching member:", error);
      return null;
    }
  }

  const member = await getMemberById(id);
  const fullName =
    `${member.firstName || ""} ${member.middleName || ""} ${member.lastName || ""} ${member.name_extension || ""}`.trim(); // ✅ This will no longer be a pending Promise
  console.log(fullName);
  return (
    <SidebarInset className="w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                href="/portal/members"
                className="text-muted-foreground"
              >
                Members
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{fullName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      {/* Display member details */}
      <div className="p-4 pb-0">
        <h1 className="font-bold">Member Profile</h1>
      </div>

      <Card className="m-4 p-4">
        <h2 className="text-lg font-semibold mb-4">Member Information</h2>

        {member ? (
          <div className="mb-4">
            <h2 className="text-xl font-bold">{fullName}</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <span>
                <IdCard />
              </span>
              {member._id}
            </p>
          </div>
        ) : (
          <p className="text-red-500">Member not found</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground">AGE</p>
            <h2 className="text-md font-bold">{member.age}</h2>
          </div>

          <div>
            <p className="text-muted-foreground">STATUS</p>
            <Badge
              className={
                member.status === "Active" ? "bg-green-500" : "bg-red-500"
              }
            >
              {member.status}
            </Badge>
          </div>
          <div>
            <p className="text-muted-foreground">PROFESSION</p>
            <h2 className="text-md font-bold">{member.profession}</h2>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">ADDRESS</p>
            <h2 className="text-md font-bold">{member.address}</h2>
          </div>
          <div>
            <p className="text-muted-foreground">CONTACT INFORMATION</p>
            <h2 className="text-md font-bold">{member.contact}</h2>
          </div>
          <div>
            <p className="text-muted-foreground">EMAIL</p>
            <h2 className="text-md font-bold">{member.email}</h2>
          </div>
        </div>
      </Card>

      <Card className="m-4 p-4">
        <h2 className="text-lg font-semibold mb-4">Membership Details</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground">DATE JOINED</p>
            <h2 className="text-md font-bold">{member.datejoined}</h2>
          </div>
          <div>
            <p className="text-muted-foreground">POSITION</p>
            <h2 className="text-md font-bold">{member.position}</h2>
          </div>
          <div>
            <p className="text-muted-foreground">CONTRIBUTION</p>
            <h2 className="text-md font-bold">{member.contribution}</h2>
          </div>
          <div>
            <p className="text-muted-foreground">ABSENCES</p>
            <h2 className="text-md font-bold">{member.absences}</h2>
          </div>
          <div>
            <p className="text-muted-foreground">FEEDBACK</p>
            <h2 className="text-md font-bold">{member.feedback}</h2>
          </div>
        </div>
      </Card>
      <Card className="m-4 p-4">
        <h2 className="text-lg font-semibold mb-4">
          Certificates and Trainings
        </h2>
        <div className="flex items-center gap-4 pb-4">
          <div className="w-full flex items-center gap-4">
            <img src="/cert-03.jpg" alt="cert" width={100} />
            <div>
              <h2 className="text-md font-bold">Certificae of Appreciation</h2>
              <p className="text-muted-foreground">Issued on: January 2024</p>
            </div>
          </div>
          <Download />
        </div>
        <div className="flex items-center gap-4  pb-4">
          <div className="w-full flex items-center gap-4">
            <img src="/cert-01.png" alt="cert" width={100} />
            <div>
              <h2 className="text-md font-bold">Certificae of Appreciation</h2>
              <p className="text-muted-foreground">Issued on: January 2024</p>
            </div>
          </div>
          <Download />
        </div>
        <div className="flex items-center gap-4 pb-4">
          <div className="w-full flex items-center gap-4">
            <img src="/cert-02.jpg" alt="cert" width={100} />
            <div>
              <h2 className="text-md font-bold">Certificae of Appreciation</h2>
              <p className="text-muted-foreground">Issued on: January 2024</p>
            </div>
          </div>
          <Download />
        </div>
      </Card>
    </SidebarInset>
  );
}
