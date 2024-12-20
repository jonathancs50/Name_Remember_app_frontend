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

const events = [
  {
    id: 1,
    name: "EMCC Church",
    date: "",
    type: "SOCIAL",
    description: "Every Sunday at 10:15am",
    eventContext: "",
  },
  {
    id: 2,
    name: "Familiy gathering",
    type: "SOCIAL",
    description: "Catching up with the family",
    eventContext: "",
  },
  {
    id: 3,
    name: "Mike's party",
    date: "2026-12-20",
    type: "SOCIAL",
    description: "Having a braai and Mike's house",
    eventContext: "",
  },
  {
    id: 4,
    name: "Gym",
    date: "",
    type: "HOBBIES",
    description: "Exercising",
    eventContext: "",
  },
  {
    id: 5,
    name: "Familiy gathering",
    date: "2026-12-20",
    type: "SOCIAL",
    description: "My local church",
    eventContext: "",
  },
  {
    id: 6,
    name: "Running Club",
    date: "2026-12-20",
    type: "HOBBIES",
    description: "My local church",
    eventContext: "",
  },
  {
    id: 7,
    name: "Mike's party",
    date: "2026-12-20",
    type: "SOCIAL",
    description: "My local church",
    eventContext: "",
  },
  {
    id: 8,
    name: "Becks Wedding",
    date: "2026-12-20",
    type: "SOCIAL",
    description: "My local church",
    eventContext: "",
  },
  {
    id: 9,
    name: "AWS",
    date: "2026-12-20",
    type: "CONFERENCE",
    description: "My local church",
    eventContext: "",
  },
  {
    id: 10,
    name: "Golf with clients",
    date: "2026-12-20",
    type: "NETWORKING",
    description: "My local church",
    eventContext: "",
  },
  {
    id: 11,
    name: "Mike's party",
    date: "2026-12-20",
    type: "HOBBIES",
    description: "My local church",
    eventContext: "",
  },
];

async function getEventData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real scenario, you would fetch data based on the eventId
  // For now, we'll return all persons
  return events;
}

export default function HomePage() {
  const { data: session } = useSession();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEventData();
        setEventData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!eventData) return <div>No groups found</div>;

  //MODAL FUNCTIONS
  const handleAddEvent = (newEvent) => {
    //UPDATE THE UI
    setEventData((prevData) => [...prevData, newEvent]);
    //UPDATE THE DB
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
              href={`dashboard/${event.name}`}
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
