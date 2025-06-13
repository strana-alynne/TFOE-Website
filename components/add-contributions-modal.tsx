import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

interface AddContributionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  memberId: string;
  memberName: string;
  onContributionAdded?: () => void;
}

interface ContributionPayload {
  contribution: number;
  user_id: string;
  name: string;
  created_at: string;
}

export function AddContributionModal({
  open,
  setOpen,
  memberId,
  memberName,
  onContributionAdded,
}: AddContributionModalProps) {
  const { toast } = useToast();
  const [contribution, setContribution] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setContribution("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contribution || parseFloat(contribution) <= 0) {
      toast({
        title: "Invalid Input",
        content: "Please enter a valid contribution amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("access_token")
          : null;

      if (!token) {
        toast({
          title: "Authentication Error",
          content: "No access token found. Please log in again.",
          variant: "destructive",
        });
        return;
      }

      const payload: ContributionPayload = {
        contribution: parseFloat(contribution),
        user_id: memberId,
        name: memberName,
        created_at: new Date().toISOString(),
      };

      console.log("Adding contribution with payload:", payload);

      const response = await axios.post(
        "https://tfoe-backend.onrender.com/admin/member/contribution",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Success",
          content: "Contribution added successfully.",
        });

        resetForm();

        // FIRST set loading to false
        setLoading(false);

        // THEN close the modal
        setOpen(false);
        // Trigger data refresh after a short delay
        if (onContributionAdded) {
          onContributionAdded();
        }
      }
    } catch (error) {
      console.error("Error adding contribution:", error);

      let errorMessage = "Failed to add contribution. Please try again.";

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          errorMessage = "Authentication failed. Please log in again.";
        } else if (error.response?.status === 403) {
          errorMessage = "You don't have permission to add contributions.";
        } else if (error.response?.status === 404) {
          errorMessage = "Member not found.";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      }

      toast({
        title: "Error",
        content: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    if (!loading) {
      resetForm();
      setOpen(false);
    }
  };

  // Handle modal open/close changes
  const handleOpenChange = (newOpen: boolean) => {
    if (!loading) {
      setOpen(newOpen);
      if (!newOpen) {
        // Reset form when modal closes
        resetForm();
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Contribution</DialogTitle>
          <DialogDescription>
            Add a new contribution for this member. Enter the contribution
            amount below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contribution" className="text-right">
                Amount
              </Label>
              <Input
                id="contribution"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                className="col-span-3"
                required
                disabled={loading}
                autoFocus
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
            <Button type="submit" disabled={loading || !contribution}>
              {loading ? "Adding..." : "Add Contribution"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
