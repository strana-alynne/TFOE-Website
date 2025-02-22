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

interface DownloadableItem {
  imagePath: string;
  title: string;
  date: string;
}

// Function to handle image download
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

// Downloadable Item Component
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
  const id = "67b0877a16c61ff9590d17d7";
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
                href="/portal-member"
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

        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="self-center md:self-start">
            <img
              src="/prof-pic.jpg"
              alt="prof pic"
              className="rounded-full h-32 w-32 md:h-40 md:w-40 object-cover object-top"
            />
          </div>

          <div className="w-full">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
              <div className="text-center flex flex-col items-center">
                <h2 className="text-xl font-bold">{fullName}</h2>
                <p className="text-muted-foreground flex items-center justify-center gap-2">
                  <span>
                    <IdCard />
                  </span>
                  <span className="truncate max-w-xs">{member._id}</span>
                </p>
              </div>
              <div className="mt-2 sm:mt-0 text-left">
                <p className="text-muted-foreground">STATUS</p>
                <Badge
                  className={
                    member.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }
                >
                  {member.status}
                </Badge>
              </div>
            </div>
            {/* Other Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-left">
                <p className="text-muted-foreground">AGE</p>
                <h2 className="text-md font-bold">{member.age}</h2>
              </div>
              <div className="text-left">
                <p className="text-muted-foreground">PROFESSION</p>
                <h2 className="text-md font-bold">{member.profession}</h2>
              </div>
              <div className="text-left">
                <p className="text-muted-foreground">EMAIL</p>
                <h2 className="text-md font-bold overflow-hidden text-ellipsis">
                  {member.email}
                </h2>
              </div>
              <div className="text-left">
                <p className="text-muted-foreground">CONTACT INFORMATION</p>
                <h2 className="text-md font-bold">{member.contact}</h2>
              </div>
              <div className="col-span-1 sm:col-span-2 text-left">
                <p className="text-muted-foreground">ADDRESS</p>
                <h2 className="text-md font-bold">{member.address}</h2>
              </div>
            </div>
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
      </Card>
      <Card className="m-4 p-4">
        <h2 className="text-lg font-semibold mb-4">
          Membership Application Form
        </h2>
        <DownloadableItem
          imagePath="/doc.png"
          title="Application Form"
          date="January 2024"
        />
      </Card>
    </SidebarInset>
  );
}
