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
import { Download, Edit, UploadFile } from "@mui/icons-material";
import { IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDetails } from "./actions";
import { AdminEditMemberModal } from "@/components/admin-edit-member-modal copy";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

// Updated Member interface to match API response
interface Member {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  nameExtension?: string; // Changed from nameExtensions to nameExtension
  status: string;
  birthDate: string;
  profession: string;
  email: string;
  contact: string;
  address?: string;
  dateJoined: string;
  position: string;
  contribution: string | number; // Can be string or number
  absences: string | number; // Can be string or number
  feedback?: string;
}

interface DownloadableItem {
  imagePath: string;
  title: string;
  date: string;
}

interface MembersProfileProps {
  memberId: string;
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

export default function MembersProfile({ memberId }: MembersProfileProps) {
  const { toast } = useToast();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

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
    const fetchDetails = async () => {
      // Use a fallback token for testing if localStorage is not available
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : null;

      if (!token) {
        setError("No access token found");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching member details for ID:", memberId);
        const response = await getDetails(token, memberId);
        console.log("Member details response:", response);

        // Extract the member data from the nested structure
        const memberData = response.data?.data || response.data;
        setMember(memberData);
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
  }, [memberId]);

  // Updated handleSave function with proper data formatting and validation
  const handleSave = async (updatedMember: Member): Promise<boolean> => {
    try {
      setUpdateLoading(true);
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : null;

      if (!token) {
        toast({
          title: "Authentication Error",
          content: "No access token found. Please log in again.",
          variant: "destructive",
        });
        return false;
      }

      console.log("Updating member with data:", updatedMember);

      // Format the date properly (ensure it's in ISO format)
      const formatDateForAPI = (dateString: string) => {
        try {
          const date = new Date(dateString);
          // Return ISO date string (YYYY-MM-DD format)
          return date.toISOString().split("T")[0];
        } catch (error) {
          console.error("Date formatting error:", error);
          return dateString; // fallback to original
        }
      };

      // Prepare the update payload with all required fields and proper formatting
      const memberUpdate = {
        firstName: updatedMember.firstName?.trim() || "",
        middleName: updatedMember.middleName?.trim() || "",
        lastName: updatedMember.lastName?.trim() || "",
        nameExtension: updatedMember.nameExtension?.trim() || "",
        address: updatedMember.address?.trim() || "",
        email: updatedMember.email?.trim() || "",
        contact: updatedMember.contact?.trim() || "",
        status: updatedMember.status || "ACTIVE",
        birthDate: formatDateForAPI(updatedMember.birthDate),
        profession: updatedMember.profession?.trim() || "",
        // Include these fields even if they're not being edited
        absences:
          typeof updatedMember.absences === "string"
            ? parseInt(updatedMember.absences) || 0
            : updatedMember.absences || 0,
        contribution:
          typeof updatedMember.contribution === "string"
            ? parseInt(updatedMember.contribution) || 0
            : updatedMember.contribution || 0,
        position: updatedMember.position?.trim() || "",
        feedback: updatedMember.feedback?.trim() || "",
        dateJoined: formatDateForAPI(updatedMember.dateJoined),
      };

      console.log("Sending update payload:", memberUpdate);

      // Validate required fields before sending
      const requiredFields = [
        "firstName",
        "lastName",
        "birthDate",
        "status",
      ] as const;
      const missingFields = requiredFields.filter(
        (field) => !memberUpdate[field as keyof typeof memberUpdate]
      );

      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
      }

      // Validate email format if provided
      if (memberUpdate.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(memberUpdate.email)) {
          throw new Error("Invalid email format");
        }
      }

      // Use the user_id parameter as mentioned
      const response = await axios.put(
        `https://tfoe-backend.onrender.com/admin/member/${updatedMember.id}`,
        memberUpdate,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update response:", response);

      if (response.status === 200 || response.status === 201) {
        const updatedData = response.data?.data || updatedMember;
        setMember(updatedData);

        toast({
          title: "Profile Updated",
          content: "Member profile has been updated successfully.",
        });

        console.log("Profile updated successfully");
        return true;
      } else {
        console.log("Unexpected response status:", response);
      }
    } catch (error) {
      console.error("Error updating member:", error);

      let errorMessage = "Failed to update profile. Please try again.";

      if (axios.isAxiosError(error)) {
        // Handle 422 specifically - validation errors
        if (error.response?.status === 422) {
          const validationErrors =
            error.response?.data?.errors || error.response?.data?.message;
          if (validationErrors) {
            if (Array.isArray(validationErrors)) {
              errorMessage = `Validation errors: ${validationErrors.join(", ")}`;
            } else if (typeof validationErrors === "object") {
              const errorMessages = Object.values(validationErrors)
                .flat()
                .join(", ");
              errorMessage = `Validation errors: ${errorMessages}`;
            } else {
              errorMessage = `Validation error: ${validationErrors}`;
            }
          } else {
            errorMessage = "Invalid data format. Please check all fields.";
          }
        } else if (error.response?.status === 401) {
          errorMessage = "Authentication failed. Please log in again.";
        } else if (error.response?.status === 403) {
          errorMessage = "You don't have permission to update this profile.";
        } else if (error.response?.status === 404) {
          errorMessage = "Member not found.";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }

        // Log the full error response for debugging
        console.error("API Error Response:", error.response?.data);
      }

      setError(errorMessage);
      toast({
        title: "Update Failed",
        content: errorMessage,
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

  // Fixed fullName construction to use nameExtension instead of nameExtensions
  const fullName =
    `${member.firstName || ""} ${member.middleName || ""} ${member.lastName || ""} ${member.nameExtension || ""}`.trim();

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
                <Edit className="mr-2 h-4 w-4" /> Edit Profile
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
                {calculateAge(member.birthDate) || "N/A"}
              </h2>
            </div>
            <div>
              <p className="text-muted-foreground">STATUS</p>
              <Badge
                className={
                  member.status === "ACTIVE" || member.status === "Active"
                    ? "bg-green-500"
                    : member.status === "PENDING" || member.status === "Pending"
                      ? "bg-gray-500"
                      : "bg-red-500"
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
              <h2 className="text-md font-bold">{member.position || "N/A"}</h2>
            </div>
            <div>
              <p className="text-muted-foreground">CONTRIBUTION</p>
              <h2 className="text-md font-bold">
                {member.contribution || "0"}
              </h2>
            </div>
            <div>
              <p className="text-muted-foreground">ABSENCES</p>
              <h2 className="text-md font-bold">{member.absences || "0"}</h2>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="m-4 p-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Certificates and Trainings</CardTitle>
          <Button variant="outline">
            <UploadFile className="mr-2 h-4 w-4" /> Upload Certificate
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

      {/* Edit Modal */}
      <AdminEditMemberModal
        open={editOpen}
        setOpen={setEditOpen}
        member={selectedMember}
        onSave={handleSave}
      />
    </SidebarInset>
  );
}
