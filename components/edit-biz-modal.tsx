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
import { Textarea } from "@/components/ui/textarea";

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
  businessName?: string;
  businessTelephone?: string;
  businessFax?: string;
  businessAddress?: string;
  [key: string]: any;
}

interface EditBusinessModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  member: Member | null;
  onSave: (updatedMember: Member, modalType: string) => Promise<boolean>;
}

export function EditBusinessModal({
  open,
  setOpen,
  member,
  onSave,
}: EditBusinessModalProps) {
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

  const handleSave = async () => {
    try {
      setSaving(true);
      if (formData) {
        const success = await onSave(formData, "business");
        if (success) {
          setOpen(false);
        }
      }
    } catch (error) {
      console.error("Error saving business info:", error);
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
          <DialogTitle>Edit Business Information</DialogTitle>
          <DialogDescription>
            Update business information here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="businessName" className="text-right">
              Business Name
            </Label>
            <Input
              id="businessName"
              value={formData.businessName || ""}
              onChange={(e) => handleChange("businessName", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="businessTelephone" className="text-right">
              Business Phone
            </Label>
            <Input
              id="businessTelephone"
              value={formData.businessTelephone || ""}
              onChange={(e) =>
                handleChange("businessTelephone", e.target.value)
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="businessFax" className="text-right">
              Business Fax
            </Label>
            <Input
              id="businessFax"
              value={formData.businessFax || ""}
              onChange={(e) => handleChange("businessFax", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="businessAddress" className="text-right pt-2">
              Business Address
            </Label>
            <Textarea
              id="businessAddress"
              value={formData.businessAddress || ""}
              onChange={(e) => handleChange("businessAddress", e.target.value)}
              className="col-span-3"
              rows={3}
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
