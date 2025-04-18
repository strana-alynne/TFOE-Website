"use client";
import { useEffect, useState } from "react";
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
import { getMemberData } from "../../../../lib/getMemberData";

// Define the Member type
interface Member {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  nameExtensions?: string;
  status: string;
  age?: number; // Note: This isn't in getMemberData
  profession: string;
  email: string;
  contact: string;
  address?: string; // Note: This isn't in getMemberData
  dateJoined: string;
  position: string;
  contribution: string;
  absences: string;
  feedback?: string; // Note: This isn't in getMemberData
}

interface DownloadableItem {
  imagePath: string;
  title: string;
  date: string;
}

// Function to handle image download (unchanged)
const handleDownload = async (imagePath: string, fileName: string) => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

// Downloadable Item Component (unchanged)
const DownloadableItem = ({ imagePath, title, date }: DownloadableItem) => (
  <div className="flex items-center gap-4 pb-4">
    <div className="w-full flex items-center gap-4">
      <img src={imagePath} alt={title} width={100} />
      <div>
        <h2 className="text-md font-bold">{title}</h2>
        <p className="text-muted-foreground">Issued on: {date}</p>
      </div>
    </div>
    <button
      onClick={() =>
        handleDownload(
          imagePath,
          `${title.toLowerCase().replace(/ /g, "-")}.jpg`
        )
      }
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
    >
      <Download />
    </button>
  </div>
);

export default function Profile() {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await fetch("/api/member-data");
        console.log("Raw response:", res);

        if (res.ok) {
          const data = await res.json();
          setMember(data);
          console.log("Member data fetched successfully", data);
        } else {
          const msg = `API returned ${res.status}: ${res.statusText}`;
          console.warn(msg);
          setError(msg);
        }
      } catch (err: any) {
        console.error("Error fetching member data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, []);
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
        <h2 className="text-lg font-semibold mb-4">Member Information</h2>

        {member ? (
          <div className="mb-4">
            <h2 className="text-xl font-bold">{fullName}</h2>
            <p className="text-muted-foreground flex items-center gap-2">
              <span>
                <IdCard />
              </span>
              {member.id}
            </p>
          </div>
        ) : (
          <p className="text-red-500">Member not found</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground">AGE</p>
            <h2 className="text-md font-bold">{member.age || "N/A"}</h2>
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
      </Card>

      <Card className="m-4 p-4">
        <h2 className="text-lg font-semibold mb-4">Membership Details</h2>

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
          <div>
            <p className="text-muted-foreground">FEEDBACK</p>
            <h2 className="text-md font-bold">{member.feedback || "N/A"}</h2>
          </div>
        </div>
      </Card>
      <Card className="m-4 p-4">
        <h2 className="text-lg font-semibold mb-4">
          Certificates and Trainings
        </h2>
        <h1>Comming Soon</h1>
        {/* <DownloadableItem
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
        /> */}
      </Card>
    </SidebarInset>
  );
}
