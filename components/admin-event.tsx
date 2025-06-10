import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Hash } from "lucide-react";
import Link from "next/link";

type AdminEventProps = {
  id: string;
  imageUrl: string;
  name: string;
  date: string;
  time: string;
  description: string;
  attendedCount: Array<
    string | { eventCode: string; memberId: string; memberName: string }
  >; // Updated to match actual data
  attendanceCode: string;
};

export function AdminEvent({
  id,
  name,
  date,
  time,
  attendedCount,
  description,
  attendanceCode,
}: AdminEventProps) {
  // Handle the mixed array (empty strings and objects)
  const getAttendeeCount = () => {
    if (Array.isArray(attendedCount)) {
      // Filter out empty strings and count only valid attendee objects
      const validAttendees = attendedCount.filter(
        (attendee) =>
          typeof attendee === "object" &&
          attendee !== null &&
          attendee.memberName &&
          attendee.memberId
      );
      return validAttendees.length;
    }
    return typeof attendedCount === "number" ? attendedCount : 0;
  };

  return (
    <Link href={`/portal/eagle-events/${id}`} className="group">
      <Card className="w-full max-w-md overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-[320px] flex flex-col">
        <CardHeader className="flex flex-col flex-1 p-4 space-y-3">
          {/* Title with enhanced styling */}
          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200 line-clamp-2">
            {name}
          </CardTitle>

          {/* Description with better spacing */}
          <CardDescription className="line-clamp-2 text-sm text-gray-600 leading-relaxed font-medium flex-grow">
            {description}
          </CardDescription>

          {/* Event details with icons, pinned at bottom */}
          <div className="flex flex-col space-y-1.5 text-xs text-gray-700 mt-auto">
            <div className="flex items-center space-x-1.5 bg-blue-50 px-2 py-1 rounded-lg">
              <Calendar className="w-3 h-3 text-yellow-600 flex-shrink-0" />
              <span className="font-medium truncate">{date}</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-purple-50 px-2 py-1 rounded-lg">
              <Clock className="w-3 h-3 text-purple-600 flex-shrink-0" />
              <span className="font-medium truncate">{time}</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-green-50 px-2 py-1 rounded-lg">
              <Users className="w-3 h-3 text-green-600 flex-shrink-0" />
              <span className="font-medium truncate">
                {getAttendeeCount()} Participants
              </span>
            </div>
            <div className="flex items-center space-x-1.5 bg-orange-50 px-2 py-1 rounded-lg">
              <Hash className="w-3 h-3 text-orange-600 flex-shrink-0" />
              <span className="font-medium truncate">
                Code: {attendanceCode}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
