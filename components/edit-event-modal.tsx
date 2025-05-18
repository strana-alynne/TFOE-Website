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
import { updateEvent } from "@/app/(portal)/portal/eagle-events/actions"; // You'll create this

// Define EventDetailsProps here if the import is not available
export interface EventDetailsProps {
  id: string;
  name: string;
  date: string;
  starttime: string;
  endtime: string;
  imageUrl?: string;
  happeningNow?: boolean;
}

interface EditEventProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  event: EventDetailsProps | null;
  onUpdated: () => void;
}

export function EditEvent({ open, setOpen, event, onUpdated }: EditEventProps) {
  const [formData, setFormData] = useState(event);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setSaving] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (open && event) {
      const formatTime = (time: string) =>
        time.length === 5 ? time : time.slice(0, 5); // e.g. "13:00:00" → "13:00"

      setFormData({
        ...event,
        starttime: formatTime(event.starttime),
        endtime: formatTime(event.endtime),
      });
      setErrors({});
      setHasSubmitted(false);
    }
  }, [open, event]);

  const handleChange = (field: keyof EventDetailsProps, value: string) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setFormData((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData?.name?.trim()) newErrors.name = "Event name is required";
    if (!formData?.date) newErrors.date = "Date is required";
    if (!formData?.starttime?.trim())
      newErrors.starttime = "Start time is required";
    if (!formData?.endtime?.trim()) newErrors.endtime = "End time is required";
    if (
      formData?.starttime &&
      formData?.endtime &&
      formData.starttime > formData.endtime
    ) {
      newErrors.endtime = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    setHasSubmitted(true);
    if (!validateForm()) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("access_token");
      if (!token || !formData?.id) throw new Error("Missing token or event ID");

      const toFullTime = (t: string) => (t.length === 5 ? `${t}:00` : t); // ensure "13:00:00"

      const response = await updateEvent(token, formData.id, {
        name: formData.name,
        date: formData.date,
        starttime: toFullTime(formData.starttime),
        endtime: toFullTime(formData.endtime),
        imageUrl:
          formData.imageUrl !== undefined ? formData.imageUrl : undefined,
        happeningNow:
          formData.happeningNow !== undefined
            ? formData.happeningNow
            : undefined,
      });

      if ("data" in response && response.data) {
        onUpdated();
        setOpen(false);
      }
    } catch (err) {
      console.error("Failed to update:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isSaving && setOpen(isOpen)}>
      <DialogContent className="sm:max-w-[425px]">
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
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={formData?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input
              type="date"
              id="date"
              value={formData?.date || ""}
              onChange={(e) => handleChange("date", e.target.value)}
              className={errors.date ? "border-red-500" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="start" className="text-right">
              Start Time
            </Label>
            <Input
              id="start"
              type="time"
              value={formData?.starttime || ""}
              onChange={(e) => handleChange("starttime", e.target.value)}
              className={errors.starttime ? "border-red-500" : ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="end" className="text-right">
              End Time
            </Label>
            <Input
              id="end"
              type="time"
              value={formData?.endtime || ""}
              onChange={(e) => handleChange("endtime", e.target.value)}
              className={errors.endtime ? "border-red-500" : ""}
            />
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
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
