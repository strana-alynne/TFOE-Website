"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttendanceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    attendanceCode: string;
    rating: number;
    feedback: string;
  }) => void;
  loading?: boolean;
}

export default function AttendanceDialog({
  open,
  onClose,
  onSubmit,
  loading,
}: AttendanceDialogProps) {
  const [attendanceCode, setAttendanceCode] = useState("");
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit({ attendanceCode, rating, feedback });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark Your Attendance</DialogTitle>
          <DialogDescription>
            Enter the attendance code and provide your feedback. Let us know
            what you think about the event.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Attendance Code</label>
            <Input
              value={attendanceCode}
              onChange={(e) => setAttendanceCode(e.target.value)}
              placeholder="Enter code"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Feedback</label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your feedback..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
