"use client";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { updateEvent } from "@/app/(portal)/portal/eagle-events/actions";

export interface EventDetailsProps {
  id: string;
  eventTitle: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  eventAttendees: number;
  eventCode: string;
  eventDetails: string;
  participants?: { id: string; name: string; feedback: string }[];
}

interface EditEventProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  event: EventDetailsProps | null;
  onUpdated: () => void;
}

export function EditEvent({ open, setOpen, event, onUpdated }: EditEventProps) {
  const [formData, setFormData] = useState<EventDetailsProps | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setSaving] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (open && event) {
      console.log("EditEvent - Received event data:", event);

      const formatTime = (time: string) => {
        if (!time) return "";
        // Handle various time formats: "13:00:00" → "13:00", "13:00" → "13:00"
        return time.length > 5 ? time.slice(0, 5) : time;
      };

      setFormData({
        ...event,
        startTime: formatTime(event.startTime),
        endTime: formatTime(event.endTime),
      });
      setErrors({});
      setHasSubmitted(false);
    }
  }, [open, event]);

  const handleChange = (
    field: keyof EventDetailsProps,
    value: string | number
  ) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData?.eventTitle?.trim()) {
      newErrors.eventTitle = "Event title is required";
    }
    if (!formData?.eventDate) {
      newErrors.eventDate = "Date is required";
    }
    if (!formData?.startTime?.trim()) {
      newErrors.startTime = "Start time is required";
    }
    if (!formData?.endTime?.trim()) {
      newErrors.endTime = "End time is required";
    }
    if (!formData?.eventCode?.trim()) {
      newErrors.eventCode = "Event code is required";
    }

    // Validate time logic
    if (
      formData?.startTime &&
      formData?.endTime &&
      formData.startTime >= formData.endTime
    ) {
      newErrors.endTime = "End time must be after start time";
    }

    // Validate date is not in the past (optional)
    if (formData?.eventDate) {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.eventDate = "Event date cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Helper function to get token safely
  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  };

  const handleSave = async () => {
    setHasSubmitted(true);
    console.log("EditEvent - Attempting to save:", formData);

    if (!validateForm()) {
      console.log("EditEvent - Validation failed:", errors);
      return;
    }

    setSaving(true);

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      if (!formData?.id) {
        throw new Error("No event ID found");
      }

      const toFullTime = (t: string) => {
        if (!t) return "";
        return t.length === 5 ? `${t}:00` : t;
      };

      // Prepare the update payload to match your API schema exactly
      const updatePayload = {
        eventCode: formData.eventCode,
        eventTitle: formData.eventTitle,
        eventDetails: formData.eventDetails || "",
        eventAttendees: Number(formData.eventAttendees) || 0,
        eventDate: formData.eventDate,
        startTime: toFullTime(formData.startTime),
        endTime: toFullTime(formData.endTime),
      };

      console.log("EditEvent - Sending update payload:", updatePayload);

      const response = await updateEvent(token, updatePayload, formData.id);

      console.log("EditEvent - Update response:", response);

      // More flexible response checking
      if (response) {
        console.log("EditEvent - Update successful");
        onUpdated();
        setOpen(false);
        // Clear form data
        setFormData(null);
        setErrors({});
        setHasSubmitted(false);
      } else {
        console.error("EditEvent - Update failed:", response);
      }
    } catch (err) {
      console.error("EditEvent - Failed to update:", err);

      let errorMessage = "Failed to update event";

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === "string") {
        errorMessage = err;
      } else if (err && typeof err === "object") {
        // Handle API error responses
        errorMessage =
          (err as any).message ||
          (err as any).error ||
          (err as any).details ||
          errorMessage;
      }

      setErrors({
        general: errorMessage,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (!isSaving) {
      setOpen(false);
      // Clear form state when closing
      setFormData(null);
      setErrors({});
      setHasSubmitted(false);
    }
  };

  if (!formData && open) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex items-center justify-center p-6">
            <p>Loading event data...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>
            Update the details of the event.
          </DialogDescription>
        </DialogHeader>

        {hasSubmitted && Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please fix the errors in the form to continue.
              {errors.general && (
                <div className="mt-2 font-medium">{errors.general}</div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="eventTitle" className="text-right">
              Event Title *
            </Label>
            <Input
              id="eventTitle"
              value={formData?.eventTitle || ""}
              onChange={(e) => handleChange("eventTitle", e.target.value)}
              className={errors.eventTitle ? "border-red-500" : ""}
              placeholder="Enter event title"
            />
            {errors.eventTitle && (
              <p className="text-sm text-red-500">{errors.eventTitle}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventCode" className="text-right">
              Event Code *
            </Label>
            <Input
              id="eventCode"
              value={formData?.eventCode || ""}
              onChange={(e) => handleChange("eventCode", e.target.value)}
              className={errors.eventCode ? "border-red-500" : ""}
              placeholder="e.g., EVT-2025-001"
            />
            {errors.eventCode && (
              <p className="text-sm text-red-500">{errors.eventCode}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDetails" className="text-right">
              Event Details
            </Label>
            <Textarea
              id="eventDetails"
              value={formData?.eventDetails || ""}
              onChange={(e) => handleChange("eventDetails", e.target.value)}
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventDate" className="text-right">
              Date *
            </Label>
            <Input
              type="date"
              id="eventDate"
              value={formData?.eventDate || ""}
              onChange={(e) => handleChange("eventDate", e.target.value)}
              className={errors.eventDate ? "border-red-500" : ""}
            />
            {errors.eventDate && (
              <p className="text-sm text-red-500">{errors.eventDate}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime" className="text-right">
                Start Time *
              </Label>
              <Input
                id="startTime"
                type="time"
                value={formData?.startTime || ""}
                onChange={(e) => handleChange("startTime", e.target.value)}
                className={errors.startTime ? "border-red-500" : ""}
              />
              {errors.startTime && (
                <p className="text-sm text-red-500">{errors.startTime}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime" className="text-right">
                End Time *
              </Label>
              <Input
                id="endTime"
                type="time"
                value={formData?.endTime || ""}
                onChange={(e) => handleChange("endTime", e.target.value)}
                className={errors.endTime ? "border-red-500" : ""}
              />
              {errors.endTime && (
                <p className="text-sm text-red-500">{errors.endTime}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="eventAttendees" className="text-right">
              Expected Attendees
            </Label>
            <Input
              id="eventAttendees"
              type="number"
              min="0"
              value={formData?.eventAttendees || 0}
              onChange={(e) =>
                handleChange("eventAttendees", parseInt(e.target.value) || 0)
              }
              placeholder="0"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
