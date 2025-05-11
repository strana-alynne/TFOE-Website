import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type MemberEventProps = {
  imageUrl: string;
  name: string;
  date: string;
  time: string;
  attended: boolean;
  happeningNow: boolean;
};

export function MemberEvent({
  imageUrl,
  name,
  date,
  time,
  attended,
  happeningNow,
}: MemberEventProps) {
  return (
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
          <Badge variant={attended ? "default" : "destructive"}>
            {attended ? "Attended" : "Missed"}
          </Badge>
          {happeningNow && (
            <span className="text-sm font-medium text-green-600">
              Happening Now
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
