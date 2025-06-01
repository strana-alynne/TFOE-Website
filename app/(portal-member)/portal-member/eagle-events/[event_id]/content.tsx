// Updated EventDetails component with attendance check functionality
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
import { Timer, CheckCircle } from "@mui/icons-material";
import { IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getEventDetail,
  getUserDetails,
  markAttendance,
  submitFeedback,
} from "../actions";
import { useToast } from "@/hooks/use-toast";
import AttendanceDialog from "@/components/attandance-dailogue";

// Updated interface to match API response
interface AttendeeInfo {
  eventCode: string;
  memberId: string;
  memberName: string;
}

interface EventDetailsProps {
  id: string;
  eventTitle: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventAttendees: (string | AttendeeInfo)[]; // Updated to handle mixed array
  eventCode: string;
  eventDetails: string;
  // Optional properties that might not be in API response
  happeningNow?: boolean;
  attendanceCode?: string;
  attended?: string;
  participants?: { id: string; name: string; feedback: string }[];
}

interface UserDetails {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  nameExtension: string;
  address: string;
  email: string;
  contact: string;
  birthDate: string;
  status: string;
  profession: string;
  position: string;
  contribution: number;
  absences: number;
  feedback: string;
  dateJoined: string;
}

interface EventID {
  id: string;
}

export default function EventDetails({ id }: EventID) {
  const { toast } = useToast();
  const [eventdetail, setEventDetail] = useState<EventDetailsProps | null>(
    null
  );
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Check if current user has already attended
  const hasUserAttended = () => {
    if (!eventdetail || !userDetails) return false;

    return eventdetail.eventAttendees.some((attendee) => {
      // Check if attendee is an object (not empty string) and has matching memberId
      return (
        typeof attendee === "object" &&
        attendee !== null &&
        "memberId" in attendee &&
        attendee.memberId === userDetails.id
      );
    });
  };

  // Get user's attendance info if they attended
  const getUserAttendanceInfo = (): AttendeeInfo | null => {
    if (!eventdetail || !userDetails) return null;

    const attendanceRecord = eventdetail.eventAttendees.find((attendee) => {
      return (
        typeof attendee === "object" &&
        attendee !== null &&
        "memberId" in attendee &&
        attendee.memberId === userDetails.id
      );
    });

    return attendanceRecord && typeof attendanceRecord === "object"
      ? attendanceRecord
      : null;
  };

  // Get actual attendee count (excluding empty strings)
  const getActualAttendeeCount = () => {
    if (!eventdetail) return 0;
    return eventdetail.eventAttendees.filter(
      (attendee) => typeof attendee === "object" && attendee !== null
    ).length;
  };

  const handleAttendanceSubmit = async ({
    eventCode,
    feedback,
  }: {
    eventCode: string;
    feedback: string;
  }) => {
    setUpdateLoading(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) {
        toast({
          title: "Error",
          description: "Access token is missing.",
          variant: "destructive",
        });
        setUpdateLoading(false);
        return;
      }

      if (!userDetails) {
        toast({
          title: "Error",
          description: "User details not available.",
          variant: "destructive",
        });
        setUpdateLoading(false);
        return;
      }

      const attendanceData = {
        eventCode: eventCode,
        memberId: userDetails.id,
        memberName:
          `${userDetails.firstName} ${userDetails.middleName} ${userDetails.lastName}`.trim(),
      };

      console.log("Marking attendance with data:", attendanceData);

      await markAttendance(token, id, attendanceData);

      // Step 2: Submit feedback
      const feedbackData = {
        feedbackContent: feedback,
        feedbackSenderId: userDetails.id,
        eventId: id,
        feedbackDate: new Date().toISOString(),
      };

      console.log("Submitting feedback with data:", feedbackData);
      await submitFeedback(token, feedbackData);

      toast({
        title: "Success",
        description:
          "Your attendance has been recorded and feedback submitted.",
      });

      setOpen(false);

      // Refresh event data to reflect attendance change
      const token2 = localStorage.getItem("access_token");
      if (token2) {
        const eventResponse = await getEventDetail(token2, id);
        setEventDetail(eventResponse.data.data);
      }
    } catch (error) {
      console.error("Attendance submission error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to submit attendance.",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");
      console.log("Fetching data with token:", token);
      if (!token) {
        setError("Access token is missing");
        setLoading(false);
        return;
      }

      try {
        // Fetch both event details and user details
        const [eventResponse, userResponse] = await Promise.all([
          getEventDetail(token, id),
          getUserDetails(token),
        ]);

        console.log("Event response:", eventResponse);
        console.log("User response:", userResponse);
        console.log("User ID:", userResponse.data);

        setEventDetail(eventResponse.data.data);
        setUserDetails(userResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch data"
        );
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Helper function to check if event is happening now
  const isEventHappeningNow = (
    date: string,
    startTime: string,
    endTime: string
  ) => {
    const now = new Date();
    const eventDate = new Date(date);
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startDateTime = new Date(eventDate);
    startDateTime.setHours(startHour, startMinute, 0);

    const endDateTime = new Date(eventDate);
    endDateTime.setHours(endHour, endMinute, 0);

    return now >= startDateTime && now <= endDateTime;
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to format time
  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const userAttended = hasUserAttended();
  const attendanceInfo = getUserAttendanceInfo();

  return (
    <SidebarInset className="w-full">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink
                href="/portal-member/eagle-events"
                className="text-muted-foreground"
              >
                Event
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{eventdetail?.eventTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {/* Attendance Status Card - Show only if user has attended */}
      {userAttended && attendanceInfo && (
        <Card className="m-4 mb-0 border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-800">
                  Attendance Confirmed
                </h3>
                <p className="text-sm text-green-600">
                  You have successfully marked your attendance for this event.
                </p>
                <p className="text-xs text-green-500 mt-1">
                  Registered as: {attendanceInfo.memberName}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="m-4 mb-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Event Information</CardTitle>
          {!userAttended && (
            <Button
              variant="outline"
              disabled={
                updateLoading || loading || !eventdetail || !userDetails
              }
              onClick={() => {
                setOpen(true);
              }}
            >
              {updateLoading ? (
                <>Loading...</>
              ) : (
                <>
                  <Timer className="h-4 w-4" /> Mark Attendance
                </>
              )}
            </Button>
          )}
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Fetching data...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : eventdetail ? (
            <>
              <div className="mb-4">
                <h2 className="text-xl font-bold">{eventdetail.eventTitle}</h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <span>
                    <IdCard />
                  </span>
                  {eventdetail.eventCode}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-muted-foreground">DATE</p>
                  <h2 className="text-md font-bold">
                    {formatDate(eventdetail.eventDate)}
                  </h2>
                </div>
                <div>
                  <p className="text-muted-foreground">TIME</p>
                  <h2 className="text-md font-bold">
                    {formatTime(eventdetail.startTime)} -{" "}
                    {formatTime(eventdetail.endTime)}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-muted-foreground">ATTENDEES</p>
                  <h2 className="text-md font-bold">
                    {getActualAttendeeCount()}
                  </h2>
                </div>
                <div>
                  <p className="text-muted-foreground">STATUS</p>
                  <Badge
                    variant={
                      isEventHappeningNow(
                        eventdetail.eventDate,
                        eventdetail.startTime,
                        eventdetail.endTime
                      )
                        ? "default"
                        : "secondary"
                    }
                  >
                    {isEventHappeningNow(
                      eventdetail.eventDate,
                      eventdetail.startTime,
                      eventdetail.endTime
                    )
                      ? "Happening Now"
                      : "Scheduled"}
                  </Badge>
                </div>
              </div>

              {eventdetail.eventDetails && (
                <div className="mb-4">
                  <p className="text-muted-foreground">DESCRIPTION</p>
                  <p className="text-sm">{eventdetail.eventDetails}</p>
                </div>
              )}
            </>
          ) : (
            <p className="text-red-500">No event data available</p>
          )}
        </CardContent>
      </Card>

      <AttendanceDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleAttendanceSubmit}
        loading={updateLoading}
      />
    </SidebarInset>
  );
}

export async function generateMetadata({ params }: { params: EventID }) {
  const { id } = params;
  const token = localStorage.getItem("access_token");
  if (!token) return {};

  try {
    const response = await getEventDetail(token, id);
    const event = response.data.data;

    return {
      title: event.eventTitle,
      description: event.eventDetails || "Event details not available",
    };
  } catch (error) {
    console.error("Failed to fetch event details for metadata:", error);
    return {};
  }
}
