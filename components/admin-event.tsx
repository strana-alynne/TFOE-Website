import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Description } from "@radix-ui/react-toast";

type AdminEventProps = {
  id: string;
  imageUrl: string;
  name: string;
  date: string;
  time: string;
  description: string;
  attendedCount: number;
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
  return (
    <Link href={`/portal/eagle-events/${id}`}>
      <Card className="w-full max-w-md overflow-hidden rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{date}</span>
            <span>{time}</span>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">{attendedCount} Participants</Badge>
            <span className="text-sm font-bold text-green-600">
              Code: {attendanceCode}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
