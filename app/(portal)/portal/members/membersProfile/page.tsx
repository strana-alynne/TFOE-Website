"use client";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";

// Define the Member type
interface Member {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  name_extension?: string;
  status: string;
  age: number;
  profession: string;
  email: string;
  contact: string;
  address: string;
  datejoined: string;
  position: string;
  contribution: string;
  absences: number;
  feedback: string;
}
export default async function MembersProfile() {
  const id = "67b0877a16c61ff9590d17d7";
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = (imageSrc: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = fileName; // Set the filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    async function fetchMember() {
      try {
        const response = await fetch(`/api/members/${id}`);
        if (!response.ok) throw new Error("Failed to fetch member data");

        const data = await response.json();
        setMember(data.member);
      } catch (err) {
        setError("Error loading member profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <SidebarInset className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <p>Loading profile...</p>
        </header>
      </SidebarInset>
    );
  }

  if (error || !member) {
    return (
      <SidebarInset className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Error</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <Card className="m-4 p-4">
          <h2 className="text-lg font-semibold">Error Loading Profile</h2>
          <p className="text-muted-foreground">{error || "Member not found"}</p>
        </Card>
      </SidebarInset>
    );
  }

  const fullName =
    `${member.firstName || ""} ${member.middleName || ""} ${member.lastName || ""} ${member.name_extension || ""}`.trim();
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
        <h2 className="text-lg font-semibold mb-4">
          Certificates and Trainings
        </h2>

        {[
          { src: "/cert-03.jpg", name: "Certificate_of_Appreciation_03.jpg" },
          { src: "/cert-01.png", name: "Certificate_of_Appreciation_01.png" },
          { src: "/cert-02.jpg", name: "Certificate_of_Appreciation_02.jpg" },
        ].map((cert, index) => (
          <div key={index} className="flex items-center gap-4 pb-4">
            <div className="w-full flex items-center gap-4">
              <img src={cert.src} alt="cert" width={100} />
              <div>
                <h2 className="text-md font-bold">
                  Certificate of Appreciation
                </h2>
                <p className="text-muted-foreground">Issued on: January 2025</p>
              </div>
            </div>
            {/* Download Button */}
            <Button
              variant="secondary"
              onClick={() => handleDownload(cert.src, cert.name)}
              className="gap-2"
            >
              <Download fontSize="small" />
              Download
            </Button>
          </div>
        ))}
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
