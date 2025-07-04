"use client";
import { useEffect, useState, useCallback } from "react";
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
import { Delete, Edit, Token } from "@mui/icons-material";
import { IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getEventDetail,
  deleteEvent,
  updateEvent,
  closeEvent,
} from "../actions";
import { useToast } from "@/hooks/use-toast";
import ParticipantsTable from "./participants/participants-table";
import FeedbackTable from "./feedback/feedback-table";
import { EditEvent } from "@/components/edit-event-modal";
import { DeleteEventModal } from "@/components/delete-modal";
import { Switch } from "@/components/ui/switch";
// Updated interfaces to match your actual data structure
interface EventAttendee {
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
  eventAttendees: EventAttendee[]; // Changed from number to array
  eventCode: string;
  eventDetails: string;
  participants?: { id: string; name: string; feedback: string }[];
  eventStatus: "OPEN" | "CLOSED";
}

// Interface for EditEvent component (matches the original structure)
interface EditEventDetailsProps {
  id: string;
  eventTitle: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventAttendees: number; // Keep as number for EditEvent
  eventCode: string;
  eventDetails: string;
  participants?: { id: string; name: string; feedback: string }[];
  eventStatus: "OPEN" | "CLOSED";
}

interface EventID {
  id: string;
}

export default function EventDetails({ id }: EventID) {
  const { toast } = useToast();

  const [eventdetail, setEventDetail] = useState<EventDetailsProps | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedMember, setSelectedMember] =
    useState<EditEventDetailsProps | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Create a memoized function to fetch event details
  const fetchEventDetails = useCallback(async () => {
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
      console.log("Fetching event details for id:", id);
      setLoading(true);
      const response = await getEventDetail(token, id);

      if (response?.data?.data) {
        // Transform the data to match your interface if needed
        const eventData = response.data.data;

        // If participants don't exist, create them from eventAttendees
        if (!eventData.participants && eventData.eventAttendees) {
          eventData.participants = eventData.eventAttendees.map(
            (attendee: EventAttendee, index: number) => ({
              id: attendee.memberId,
              name: attendee.memberName,
              feedback: "", // Default empty feedback
            })
          );
        }

        setEventDetail(eventData);
        setError(null);
      } else {
        setError("No event data received");
      }
    } catch (error) {
      console.error("Failed to fetch event details:", error);
      setError(
        error instanceof Error ? error.message : "Failed to fetch event details"
      );
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Initial fetch
  useEffect(() => {
    fetchEventDetails();
  }, [fetchEventDetails]);

  // Handle successful update
  const handleEventUpdated = useCallback(async () => {
    console.log("Event updated successfully, refetching data...");

    toast({
      title: "Success",
      description: "Event updated successfully!",
      variant: "default",
    });

    await fetchEventDetails();
    setEditOpen(false);
    setSelectedMember(null);
  }, [fetchEventDetails, toast]);

  const handleEditClick = () => {
    if (eventdetail) {
      // Transform the data to match EditEvent component's expected structure
      const transformedEvent: EditEventDetailsProps = {
        ...eventdetail,
        eventAttendees: Array.isArray(eventdetail.eventAttendees)
          ? eventdetail.eventAttendees.length
          : 0,
        eventStatus: eventdetail.eventStatus,
      };
      setSelectedMember(transformedEvent);
    }
    setEditOpen(true);
  };

  const handleStatusChange = async (newStatus: "OPEN" | "CLOSED") => {
    if (!eventdetail) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast({
        title: "Error",
        description: "No access token found",
        variant: "destructive",
      });
      return;
    }

    setUpdatingStatus(true);
    try {
      console.log(
        `Updating event status to ${newStatus} for event ID: ${eventdetail.id}`
      );
      if (newStatus === "CLOSED") {
        const result = await closeEvent(token, eventdetail.id);
        console.log("Close event result:", result);

        if (result.success) {
          setEventDetail((prev) =>
            prev ? { ...prev, eventStatus: newStatus } : null
          );
          toast({
            title: "Success",
            description: "Event closed successfully",
            variant: "default",
          });
        } else {
          throw new Error(result.error || "Failed to close event");
        }
      }
    } catch (error) {
      console.log("Failed to update event status:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to update event status",
        variant: "destructive",
      });
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleConfirmDelete = async () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;

    if (!token) {
      toast({
        title: "Error",
        description: "No access token found",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsDeleting(true);
      await deleteEvent(token, id);

      toast({
        title: "Success",
        description: "Event deleted successfully!",
        variant: "default",
      });

      setDeleteOpen(false);
      window.location.href = "/portal/eagle-events";
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete event",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedMember(null);
  };

  if (loading && !eventdetail) {
    return (
      <SidebarInset className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/portal/eagle-events"
                  className="text-muted-foreground"
                >
                  Event
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Loading...</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex items-center justify-center p-8">
          <p>Loading event details...</p>
        </div>
      </SidebarInset>
    );
  }

  if (error) {
    return (
      <SidebarInset className="w-full">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="/portal/eagle-events"
                  className="text-muted-foreground"
                >
                  Event
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Error</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex items-center justify-center p-8">
          <p className="text-red-500">{error}</p>
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
                href="/portal/eagle-events"
                className="text-muted-foreground"
              >
                Event
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {eventdetail?.eventTitle || "Event Details"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Card className="m-4 mb-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Event Information</CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              disabled={updateLoading || loading}
              onClick={handleEditClick}
            >
              {updateLoading || loading ? (
                <>Loading...</>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" /> Edit Event
                </>
              )}
            </Button>
            <Button
              variant="destructive"
              disabled={updateLoading || loading}
              onClick={() => setDeleteOpen(true)} // Fixed: Open modal instead of direct delete
            >
              {updateLoading || loading ? (
                <>Loading...</>
              ) : (
                <>
                  <Delete className="mr-2 h-4 w-4" /> Delete Event
                </>
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {eventdetail ? (
            <div className="mb-4">
              <h2 className="text-xl font-bold">{eventdetail.eventTitle}</h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <span>
                  <IdCard />
                </span>
                {eventdetail.id}
              </p>
            </div>
          ) : (
            <p className="text-muted-foreground">No event data available</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">DATE</p>
              <h2 className="text-md font-bold">
                {eventdetail?.eventDate || "N/A"}
              </h2>
            </div>
            <div>
              <p className="text-muted-foreground">TIME</p>
              <h2 className="text-md font-bold">
                {eventdetail?.startTime && eventdetail?.endTime
                  ? `${eventdetail.startTime} - ${eventdetail.endTime}`
                  : "N/A"}
              </h2>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-muted-foreground">ATTENDANCE CODE</p>
            <h2 className="text-md font-bold">
              {eventdetail?.eventCode || "N/A"}
            </h2>
          </div>

          <div className="mt-4">
            <p className="text-muted-foreground">STATUS</p>
            <div className="flex items-center space-x-2 mt-1">
              <Switch
                checked={eventdetail?.eventStatus === "OPEN"}
                onCheckedChange={(checked) =>
                  handleStatusChange(checked ? "OPEN" : "CLOSED")
                }
                disabled={updatingStatus}
              />
              <span className="text-sm font-medium">
                {eventdetail?.eventStatus === "OPEN" ? "Open" : "Closed"}
              </span>
              {updatingStatus && (
                <span className="text-sm text-muted-foreground">
                  Updating...
                </span>
              )}
            </div>
          </div>

          {eventdetail?.eventDetails && (
            <div className="mt-4">
              <p className="text-muted-foreground">DETAILS</p>
              <p className="text-sm">{eventdetail.eventDetails}</p>
            </div>
          )}

          <div className="mt-4">
            <p className="text-muted-foreground">REGISTERED ATTENDEES</p>
            <h2 className="text-md font-bold">
              {Array.isArray(eventdetail?.eventAttendees)
                ? eventdetail.eventAttendees.length
                : 0}
            </h2>
          </div>
        </CardContent>
      </Card>

      <div className="px-4 py-8 pb-0 w-full">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Participants{" "}
          {eventdetail?.eventAttendees
            ? `(${eventdetail.eventAttendees.length})`
            : ""}
        </h2>
        <ParticipantsTable participants={eventdetail?.participants || []} />
      </div>

      <div className="px-4 py-0 w-full">
        <h2 className="text-2xl pb-4 font-semibold leading-none tracking-tight">
          Feedback
        </h2>
        <FeedbackTable participants={eventdetail?.participants || []} />
      </div>

      <EditEvent
        open={editOpen}
        setOpen={handleEditClose}
        event={selectedMember}
        onUpdated={handleEventUpdated}
      />
      <DeleteEventModal
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        eventTitle={eventdetail?.eventTitle || ""}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </SidebarInset>
  );
}
