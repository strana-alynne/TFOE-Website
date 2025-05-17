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
import { MemberEvent } from "@/components/member-event";
import { getDetails } from "./actions";

interface Event {
  id: string;
  imageUrl: string;
  name: string;
  date: string;
  starttime: string;
  endtime: string;
  attended: string;
  attendanceCode: string;
  happeningNow: boolean;
}

export default function Page() {
  const [event, setEvent] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredEvents = Array.isArray(event)
    ? event.filter((e) => {
        const matchesSearch = e.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const now = new Date();
        const eventDate = new Date(e.date);

        let matchesFilter = true;

        if (selectedFilter === "Attended") {
          matchesFilter = e.attended === "Attended";
        } else if (selectedFilter === "Missed") {
          matchesFilter = e.attended === "Missed";
        } else if (selectedFilter === "Upcoming") {
          matchesFilter = e.attended === "n/a" && eventDate >= now;
        }

        return matchesSearch && matchesFilter;
      })
    : [];

  useEffect(() => {
    const fetchDetails = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      try {
        const response = await getDetails(token);
        const events = Array.isArray(response.data) ? response.data : [];
        setEvent(events);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch member details:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch member details"
        );
      }
    };

    fetchDetails();
  }, []);

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
            <BreadcrumbItem>
              <BreadcrumbPage>Rawr</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      {/* Display member details */}
      <div className="p-4 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* H1 taking full width on mobile, flex-grow on larger screens */}
          <h1 className="font-bold text-xl w-full sm:flex-1">Events</h1>

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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Select Dropdown */}
          <div className="relative w-full sm:w-auto min-w-[150px]">
            <Select
              onValueChange={(value) => setSelectedFilter(value)}
              defaultValue="all"
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Filters</SelectLabel>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="Attended">Attended Events</SelectItem>
                  <SelectItem value="upcoming">Upcoming Events</SelectItem>
                  <SelectItem value="Missed">Missed Events</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-4 w-full h-full flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-full">
          {filteredEvents.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground">
              No events yet.
            </div>
          ) : (
            filteredEvents.map((e) => (
              <MemberEvent
                key={e.id}
                id={e.id}
                imageUrl={e.imageUrl}
                name={e.name}
                date={e.date}
                time={`${e.starttime} - ${e.endtime}`}
                attended={e.attended}
              />
            ))
          )}
        </div>
      </div>
    </SidebarInset>
  );
}
