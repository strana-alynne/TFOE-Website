import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type AdminEventProps = {
  id: string;
  imageUrl: string;
  name: string;
  date: string;
  time: string;
  attendedCount: number;
  attendanceCode: string;
};

export function AdminEvent({
  id,
  imageUrl,
  name,
  date,
  time,
  attendedCount,
  attendanceCode,
}: AdminEventProps) {
  return (
    <Link href={`/portal/eagle-events/${id}`}>
      <Card className="w-full max-w-md overflow-hidden rounded-2xl shadow-md">
        <img src={imageUrl} alt={name} className="h-48 w-full object-cover" />

        <CardHeader>
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
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
