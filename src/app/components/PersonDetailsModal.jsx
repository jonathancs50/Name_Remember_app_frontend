import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PersonDetailsModal({
  person,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPerson, setEditedPerson] = useState({ ...person });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPerson((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    onUpdate(editedPerson);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPerson({ ...person });
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(person.id);
    setShowDeleteConfirmation(false);
    onClose();
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEditing ? "Edit person Profile" : "person Profile"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-between items-center">
          {isEditing ? (
            <>
              <Button
                onClick={handleUpdate}
                className="bg-green-500 hover:bg-green-700"
              >
                Confirm
              </Button>
              <Button
                onClick={handleCancel}
                className="bg-gray-500 hover:bg-gray-700"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-green-500 hover:bg-green-700"
              >
                Update
              </Button>
              <Button
                onClick={handleDeleteClick}
                className="bg-red-600 hover:bg-red-900"
              >
                Delete
              </Button>
            </>
          )}
        </div>
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="flex flex-col items-center space-y-4 mt-4">
            <div className="text-center w-full">
              {isEditing ? (
                <>
                  <p className="text-left text-sm font-light">First Name*</p>
                  <Input
                    name="firstName"
                    value={editedPerson.firstName}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                  <p className="text-left text-sm font-light">Last Name</p>

                  <Input
                    name="lastName"
                    value={editedPerson.lastName}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                  <p className="text-left text-sm font-light">Pronunciation</p>

                  <Input
                    name="pronunciation"
                    value={editedPerson.pronunciation}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-semibold">
                    {editedPerson.firstName} {editedPerson.lastName}
                  </h2>
                  <p className="text-muted-foreground">
                    ({editedPerson.pronunciation})
                  </p>
                </>
              )}
              <Badge variant="secondary" className="mt-2">
                {editedPerson.role}
              </Badge>
            </div>
            <Separator />
            <div className="w-full">
              <h3 className="font-semibold mb-2">Professional Information</h3>
              {isEditing ? (
                <>
                  <p className="text-left text-sm font-light">Company</p>
                  <Input
                    name="company"
                    value={editedPerson.company}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                  <p className="text-left text-sm font-light">Role</p>
                  <Input
                    name="role"
                    value={editedPerson.role}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                </>
              ) : (
                <>
                  <p>
                    <strong>Company:</strong> {editedPerson.company}
                  </p>
                  <p>
                    <strong>Role:</strong> {editedPerson.role}
                  </p>
                </>
              )}
            </div>
            <Separator />
            <div className="w-full">
              {/* <h3 className="font-semibold mb-2">Personal Details</h3> */}
              {isEditing ? (
                <>
                  {/* <Textarea
                    name="physicalDescription"
                    value={editedPerson.physicalDescription}
                    onChange={handleInputChange}
                    className="mb-2"
                  /> */}

                  <p className="text-left text-sm font-semibold mb-2">Notes:</p>
                  <Textarea
                    name="personalNotes"
                    value={editedPerson.personalNotes}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                </>
              ) : (
                <>
                  <p>
                    <strong>Personal Notes:</strong>{" "}
                  </p>
                  <p className="font-light">{editedPerson.personalNotes}</p>
                </>
              )}
            </div>
            <Separator />
            <div className="w-full">
              <h3 className="font-semibold mb-2">Interests & Topics</h3>
              {isEditing ? (
                <Input
                  name="interests"
                  value={editedPerson.interests.join(", ")}
                  onChange={(e) =>
                    handleInputChange({
                      target: {
                        name: "interests",
                        value: e.target.value.split(", "),
                      },
                    })
                  }
                  className="mb-2"
                />
              ) : (
                <p className="font-light">
                  {editedPerson.interests.join(", ")}
                </p>
              )}
            </div>
            <Separator />
            <div className="w-full">
              <h3 className="font-semibold">Meeting Context:</h3>
              {isEditing ? (
                <div>
                  <Textarea
                    name="meetingContext"
                    value={editedPerson.meetingContext}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                  <p className="text-left text-sm font-semibold mb-2">
                    Memory Triggers
                  </p>
                  <Textarea
                    name="memoryTriggers"
                    value={editedPerson.memoryTriggers}
                    onChange={handleInputChange}
                    className="mb-2 "
                  />
                </div>
              ) : (
                <div>
                  <p className="font-light">{editedPerson.meetingContext}</p>
                  <p>
                    {" "}
                    <strong>Memory Triggers:</strong>
                  </p>
                  <p className="font-light">
                    {editedPerson.memoryTriggers}
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>

      {showDeleteConfirmation && (
        <Dialog open={showDeleteConfirmation} onOpenChange={handleDeleteCancel}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you would like to delete this person?</p>
            <DialogFooter>
              <Button onClick={handleDeleteCancel} variant="outline">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-900"
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}
