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
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Download, Edit } from "@mui/icons-material";
import { IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the Member type
interface Member {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  nameExtensions?: string;
  status: string;
  birthDate: string;
  profession: string;
  email: string;
  contact: string;
  address?: string;
  dateJoined: string;
  position: string;
  contribution: string;
  absences: string;
  feedback?: string;
}

interface MembersProfileProps {
  memberId: string;
}

export default function MembersProfile({ memberId }: MembersProfileProps) {
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

  const calculateAge = (birthDateString: string) => {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    async function fetchMember() {
      try {
        const response = await fetch(
          `http://localhost:3001/members/${memberId}`
        );
        if (!response.ok) throw new Error("Failed to fetch member data");

        const data = await response.json();
        console.log(data);
        setMember(data);
      } catch (err) {
        setError("Error loading member profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
  }, [memberId]);

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
    `${member.firstName || ""} ${member.middleName || ""} ${member.lastName || ""} ${member.nameExtensions || ""}`.trim();
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Member Information</CardTitle>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </CardHeader>

        <CardContent>
          {member ? (
            <div className="mb-4">
              <h2 className="text-xl font-bold">{fullName}</h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <span>
                  <IdCard />
                </span>
                {memberId}
              </p>
            </div>
          ) : (
            <p className="text-red-500">Member not found</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">AGE</p>
              <h2 className="text-md font-bold">
                {" "}
                {calculateAge(member.birthDate) || "N/A"}
              </h2>
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
              <h2 className="text-md font-bold">{member.address || "N/A"}</h2>
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
        </CardContent>
      </Card>

      <Card className="m-4 p-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Membership Details</CardTitle>
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" /> Edit
          </Button>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">DATE JOINED</p>
              <h2 className="text-md font-bold">
                {new Date(member.dateJoined).toLocaleDateString()}
              </h2>
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
          </div>
        </CardContent>
      </Card>
      <Card className="m-4 p-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Certificates and Trainings</CardTitle>
        </CardHeader>
        {/* <CardContent>
          <DownloadableItem
            imagePath="/cert-03.jpg"
            title="Certificate of Appreciation"
            date="January 2024"
          />
          <DownloadableItem
            imagePath="/cert-01.png"
            title="Leadership Training Certificate"
            date="February 2024"
          />
          <DownloadableItem
            imagePath="/cert-02.jpg"
            title="Community Service Award"
            date="March 2024"
          />
        </CardContent> */}
      </Card>
    </SidebarInset>
  );
}
