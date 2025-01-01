"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { AddEventModal } from "../components/AddEventModal";
import { motion } from "framer-motion";

import { useSession } from "next-auth/react";

const getCategoryColor = (category) => {
  const colorMap = {
    WORK_FUNCTION: "bg-orange-500",
    CONFERENCE: "bg-blue-500",
    NETWORKING: "bg-purple-500",
    SOCIAL: "bg-green-500",
    HOBBIES: "bg-red-500",
    SCHOOL: "bg-yellow-500",
    OTHER: "bg-gray-500",
  };
  return colorMap[category] || colorMap.OTHER;
};

export default function HomePage() {
  const { data: session } = useSession();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        if (!session?.accessToken) return;

        const response = await fetch("http://localhost:8080/api/events", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch persons");
        }

        const data = await response.json();
        setEventData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [session]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!eventData) return <div>No groups found</div>;

  //MODAL FUNCTIONS
  const handleAddEvent = async (newEvent) => {
    if (
      newEvent.type === null ||
      newEvent.type === undefined ||
      newEvent.type === ""
    ) {
      newEvent.type = "OTHER";
    }

    const eventPayload = {
      name: newEvent.name,
      type: newEvent.type,
      description: newEvent.description,
    };

    // Only add optional fields if they have values and aren't empty strings
    if (newEvent.date && newEvent.date.trim() !== "") {
      eventPayload.date = newEvent.date;
    }

    if (newEvent.location && newEvent.location.trim() !== "") {
      eventPayload.location = newEvent.location;
    }

    console.log(eventPayload);
    console.log(session.accessToken);
    try {
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Failed to create event: ${response.status}`
        );
      }

      const createdEvent = await response.json();
      setEventData((prevData) => [...prevData, createdEvent]);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Your Groups</h1>
        <p className="text-muted-foreground">
          Create an group for events/friends
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:justify-end">
          <Button
            className="w-full sm:w-auto"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Plus className=" h-4 w-4" />
            Add Group
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {eventData.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={`dashboard/${event.name}/${event.id}`}
              key={event.id}
              className="group"
            >
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className={`h-2 ${getCategoryColor(event.type)}`} />
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {event.name}

                    <Badge
                      variant="secondary"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      {event.date}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{event.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      <AddEventModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
