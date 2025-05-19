import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type MemberEventProps = {
  id: string;
  imageUrl: string;
  name: string;
  date: string;
  time: string;
  attended: string;
};

export function MemberEvent({
  id,
  imageUrl,
  name,
  date,
  time,
  attended,
}: MemberEventProps) {
  return (
    <Link href={`/portal-member/eagle-events/${id}`}>
      <Card className="w-full max-w-md overflow-hidden rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">{name}</CardTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{date}</span>
            <span>{time}</span>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <Badge
              variant={
                attended === "Attended"
                  ? "default"
                  : attended === "Missed"
                    ? "destructive"
                    : "secondary"
              }
            >
              {attended === "Attended"
                ? "Attended"
                : attended === "Missed"
                  ? "Missed"
                  : "Upcoming"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
