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
import { getEventDetail, deleteEvent } from "../actions";
import { useToast } from "@/hooks/use-toast";
import ParticipantsTable from "./participants/participants-table";
import FeedbackTable from "./feedback/feedback-table";
import { EditEvent } from "@/components/edit-event-modal";
import { DeleteEventModal } from "@/components/delete-modal";
// Define the Member type
interface EventDetailsProps {
  id: string;
  eventTitle: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventAttendees: number;
  eventCode: string;
  eventDetails: string;
  participants?: { id: string; name: string; feedback: string }[];
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
  const [deleteOpen, setDeleteOpen] = useState(false); // Add delete modal state
  const [isDeleting, setIsDeleting] = useState(false); // Add deleting state
  const [selectedMember, setSelectedMember] =
    useState<EventDetailsProps | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

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
      console.log(`Response for ${id}:`, response);

      if (response?.data?.data) {
        setEventDetail(response.data.data);
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

    // Show success toast
    toast({
      title: "Success",
      description: "Event updated successfully!",
      variant: "default",
    });

    // Refetch the event details to get updated data
    await fetchEventDetails();

    // Close the edit modal
    setEditOpen(false);
    setSelectedMember(null);
  }, [fetchEventDetails, toast]);

  const handleEditClick = () => {
    setSelectedMember(eventdetail);
    setEditOpen(true);
  };

  // Actual delete function called after confirmation
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

      // Close the modal
      setDeleteOpen(false);

      // You might want to redirect to the events list page here
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
              onClick={handleConfirmDelete}
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

          {eventdetail?.eventDetails && (
            <div className="mt-4">
              <p className="text-muted-foreground">DETAILS</p>
              <p className="text-sm">{eventdetail.eventDetails}</p>
            </div>
          )}

          <div className="mt-4">
            <p className="text-muted-foreground">EXPECTED ATTENDEES</p>
            <h2 className="text-md font-bold">
              {eventdetail?.eventAttendees || 0}
            </h2>
          </div>
        </CardContent>
      </Card>

      <div className="px-4 py-8 pb-0 w-full">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Participants
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
        onUpdated={handleEventUpdated} // Use the improved callback
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
