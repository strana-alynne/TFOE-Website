"use client";
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

interface Member {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  nameExtension?: string;
  status: string;
  birthDate: string;
  profession: string;
  email: string;
  contact: string;
  address?: string;
  dateJoined: string;
  position: string;
  contribution: string | number;
  absences: string | number;
  feedback?: string;
  elementary?: string;
  dateGraduateElementary?: string;
  highschool?: string;
  dateGraduateHighschool?: string;
  college?: string;
  dateGraduateCollege?: string;
  course?: string;
  [key: string]: any;
}

interface EditEducationModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  member: Member | null;
  onSave: (updatedMember: Member, modalType: string) => Promise<boolean>;
}

export function EditEducationModal({
  open,
  setOpen,
  member,
  onSave,
}: EditEducationModalProps) {
  const [formData, setFormData] = useState<Member | null>(null);
  const [isSaving, setSaving] = useState(false);

  useEffect(() => {
    if (member && open) {
      setFormData({ ...member });
    }
  }, [member, open]);

  if (!formData) return null;

  const handleChange = (field: keyof Member, value: string) => {
    setFormData((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (e) {
      return "";
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (formData) {
        const success = await onSave(formData, "education");
        if (success) {
          setOpen(false);
        }
      }
    } catch (error) {
      console.error("Error saving education:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isSaving) setOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Educational Background</DialogTitle>
          <DialogDescription>
            Update educational information here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="elementary" className="text-right">
              Elementary
            </Label>
            <Input
              id="elementary"
              value={formData.elementary || ""}
              onChange={(e) => handleChange("elementary", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateGraduateElementary" className="text-right">
              Graduation Date
            </Label>
            <Input
              id="dateGraduateElementary"
              type="date"
              value={formatDate(formData.dateGraduateElementary || "")}
              onChange={(e) =>
                handleChange("dateGraduateElementary", e.target.value)
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="highschool" className="text-right">
              High School
            </Label>
            <Input
              id="highschool"
              value={formData.highschool || ""}
              onChange={(e) => handleChange("highschool", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateGraduateHighschool" className="text-right">
              Graduation Date
            </Label>
            <Input
              id="dateGraduateHighschool"
              type="date"
              value={formatDate(formData.dateGraduateHighschool || "")}
              onChange={(e) =>
                handleChange("dateGraduateHighschool", e.target.value)
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="college" className="text-right">
              College
            </Label>
            <Input
              id="college"
              value={formData.college || ""}
              onChange={(e) => handleChange("college", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dateGraduateCollege" className="text-right">
              Graduation Date
            </Label>
            <Input
              id="dateGraduateCollege"
              type="date"
              value={formatDate(formData.dateGraduateCollege || "")}
              onChange={(e) =>
                handleChange("dateGraduateCollege", e.target.value)
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="course" className="text-right">
              Course
            </Label>
            <Input
              id="course"
              value={formData.course || ""}
              onChange={(e) => handleChange("course", e.target.value)}
              className="col-span-3"
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
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
