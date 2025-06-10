import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";

type MemberEventProps = {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  date: string;
  time: string;
};

export function MemberEvent({
  id,
  name,
  description,
  date,
  time,
}: MemberEventProps) {
  return (
    <Link href={`/portal-member/eagle-events/${id}`} className="group">
      <Card className="w-full max-w-md overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-[280px] flex flex-col">
        <CardHeader className="flex flex-col flex-1 p-6 space-y-4">
          {/* Title with enhanced styling */}
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors duration-200 line-clamp-2">
            {name}
          </CardTitle>

          {/* Description with better spacing */}
          <CardDescription className="line-clamp-3 text-sm text-gray-600 leading-relaxed font-medium flex-grow">
            {description}
          </CardDescription>

          {/* Event details with icons, pinned at bottom */}
          <div className="flex flex-col space-y-2 text-sm text-gray-700 mt-auto">
            <div className="flex items-center space-x-1.5 bg-blue-50 px-2.5 py-1.5 rounded-lg">
              <Calendar className="w-4 h-4 text-yellow-600" />
              <span className="font-medium">{date}</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-purple-50 px-2.5 py-1.5 rounded-lg">
              <Clock className="w-4 h-4 text-purple-600" />
              <span className="font-medium">{time}</span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
