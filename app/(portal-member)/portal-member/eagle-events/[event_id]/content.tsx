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
import { Timer } from "@mui/icons-material";
import { IdCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getEventDetail, addFeedback } from "../actions";
import { useToast } from "@/hooks/use-toast";
import AttendanceDialog from "@/components/attandance-dailogue";

// Define the Member type
interface EventDetailsProps {
  id: string;
  name: string;
  date: string;
  starttime: string;
  endtime: string;
  attendedCount: number;
  happeningNow: boolean;
  attendanceCode: string;
  attended: string;
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
  const [open, setOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleAttendanceSubmit = async ({
    attendanceCode,
    feedback,
  }: {
    attendanceCode: string;
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
      const memberid = "MEM-2023-001"; // Replace with actual member ID
      addFeedback(token, id, attendanceCode, feedback);

      // Fake delay (for demo)
      await new Promise((res) => setTimeout(res, 1000));

      toast({
        title: "Success",
        description: "Your attendance has been recorded.",
      });

      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit attendance.",
        variant: "destructive",
      });
    } finally {
      setUpdateLoading(false);
    }
  };

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
                href="/portal-member/eagle-events"
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Event Information</CardTitle>
          <Button
            variant="outline"
            disabled={updateLoading}
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
            <p className="text-muted-foreground">STATUS</p>
            <Badge variant={eventdetail?.attended ? "default" : "destructive"}>
              {eventdetail?.attended ? "Attended" : "Missed"}
            </Badge>
          </div>
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
