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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

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
  cellphone: string;
  address?: string;
  dateJoined: string;
  position: string;
  contribution: string;
  absences: string;
  feedback?: string;
}

interface EditMemberModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  member: Member | null;
  onSave: (updatedMember: Member) => void;
}

export function EditMemberModal({
  open,
  setOpen,
  member,
  onSave,
}: EditMemberModalProps) {
  const [formData, setFormData] = useState<Member | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setSaving] = useState(false);

  // Reset form data when the modal opens with a new member
  useEffect(() => {
    if (member && open) {
      setFormData({ ...member });
      setErrors({});
    }
  }, [member, open]);

  // Return early if no member is provided
  if (!formData) return null;

  const handleChange = (field: keyof Member, value: string) => {
    // Clear the error for this field when the user types
    setErrors((prev) => ({ ...prev, [field]: "" }));

    setFormData((prev) => {
      if (!prev) return null;
      return { ...prev, [field]: value };
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.birthDate) newErrors.birthDate = "Birth date is required";
    if (!formData.profession.trim())
      newErrors.profession = "Profession is required";
    if (!formData.cellphone.trim())
      newErrors.contact = "Contact information is required";
    else if (formData.cellphone.length !== 11)
      newErrors.contact = "Contact number must be exactly 11 digits";
    else if (!/^\d+$/.test(formData.cellphone))
      newErrors.contact = "Contact number must contain only numbers";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      if (formData) {
        await onSave(formData);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error saving member:", error);
    } finally {
      setSaving(false);
    }
  };

  // Format birthdate for the date input (YYYY-MM-DD)
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toISOString().split("T")[0];
    } catch (e) {
      return "";
    }
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
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstname" className="text-right">
              First Name*
            </Label>
            <div className="col-span-3">
              <Input
                id="firstname"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="middlename" className="text-right">
              Middle Name
            </Label>
            <Input
              id="middlename"
              value={formData.middleName || ""}
              onChange={(e) => handleChange("middleName", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="lastname" className="text-right">
              Last Name*
            </Label>
            <div className="col-span-3">
              <Input
                id="lastname"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="suffix" className="text-right">
              Suffix
            </Label>
            <div className="col-span-3">
              <Select
                value={formData.nameExtension || "none"}
                onValueChange={(value) =>
                  handleChange("nameExtension", value === "none" ? "" : value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a suffix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Jr.">Jr.</SelectItem>
                    <SelectItem value="Sr.">Sr.</SelectItem>
                    <SelectItem value="I">I</SelectItem>
                    <SelectItem value="II">II</SelectItem>
                    <SelectItem value="III">III</SelectItem>
                    <SelectItem value="IV">IV</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="birthdate" className="text-right">
              Birthdate*
            </Label>
            <div className="col-span-3">
              <Input
                id="birthdate"
                type="date"
                value={formatDate(formData.birthDate)}
                onChange={(e) => handleChange("birthDate", e.target.value)}
                className={errors.birthDate ? "border-red-500" : ""}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-xs mt-1">{errors.birthDate}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profession" className="text-right">
              Profession*
            </Label>
            <div className="col-span-3">
              <Input
                id="profession"
                value={formData.profession}
                onChange={(e) => handleChange("profession", e.target.value)}
                className={errors.profession ? "border-red-500" : ""}
              />
              {errors.profession && (
                <p className="text-red-500 text-xs mt-1">{errors.profession}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <Input
              id="address"
              value={formData.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contact" className="text-right">
              Contact Information*
            </Label>
            <div className="col-span-3">
              <Input
                id="contact"
                value={formData.cellphone}
                onChange={(e) => handleChange("cellphone", e.target.value)}
                className={errors.contact ? "border-red-500" : ""}
              />
              {errors.contact && (
                <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
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
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
