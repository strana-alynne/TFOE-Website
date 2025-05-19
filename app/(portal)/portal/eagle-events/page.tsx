"use client";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminEvent } from "@/components/admin-event";
import { EditEvent } from "@/components/edit-event-modal";
import { getDetails } from "./actions";
import { Button } from "@/components/ui/button";
import { Add } from "@mui/icons-material";
import { AddEvent } from "@/components/add-event-modal";

interface Event {
  id: string;
  description: string;
  name: string;
  date: string;
  starttime: string;
  endtime: string;
  attendedCount: number;
  happeningNow: boolean;
  attendanceCode: string;
  participants: { id: string; name: string }[];
}

export default function Page() {
  const [event, setEvent] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await getDetails(token);
        const events = Array.isArray(response.data) ? response.data : [];
        setEvent(events);
      } catch (error) {
        console.error("Failed to fetch member details:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch member details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  function setEditOpen(open: boolean): void {
    throw new Error("Function not implemented.");
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
                Events
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      {/* Display member details */}
      <div className="p-4 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* H1 taking full width on mobile, flex-grow on larger screens */}
          <h1 className="font-bold text-xl w-full sm:flex-1">Events</h1>

          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            <Add />
            Add New Event
          </Button>
          {/* Search Input */}
          <div className="relative w-full sm:w-auto min-w-[200px]">
            <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground">
              <Search className="h-4 w-4" />
            </div>
            <Input
              id="search"
              name="search"
              type="search"
              placeholder="Search events..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>

          {/* Select Dropdown */}
          <div className="relative w-full sm:w-auto min-w-[150px]">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filters</SelectLabel>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="attended">Attended Events</SelectItem>
                  <SelectItem value="upcoming">Upcoming Events</SelectItem>
                  <SelectItem value="missed">Missed Events</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="p-4 w-full min-h-[200px] flex items-center justify-center">
        {loading ? (
          <p className="text-muted-foreground">Loading events...</p>
        ) : error ? (
          <p className="text-destructive">{error}</p>
        ) : event.length === 0 ? (
          <p className="text-muted-foreground">No events added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {event.map((e) => (
              <AdminEvent
                key={e.id}
                id={e.id}
                name={e.name}
                description={e.description}
                date={e.date}
                time={`${e.starttime} - ${e.endtime}`}
                attendedCount={e.participants.length}
                attendanceCode={e.attendanceCode}
                imageUrl={""}
              />
            ))}
          </div>
        )}
      </div>

      <AddEvent open={open} setOpen={setOpen} />
    </SidebarInset>
  );
}
