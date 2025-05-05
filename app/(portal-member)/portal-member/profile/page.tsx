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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Download, Edit, UploadFile } from "@mui/icons-material";
import { IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditMemberModal } from "@/components/edit-member-modal";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { getDetails } from "./actions";
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

export default function Profile() {
  const { toast } = useToast();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await getDetails(token);
        setMember(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch member details:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch member details"
        );
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const handleSave = async (updatedMember: Partial<Member>) => {
    try {
      setUpdateLoading(true);
      const token = localStorage.getItem("access_token");
      if (!token) return;

      // Only update the fields that are editable
      const memberUpdate = {
        ...member,
        firstName: updatedMember.firstName,
        middleName: updatedMember.middleName,
        lastName: updatedMember.lastName,
        // Convert "none" to empty string for nameExtensions
        nameExtensions:
          updatedMember.nameExtensions === "none"
            ? ""
            : updatedMember.nameExtensions,
        birthDate: updatedMember.birthDate,
        profession: updatedMember.profession,
        address: updatedMember.address,
        contact: updatedMember.contact,
      };

      // Use the specific member ID in the URL for the PUT request
      const response = await axios.put(
        "https://tfoe-backend.onrender.com/member/",
        memberUpdate,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setMember(response.data.data);
        toast({
          title: "Profile Updated",
          content: "Your profile has been updated successfully.",
        });
      } else {
        console.log("No response data, using local update:", memberUpdate);
        // Still update the local state if the server didn't return data
        setMember(memberUpdate as Member);
      }
      console.log("Profile updated successfully");
      return true;
    } catch (error) {
      console.error("Error updating member:", error);
      setError("Failed to update profile. Please try again.");
      toast({
        title: "Update Failed",
        content: "There was a problem updating your profile.",
        variant: "destructive",
      });
      return false;
    } finally {
      setUpdateLoading(false);
    }
  };

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
          <Button
            variant="outline"
            disabled={updateLoading}
            onClick={() => {
              setSelectedMember(member);
              setEditOpen(true);
            }}
          >
            {updateLoading ? (
              <>Loading...</>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" /> Edit your Profile
              </>
            )}
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
                {member.id}
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
          <Button variant="outline">
            <UploadFile /> Upload your Certificate
          </Button>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
      <EditMemberModal
        open={editOpen}
        setOpen={setEditOpen}
        member={selectedMember}
        onSave={handleSave}
      />
    </SidebarInset>
  );
}
