"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import { Badge } from "@/components/ui/badge";
import { PersonDetailsModal } from "@/app/components/PersonDetailsModal";
import { DeleteConfirmationModal } from "@/app/components/DeleteModal";

import { AddPersonModal } from "@/app/components/AddPersonModal";
import { motion } from "framer-motion";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { UpdateEventModal } from "@/app/components/UpdateEventModal";

// Simulated person data (replace with actual API call later)
const events = [
  {
    id: 1,
    name: "EMCC Church",
    date: "",
    type: "SOCIAL",
    description: "Every Sunday at 10:15am",
    eventContext: "",
  },
];
const personProfiles = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson",
    pronunciation: "Se-rah",
    company: "Tech Corp",
    role: "Intermediate Software Engineer",
    physicalDescription:
      "Average height, brown hair, usually wears glasses, has a distinctive laugh",
    personalNotes:
      "Very knowledgeable about AI and machine learning. Has one rotweiler",
    interests: ["Artificial Intelligence", "Family", "Dancing"],
    meetingContext: "Met at TechCon 2024 during the AI panel discussion",
  },
];

async function getPersonData(eventName, eventId) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real scenario, you would fetch data based on the eventId
  // For now, we'll return all persons
  return personProfiles;
}

async function getEventData(eventId) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real scenario, you would fetch data based on the eventId
  // For now, we'll return all persons
  return events[0];
}

export default function EventPage() {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const [isEventUpdateModalOpen, setIsEventUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const params = useParams();
  const searchParams = useSearchParams();
  const eventName = params.slug;
  const eventId = searchParams.get("id");

  const [personData, setPersonData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const personData = await getPersonData(eventName, eventId);
        setPersonData(personData);
        const eventData = await getEventData(eventId);
        setEventData(eventData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [eventName, eventId]);

  const handleAddPerson = (newPerson) => {
    setPersonData((prevData) => [...prevData, newPerson]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!personData) return <div>No person data found</div>;

  const handleUpdate = (updatedPerson) => {
    // Send updatedPerson to your backend
    // Update the person state if the backend update was successful
    // setperson(updatedPerson);
    console.log(updatedPerson);
  };

  const handleDelete = (personId) => {
    // Send delete request to your backend
    // Remove the person from your local state or refresh the person list
    setPersonData((prevData) =>
      prevData.filter((person) => person.id !== personId)
    );
    console.log(`Deleting person with ID: ${personId}`);
    // Close the modal or update your UI as needed
  };

  const handleUpdateEvent = (updatedEvent) => {
    setEventData(updatedEvent);
    console.log(updatedEvent);
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      // Make API call to delete the event
      // const response = await fetch(`/api/people/${eventId}`, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to delete event");
      // }

      // Update local state to remove the deleted event
      // setEventData((currentEvent) =>
      //   currentEvent.filter((event) => event.id !== eventId)
      // );

      console.log(eventId);
      // Show success message
      toast({
        title: "Success",
        description: "Event has been deleted successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Delete operation failed:", error);

      // Show error message
      toast({
        title: "Error",
        description: "Failed to delete event. Please try again.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold capitalize">{eventData.name}</h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full ">
        <Button
          variant="outline"
          className="w-full sm:w-auto bg-pink-500 hover:bg-pink-800"
        >
          <Link
            href="/dashboard"
            className="w-full flex items-center justify-center text-black"
          >
            <ChevronLeft />
            Back to Groups
          </Link>
        </Button>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
          <Button
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-900"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className=" h-4 w-4" />
            Add Person
          </Button>

          <Button
            className="w-full sm:w-auto bg-green-500 hover:bg-green-700"
            onClick={() => setIsEventUpdateModalOpen(true)}
          >
            Update Group
          </Button>

          <Button
            className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-700"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete Group
          </Button>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {personData.map((person, index) => (
          <motion.div
            key={person.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              onClick={() => {
                setSelectedPerson(person);
                setIsPersonModalOpen(true);
              }}
            >
              <CardHeader className="pb-0">
                <CardTitle>
                  {person.firstName} {person.lastName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mt-2">
                  <div>
                    {/* <p className="font-medium">{person.role}</p> */}
                    <p className="text-sm text-muted-foreground">
                      {person.role}
                    </p>
                    <div className="mt-2">
                      {person.interests.map((interest, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="mr-1 mb-1"
                        >
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
      {selectedPerson && (
        <PersonDetailsModal
          person={selectedPerson}
          isOpen={isPersonModalOpen}
          onClose={() => {
            setSelectedPerson(null);
            setIsPersonModalOpen(false);
          }}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
      <AddPersonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPerson={handleAddPerson}
      />
      <UpdateEventModal
        isOpen={isEventUpdateModalOpen}
        onClose={() => setIsEventUpdateModalOpen(false)}
        onUpdateEvent={handleUpdateEvent}
        eventData={eventData}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={(id) => handleDeleteEvent(id)}
        itemId={eventId}
        title="Delete Event"
        message="Are you sure you would like to delete this event and people belonging to the event? This action cannot be undone."
      />
    </div>
  );
}
