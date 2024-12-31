"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { PersonDetailsModal } from "@/app/components/PersonDetailsModal";
import { DeleteConfirmationModal } from "@/app/components/DeleteModal";

import { AddPersonModal } from "@/app/components/AddPersonModal";
import { motion } from "framer-motion";
import { ChevronLeft, Plus } from "lucide-react";
import Link from "next/link";
import { UpdateEventModal } from "@/app/components/UpdateEventModal";

import { useSession } from "next-auth/react";

export default function EventPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const [isEventUpdateModalOpen, setIsEventUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const searchParams = useSearchParams();
  const params = useParams();
  const eventName = params.slug;
  const eventId = params.id; // Get id directly from params

  const [indexCardList, setIndexCardList] = useState(null);
  const [personData, setPersonData] = useState(null);
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!session?.accessToken) return;

        // First attempt to get index cards with event and person data
        const response = await fetch(
          `http://localhost:8080/api/index-cards/event/${eventId}`,
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch persons");
        }

        const data = await response.json();

        if (data.length === 0) {
          // If no index cards exist, fetch event data directly
          const eventResponse = await fetch(
            `http://localhost:8080/api/events/${eventId}`,
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (!eventResponse.ok) {
            throw new Error("Failed to fetch event");
          }

          const eventData = await eventResponse.json();
          setEventData(eventData);
          setPersonData([]);
        } else {
          // Process index cards data as before
          const uniquePersons = data.reduce((acc, item) => {
            const personId = item.person.id;
            if (!acc[personId]) {
              acc[personId] = {
                ...item.person,
                memoryTriggers: item.memoryTriggers,
              };
            }
            return acc;
          }, {});

          const personsArray = Object.values(uniquePersons);
          setPersonData(personsArray);
          setEventData(data[0].event);
        }

        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [session, eventId]);

  const handleAddPerson = async (newPerson) => {
    try {
      // First create the person
      const personResponse = await fetch("http://localhost:8080/api/persons", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });

      if (!personResponse.ok) {
        throw new Error("Failed to create person");
      }

      const createdPerson = await personResponse.json();

      // Then create the index card with the new person ID and current event ID
      const indexCardData = {
        personId: createdPerson.id,
        eventId: eventId, // This is already available from your params
        interactionNotes: newPerson.interactionNotes || "", // Assuming these fields are part of your form
        followUpItems: newPerson.followUpItems || "",
        memoryTriggers: newPerson.memoryTriggers || "",
      };

      const indexCardResponse = await fetch(
        "http://localhost:8080/api/index-cards",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(indexCardData),
        }
      );

      if (!indexCardResponse.ok) {
        // If index card creation fails, we might want to delete the person we just created
        // to maintain data consistency
        await fetch(`http://localhost:8080/api/persons/${createdPerson.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        });
        throw new Error("Failed to create index card");
      }

      const createdIndexCard = await indexCardResponse.json();

      // Update the UI with the new person data including memory triggers
      const newPersonWithTriggers = {
        ...createdPerson,
        memoryTriggers: createdIndexCard.memoryTriggers,
      };

      setPersonData((prevData) => [...prevData, newPersonWithTriggers]);

    } catch (error) {
      console.error("Create person and index card failed:", error);
     
    }
  };

  const handleUpdate = async (updatedPerson) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/persons/${updatedPerson.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPerson),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update person");
      }

      const updatedPersonData = await response.json();
      setPersonData((prevData) =>
        prevData.map((person) =>
          person.id === updatedPersonData.id ? updatedPersonData : person
        )
      );

    
    } catch (error) {
      console.error("Update person failed:", error);
   
    }
  };

  const handleDelete = async (personId) => {
    try {
      // First, delete the index card associated with this person and event
      const indexCardResponse = await fetch(
        `http://localhost:8080/api/index-cards/event/${eventId}/person/${personId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!indexCardResponse.ok) {
        throw new Error("Failed to delete index card");
      }

      // Then delete the person
      const personResponse = await fetch(
        `http://localhost:8080/api/persons/${personId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!personResponse.ok) {
        throw new Error("Failed to delete person");
      }

      // Update UI state after successful deletion
      setPersonData((prevData) =>
        prevData.filter((person) => person.id !== personId)
      );

   
    } catch (error) {
      console.error("Delete operation failed:", error);
  
    }
  };

  // Update the handleUpdateEvent function
  const handleUpdateEvent = async (updatedEvent) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/events/${eventId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      const updatedEventData = await response.json();
      setEventData(updatedEventData);

    
    } catch (error) {
      console.error("Update event failed:", error);
    
    }
  };

  // Update the handleDeleteEvent function
  const handleDeleteEvent = async (eventId) => {
    try {
      // First, delete all index cards associated with this event
      const indexCardsResponse = await fetch(
        `http://localhost:8080/api/index-cards/event/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!indexCardsResponse.ok) {
        throw new Error("Failed to delete associated index cards");
      }

      // Then delete the event itself
      const eventResponse = await fetch(
        `http://localhost:8080/api/events/${eventId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!eventResponse.ok) {
        throw new Error("Failed to delete event");
      }

      // Redirect to dashboard after successful deletion
      router.push("/dashboard");

    
    } catch (error) {
      console.error("Delete operation failed:", error);
   
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!eventData) return <div>No event data found</div>;
  if (!personData || personData.length === 0) {
    return (
      <div className="container mx-auto p-4 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold capitalize">{eventData.name}</h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
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
              <Plus className="h-4 w-4" />
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

        <div className="text-center mt-8">
          <p className="text-lg text-gray-600">
            No people have been added to this group yet.
          </p>
          <p className="text-md text-gray-500">
            Click the "Add Person" button to get started!
          </p>
        </div>

        <AddPersonModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddPerson={handleAddPerson}
        />
      </div>
    );
  }
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
