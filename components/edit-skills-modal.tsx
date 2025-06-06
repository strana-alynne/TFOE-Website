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
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

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
  hobbies?: string[];
  skills?: string[];
  [key: string]: any;
}

interface EditSkillsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  member: Member | null;
  onSave: (updatedMember: Member, modalType: string) => Promise<boolean>;
}

export function EditSkillsModal({
  open,
  setOpen,
  member,
  onSave,
}: EditSkillsModalProps) {
  const [formData, setFormData] = useState<Member | null>(null);
  const [isSaving, setSaving] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [newHobby, setNewHobby] = useState("");

  useEffect(() => {
    if (member && open) {
      setFormData({
        ...member,
        skills: member.skills || [],
        hobbies: member.hobbies || [],
      });
    }
  }, [member, open]);

  if (!formData) return null;

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData((prev) => ({
        ...prev!,
        skills: [...(prev!.skills || []), newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev!,
      skills: (prev!.skills || []).filter((skill) => skill !== skillToRemove),
    }));
  };

  const addHobby = () => {
    if (newHobby.trim() && !formData.hobbies?.includes(newHobby.trim())) {
      setFormData((prev) => ({
        ...prev!,
        hobbies: [...(prev!.hobbies || []), newHobby.trim()],
      }));
      setNewHobby("");
    }
  };

  const removeHobby = (hobbyToRemove: string) => {
    setFormData((prev) => ({
      ...prev!,
      hobbies: (prev!.hobbies || []).filter((hobby) => hobby !== hobbyToRemove),
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (formData) {
        const success = await onSave(formData, "skills");
        if (success) {
          setOpen(false);
        }
      }
    } catch (error) {
      console.error("Error saving skills:", error);
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
          <DialogTitle>Edit Skills & Hobbies</DialogTitle>
          <DialogDescription>
            Update your skills and hobbies here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Skills Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Skills</Label>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addSkill}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills?.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Hobbies Section */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Hobbies</Label>
            <div className="flex gap-2">
              <Input
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder="Add a hobby"
                onKeyPress={(e) => e.key === "Enter" && addHobby()}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={addHobby}
                size="sm"
                variant="outline"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.hobbies?.map((hobby, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  {hobby}
                  <button
                    type="button"
                    onClick={() => removeHobby(hobby)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
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
