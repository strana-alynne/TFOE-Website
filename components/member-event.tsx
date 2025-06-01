import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

type MemberEventProps = {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  date: string;
  time: string;
  attended: string;
  attendanceCode: string;
};

export function MemberEvent({
  id,
  imageUrl,
  name,
  description,
  date,
  time,
  attended,
  attendanceCode,
}: MemberEventProps) {
  return (
    <Link href={`/portal-member/eagle-events/${id}`}>
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
            <Badge variant="default">{attendanceCode}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
