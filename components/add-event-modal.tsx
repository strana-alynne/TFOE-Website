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

interface Event {
  imageUrl: string;
  name: string;
  date: string;
  time: string;
  happeningNow: boolean;
}

interface AddEventProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AddEvent({ open, setOpen }: AddEventProps) {
  const [formData, setFormData] = useState<Event | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setErrors({});
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
    console.log("Saving event:", formData);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData?.name?.trim()) newErrors.name = "Event name is required";
    if (!formData?.date) newErrors.date = "Date is required";
    if (!formData?.time?.trim()) newErrors.time = "Time is required";

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

        {Object.keys(errors).length > 0 && (
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
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <div className="col-span-3">
              <Input
                id=""
                value={formData?.time || ""}
                onChange={(e) => handleChange("time", e.target.value)}
                className={errors.time ? "border-red-500" : ""}
              />
              {errors.time && (
                <p className="text-red-500 text-xs mt-1">{errors.time}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Upload Image
            </Label>
            <div className="col-span-3">
              <Input id="picture" type="file" />
              {errors.time && (
                <p className="text-red-500 text-xs mt-1">{errors.time}</p>
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
          <Button disabled={isSaving}>
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
