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
import { Edit } from "@mui/icons-material";
import { IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getEventDetail } from "../actions";
import { useToast } from "@/hooks/use-toast";
import ParticipantsTable from "./participants/participants-table";
import FeedbackTable from "./feedback/feedback-table";
import { EditEvent } from "@/components/edit-event-modal";
// Define the Member type
interface EventDetailsProps {
  id: string;
  imageUrl: string;
  name: string;
  date: string;
  starttime: string;
  endtime: string;
  attendedCount: number;
  happeningNow: boolean;
  attendanceCode: string;
  participants: { id: string; name: string; feedback: string }[];
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
  const [selectedMember, setSelectedMember] =
    useState<EventDetailsProps | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        console.log("Fetching event details...", id);
        const response = await getEventDetail(token, id);
        console.log(response);
        setEventDetail(response.data);
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
  }, [id]);

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
              <BreadcrumbPage>{eventdetail?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <Card className="m-4 mb-0">
        <img
          src={eventdetail?.imageUrl}
          alt={eventdetail?.name}
          className="h-48 w-full object-cover"
        />
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Event Information</CardTitle>
          <Button
            variant="outline"
            disabled={updateLoading}
            onClick={() => {
              setSelectedMember(eventdetail);
              setEditOpen(true);
            }}
          >
            {updateLoading ? (
              <>Loading...</>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" /> Edit Event
              </>
            )}
          </Button>
        </CardHeader>

        <CardContent>
          {eventdetail ? (
            <div className="mb-4">
              <h2 className="text-xl font-bold">{eventdetail.name}</h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <span>
                  <IdCard />
                </span>
                {id}
              </p>
            </div>
          ) : (
            <p className="text-red-500">Fetching data ...</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">DATE</p>
              <h2 className="text-md font-bold">{eventdetail?.date}</h2>
            </div>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Time</p>
            <h2 className="text-md font-bold">
              {eventdetail?.starttime}-{eventdetail?.endtime}
            </h2>
          </div>
          <div>
            <p className="text-muted-foreground">ATTENDANCE CODE</p>
            <h2 className="text-md font-bold">{eventdetail?.attendanceCode}</h2>
          </div>
        </CardContent>
      </Card>

      <div className="px-4 py-8 pb-0 w-full">
        <h2 className="text-2xl font-semibold leading-none tracking-tight">
          Participants ({eventdetail?.participants.length})
        </h2>{" "}
        <ParticipantsTable participants={eventdetail?.participants || []} />
      </div>
      <div className="px-4 py-0 w-full">
        <h2 className="text-2xl pb-4 font-semibold leading-none tracking-tight">
          Feedback ({eventdetail?.participants.length})
        </h2>{" "}
        <FeedbackTable participants={eventdetail?.participants || []} />
      </div>
      <EditEvent
        open={editOpen}
        setOpen={setEditOpen}
        event={selectedMember}
        onUpdated={() => window.location.reload()} // or a better way to refetch
      />
    </SidebarInset>
  );
}
