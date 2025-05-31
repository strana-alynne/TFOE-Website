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
import { Textarea } from "@/components/ui/textarea";
import { addEvent } from "@/app/(portal)/portal/eagle-events/actions";

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

  // Fixed date formatting function
  const formatDateForAPI = (dateString: string) => {
    if (!dateString) return "";

    // If it's already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }

    // Otherwise, try to parse and format
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
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

      // Format the date properly for the API
      const formattedDate = formatDateForAPI(formData?.date || "");

      // Validate that we have a proper date
      if (!formattedDate) {
        setErrors({ date: "Invalid date format" });
        setSaving(false);
        return;
      }

      // Create clean payload object
      const payload = {
        eventCode: generateEventCode(),
        eventTitle: formData?.name?.trim() || "",
        eventDate: formattedDate,
        startTime: formData?.startTime || "",
        endTime: formData?.endTime || "",
        ...(formData?.description?.trim() && {
          eventDetails: formData.description.trim(),
        }),
      };

      // Validate required fields are not empty
      if (
        !payload.eventTitle ||
        !payload.eventDate ||
        !payload.startTime ||
        !payload.endTime
      ) {
        setErrors({ general: "All required fields must be filled" });
        setSaving(false);
        return;
      }

      console.log("Payload being sent:", payload);

      const response = await addEvent(token, payload);
      console.log("Full Response:", response);

      // Check if the response indicates success
      if (response && !response.error && response.data) {
        console.log("Event created successfully");
        setOpen(false);
      } else {
        console.error("Failed to create event:", response);
        const errorMessage =
          response?.data?.detail ||
          response?.message ||
          "Failed to create event";
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error("Failed to save:", error);
      setErrors({ general: "An unexpected error occurred" });
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

    if (!formData?.name?.trim()) newErrors.name = "Event title is required";
    if (!formData?.date) newErrors.date = "Date is required";
    if (!formData?.startTime?.trim())
      newErrors.startTime = "Start time is required";
    if (!formData?.endTime?.trim()) newErrors.endTime = "End time is required";

    // Validate date format
    if (formData?.date && !formatDateForAPI(formData.date)) {
      newErrors.date = "Please enter a valid date";
    }

    // Validate date is not in the past
    if (formData?.date) {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "Event date cannot be in the past";
      }
    }

    if (
      formData?.startTime &&
      formData?.endTime &&
      formData.startTime >= formData.endTime
    ) {
      newErrors.endTime = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
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
              {errors.general && (
                <div className="mt-2 font-medium">{errors.general}</div>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Event Title *
            </Label>
            <Input
              id="name"
              value={formData?.name || ""}
              onChange={(e) => handleChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
              placeholder="Enter event title"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-right">
              Event Details
            </Label>
            <Textarea
              id="description"
              value={formData?.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter event description"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-right">
              Date *
            </Label>
            <Input
              type="date"
              id="date"
              value={formData?.date || ""}
              onChange={(e) => handleChange("date", e.target.value)}
              className={errors.date ? "border-red-500" : ""}
            />
            {errors.date && (
              <p className="text-sm text-red-500">{errors.date}</p>
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSaving}>
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
