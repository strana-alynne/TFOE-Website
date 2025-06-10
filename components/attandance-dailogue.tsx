// components/attendance-dialog.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface AttendanceDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    eventCode: string;
    feedback: string;
    attendanceType: string;
  }) => Promise<void>;
  loading: boolean;
}

export default function AttendanceDialog({
  open,
  onClose,
  onSubmit,
  loading,
}: AttendanceDialogProps) {
  const [eventCode, setEventCode] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attendanceType, setAttendanceType] = useState("");
  const [errors, setErrors] = useState<{
    eventCode?: string;
    feedback?: string;
    attendanceType?: string;
  }>({});

  const validateForm = () => {
    const newErrors: {
      eventCode?: string;
      feedback?: string;
      attendanceType?: string;
    } = {};

    if (!eventCode.trim()) {
      newErrors.eventCode = "Event code is required";
    }

    if (!feedback.trim()) {
      newErrors.feedback = "Feedback is required";
    } else if (feedback.trim().length < 10) {
      newErrors.feedback = "Feedback must be at least 10 characters long";
    }

    if (!attendanceType) {
      newErrors.attendanceType = "Attendance type is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await onSubmit({
        eventCode: eventCode.trim(),
        feedback: feedback.trim(),
        attendanceType: attendanceType,
      });

      // Reset form on successful submission
      setEventCode("");
      setFeedback("");
      setAttendanceType("");
      setErrors({});
    } catch (error) {
      // Error handling is done in the parent component
      console.error("Submission error:", error);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setEventCode("");
      setFeedback("");
      setAttendanceType("");
      setErrors({});
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mark Attendance</DialogTitle>
          <DialogDescription>
            Enter the event code, select your attendance type, and provide your
            feedback to mark your attendance.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="eventCode" className="text-right">
                Event Code *
              </Label>
              <div className="col-span-3">
                <Input
                  id="eventCode"
                  value={eventCode}
                  onChange={(e) => setEventCode(e.target.value)}
                  placeholder="Enter event code"
                  disabled={loading}
                  className={errors.eventCode ? "border-red-500" : ""}
                />
                {errors.eventCode && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.eventCode}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="attendanceType" className="text-right">
                Attendance Type *
              </Label>
              <div className="col-span-3">
                <Select
                  value={attendanceType}
                  onValueChange={setAttendanceType}
                  disabled={loading}
                >
                  <SelectTrigger
                    className={errors.attendanceType ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select attendance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Face-to-face">Face-to-face</SelectItem>
                    <SelectItem value="Online Meeting">
                      Online Meeting
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.attendanceType && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.attendanceType}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="feedback" className="text-right pt-2">
                Feedback *
              </Label>
              <div className="col-span-3">
                <Textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your thoughts about the event..."
                  disabled={loading}
                  rows={4}
                  className={errors.feedback ? "border-red-500" : ""}
                />
                {errors.feedback && (
                  <p className="text-sm text-red-500 mt-1">{errors.feedback}</p>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  {feedback.length}/500 characters
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Mark Attendance"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
