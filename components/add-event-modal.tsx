import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { addEvent } from "@/app/(portal)/portal/eagle-events/actions";
import { de } from "date-fns/locale";

interface Event {
  name: string;
  date: string;
  time: string;
  startTime: string;
  endTime: string;
  happeningNow: boolean;
  description?: string;
}

interface AddEventProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AddEvent({ open, setOpen }: AddEventProps) {
  const [formData, setFormData] = useState<Event | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setSaving] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData({
        name: "",
        date: "",
        time: "",
        startTime: "",
        endTime: "",
        happeningNow: false,
        description: "",
      });

      setErrors({});
      setHasSubmitted(false);
    }
  }, [open]);

  const handleChange = (field: keyof Event, value: string) => {
    // Clear the error for this field when the user types
    setErrors((prev) => ({ ...prev, [field]: "" }));

    setFormData((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (e) {
      return "";
    }
  };

  const handleSave = async () => {
    setHasSubmitted(true);
    if (!validateForm()) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Missing access token");

      const payload = {
        eventCode: generateEventCode(),
        eventTitle: formData?.name,
        eventDetails: formData?.description,
        eventAttendees: 0,
        eventDate: formData?.date,
        startTime: formData?.startTime,
        endTime: formData?.endTime,
      };

      console.log("Payload:", payload);
      const response = await addEvent(token, payload);
      console.log("Response:", response);
      if (response?.data) {
        setOpen(false);
      } else {
        console.error("Failed to create event:", response.message);
      }
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setSaving(false);
    }
  };

  function generateEventCode(length = 8) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("");
  }
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData?.name?.trim()) newErrors.name = "Event name is required";
    if (!formData?.description?.trim())
      newErrors.description = "Event description is required";
    if (!formData?.date) newErrors.date = "Date is required";
    if (!formData?.startTime?.trim())
      newErrors.startTime = "Start time is required";
    if (!formData?.endTime?.trim()) newErrors.endTime = "End time is required";
    if (
      formData?.startTime &&
      formData?.endTime &&
      formData.startTime > formData.endTime
    ) {
      newErrors.endTime = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isSaving) setOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Fill in the details of the new event below.
          </DialogDescription>
        </DialogHeader>

        {hasSubmitted && Object.keys(errors).length > 0 && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Please fix the errors in the form to continue.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Event Name
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                placeholder="Enter Event Name"
                value={formData?.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <div className="col-span-3">
              <Input
                id="description"
                placeholder="Enter Description"
                value={formData?.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <div className="col-span-3">
              <Input
                id="date"
                type="date"
                value={formatDate(formData?.date || "")}
                onChange={(e) => handleChange("date", e.target.value)}
                className={errors.date ? "border-red-500" : ""}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">{errors.date}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startTime" className="text-right">
              Start Time
            </Label>
            <div className="col-span-3">
              <Input
                id="startTime"
                type="time"
                value={formData?.startTime || ""}
                onChange={(e) => handleChange("startTime", e.target.value)}
                className={errors.startTime ? "border-red-500" : ""}
              />
              {errors.startTime && (
                <p className="text-red-500 text-xs mt-1">{errors.startTime}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endTime" className="text-right">
              End Time
            </Label>
            <div className="col-span-3">
              <Input
                id="endTime"
                type="time"
                value={formData?.endTime || ""}
                onChange={(e) => handleChange("endTime", e.target.value)}
                className={errors.endTime ? "border-red-500" : ""}
              />
              {errors.endTime && (
                <p className="text-red-500 text-xs mt-1">{errors.endTime}</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Add Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
