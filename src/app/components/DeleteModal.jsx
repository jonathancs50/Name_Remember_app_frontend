import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onDelete,
  itemId,
  title = "Confirm Deletion",
  message = "Are you sure you would like to delete this item? This action cannot be undone.",
}) {
  const handleDeleteConfirm = () => {
    onDelete(itemId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">{message}</p>
        <DialogFooter className="gap-2">
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
