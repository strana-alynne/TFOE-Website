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
  contact: string;
  address?: string;
  dateJoined: string;
  position: string;
  contribution: string | number;
  absences: string | number;
  feedback?: string;
  // Add these new fields:
  birthPlace?: string;
  civilStatus?: string;
  height?: number;
  weight?: number;
  citizenship?: string;
  religion?: string;
  bloodType?: string;
  telephone?: string;
}

interface AdminEditMemberModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  member: Member | null;
  onSave: (updatedMember: Member) => Promise<boolean>; // Changed to Promise<boolean>
}

export function AdminEditMemberModal({
  open,
  setOpen,
  member,
  onSave,
}: AdminEditMemberModalProps) {
  const [formData, setFormData] = useState<Member | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string>("");

  // Reset form data when the modal opens with a new member
  useEffect(() => {
    if (member && open) {
      setFormData({ ...member });
      setErrors({});
      setSaveError("");
    }
  }, [member, open]);

  // Return early if no member is provided
  if (!formData) return null;

  // Updated handleChange function in AdminEditMemberModal
  const handleChange = (field: keyof Member, value: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });

    setSaveError("");

    setFormData((prev) => {
      if (!prev) return null;

      // Special handling for date fields
      if (field === "birthDate" || field === "dateJoined") {
        const formattedValue = value ? new Date(value).toISOString() : value;
        return { ...prev, [field]: formattedValue };
      }

      // Special handling for numeric fields
      if (field === "height" || field === "weight") {
        const numericValue = value ? parseInt(value) : undefined;
        return { ...prev, [field]: numericValue };
      }

      return { ...prev, [field]: value };
    });
  };

  // Updated validation function
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields validation
    if (!formData.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Birth date is required";
    } else {
      // Validate date format
      const date = new Date(formData.birthDate);
      if (isNaN(date.getTime())) {
        newErrors.birthDate = "Please enter a valid birth date";
      }
    }
    if (!formData.profession?.trim()) {
      newErrors.profession = "Profession is required";
    }
    if (!formData.contact?.trim()) {
      newErrors.contact = "Contact information is required";
    }
    if (!formData.status || formData.status.trim() === "") {
      newErrors.status = "Status is required";
    }

    // Email validation (if provided)
    if (formData.email && formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Contact validation
    if (formData.contact && formData.contact.trim().length < 10) {
      newErrors.contact = "Contact number should be at least 10 digits";
    }

    // Status validation
    const validStatuses = ["ACTIVE", "INACTIVE", "PENDING"];
    if (
      formData.status &&
      !validStatuses.includes(formData.status.toUpperCase())
    ) {
      newErrors.status = "Please select a valid status";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      setSaveError("");

      if (formData) {
        console.log("Saving member data:", formData);
        const success = await onSave(formData);

        if (success) {
          console.log("Save successful, closing modal");
          setOpen(false);
        } else {
          setSaveError("Failed to save changes. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error saving member:", error);
      setSaveError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  // Updated formatDate function
  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "";
      const date = new Date(dateString);

      // Check if date is valid
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "";
      }

      // Return in YYYY-MM-DD format for date input
      return date.toISOString().split("T")[0];
    } catch (e) {
      console.error("Date formatting error:", e);
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
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to the member profile here. Click save when you're
            done.
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

        {saveError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{saveError}</AlertDescription>
          </Alert>
        )}

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
            <Label htmlFor="status" className="text-right">
              Status*
            </Label>
            <div className="col-span-3">
              <Select
                value={formData.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger
                  className={`w-full ${errors.status ? "border-red-500" : ""}`}
                >
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">{errors.status}</p>
              )}
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
                value={formData.contact}
                onChange={(e) => handleChange("contact", e.target.value)}
                className={errors.contact ? "border-red-500" : ""}
                placeholder="e.g., +63 912 345 6789"
              />
              {errors.contact && (
                <p className="text-red-500 text-xs mt-1">{errors.contact}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <div className="col-span-3">
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="birthplace" className="text-right">
              Birth Place
            </Label>
            <Input
              id="birthplace"
              value={formData.birthPlace || ""}
              onChange={(e) => handleChange("birthPlace", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="civilstatus" className="text-right">
              Civil Status
            </Label>
            <div className="col-span-3">
              <Select
                value={formData.civilStatus || ""}
                onValueChange={(value) => handleChange("civilStatus", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select civil status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="Single">Single</SelectItem>
                    <SelectItem value="Married">Married</SelectItem>
                    <SelectItem value="Divorced">Divorced</SelectItem>
                    <SelectItem value="Widowed">Widowed</SelectItem>
                    <SelectItem value="Separated">Separated</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="citizenship" className="text-right">
              Citizenship
            </Label>
            <Input
              id="citizenship"
              value={formData.citizenship || ""}
              onChange={(e) => handleChange("citizenship", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="religion" className="text-right">
              Religion
            </Label>
            <Input
              id="religion"
              value={formData.religion || ""}
              onChange={(e) => handleChange("religion", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="bloodtype" className="text-right">
              Blood Type
            </Label>
            <div className="col-span-3">
              <Select
                value={formData.bloodType || ""}
                onValueChange={(value) => handleChange("bloodType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="none">Unknown</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Height (cm)
            </Label>
            <Input
              id="height"
              type="number"
              value={formData.height || ""}
              onChange={(e) => handleChange("height", e.target.value)}
              className="col-span-3"
              placeholder="e.g., 170"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="weight" className="text-right">
              Weight (kg)
            </Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight || ""}
              onChange={(e) => handleChange("weight", e.target.value)}
              className="col-span-3"
              placeholder="e.g., 70"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="telephone" className="text-right">
              Telephone
            </Label>
            <Input
              id="telephone"
              value={formData.telephone || ""}
              onChange={(e) => handleChange("telephone", e.target.value)}
              className="col-span-3"
              placeholder="e.g., (02) 123-4567"
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
