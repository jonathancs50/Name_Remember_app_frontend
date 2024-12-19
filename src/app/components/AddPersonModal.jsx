"use client";

import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";

export function AddPersonModal({ isOpen, onClose, onAddPerson }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    pronunciation: "",
    company: "",
    role: "",
    personalNotes: "",
    interests: "",
    meetingContext: "",
    memoryTriggers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPerson({
      ...formData,
      id: Date.now(), // temporary ID, replace with proper ID generation in production
      interests: formData.interests
        .split(",")
        .map((interest) => interest.trim()),
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Person</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="col-span-3"
                required
                placeholder="Paul"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Atreides"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pronunciation" className="text-right">
                Pronunciation
              </Label>
              <Input
                id="pronunciation"
                name="pronunciation"
                value={formData.pronunciation}
                onChange={handleChange}
                className="col-span-3"
                placeholder="ah-tray-deez"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="col-span-3"
                placeholder="House Atreides"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Input
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="col-span-3"
                placeholder="CEO"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="personalNotes" className="text-right">
                Notes
              </Label>
              <Textarea
                id="personalNotes"
                name="personalNotes"
                value={formData.personalNotes}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Highly trained in combat and strategy. Multilingual. Likes water."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="interests" className="text-right">
                Interests
              </Label>
              <Input
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Desert ecology, water, philosophy"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="meetingContext" className="text-right">
                Meeting Context
              </Label>
              <Textarea
                id="meetingContext"
                name="meetingContext"
                value={formData.meetingContext}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Met him at the water dispenser."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memoryTriggers" className="text-right">
                Memory Triggers
              </Label>
              <Textarea
                id="memoryTriggers"
                name="memoryTriggers"
                value={formData.memoryTriggers}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Had very blue eyes,was very dusty and looked dehydrated."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Person</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
