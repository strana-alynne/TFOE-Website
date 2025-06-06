"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
}

interface AdminEditPositionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  member: Member | null;
  onSave: (updatedMember: Member) => Promise<boolean>;
}

export function AdminEditPositionModal({
  open,
  setOpen,
  member,
  onSave,
}: AdminEditPositionModalProps) {
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (member) {
      setPosition(member.position || "");
    }
  }, [member]);

  const handleSave = async () => {
    if (!member) return;

    setLoading(true);
    try {
      const updatedMember = {
        ...member,
        position: position.trim(),
      };

      const success = await onSave(updatedMember);
      if (success) {
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating position:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (member) {
      setPosition(member.position || "");
    }
  };

  if (!member) return null;

  const fullName =
    `${member.firstName || ""} ${member.middleName || ""} ${member.lastName || ""} ${member.nameExtension || ""}`.trim();

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Position</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Update position for {fullName}
          </p>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Enter position"
              disabled={loading}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={loading || !position.trim()}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
