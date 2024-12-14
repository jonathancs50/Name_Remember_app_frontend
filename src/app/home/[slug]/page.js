"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserDetailsModal } from "@/app/components/UserDetailsModal";
import { AddPersonModal } from "@/app/components/AddPersonModal";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

// Simulated user data (replace with actual API call later)
const userProfiles = [
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
    conversationTopics: [
      "Pet training techniques",
      "Latest AI developments",
      "Family",
    ],
    meetingContext: "Met at TechCon 2024 during the AI panel discussion",
  },
  {
    id: 2,
    firstName: "Joe",
    lastName: "Smith",
    pronunciation: "Jo",
    company: "Hub Spot",
    role: "Senior Software Engineer",
    physicalDescription: "Tall, blonde hair, athletic build",
    personalNotes:
      "Passionate about open-source projects. Plays guitar in a local band",
    interests: ["Open-source software", "Music", "Hiking"],
    conversationTopics: [
      "Recent open-source contributions",
      "Local music scene",
      "Favorite hiking trails",
    ],
    meetingContext: "Connected at a local tech meetup",
  },
  {
    id: 3,
    firstName: "Joe",
    lastName: "Smith",
    pronunciation: "Jo",
    company: "Hub Spot",
    role: "Senior Software Engineer",
    physicalDescription: "Tall, blonde hair, athletic build",
    personalNotes:
      "Passionate about open-source projects. Plays guitar in a local band",
    interests: ["Open-source software", "Music", "Hiking"],
    conversationTopics: [
      "Recent open-source contributions",
      "Local music scene",
      "Favorite hiking trails",
    ],
    meetingContext: "Connected at a local tech meetup",
  },
];

async function getUserData(eventName, eventId) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real scenario, you would fetch data based on the eventId
  // For now, we'll return all users
  return userProfiles;
}

export default function EventPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const params = useParams();
  const searchParams = useSearchParams();
  const eventName = params.slug;
  const eventId = searchParams.get("id");

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserData(eventName, eventId);
        setUserData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [eventName, eventId]);

  const handleAddPerson = (newPerson) => {
    setUserData((prevData) => [...prevData, newPerson]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold capitalize">
          {decodeURIComponent(eventName)}
        </h1>
      </div>
      <div className="flex justify-end">
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Person
        </Button>
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {userData.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <CardHeader className="pb-0">
                <CardTitle>
                  {user.firstName} {user.lastName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mt-2">
                  <div>
                    {/* <p className="font-medium">{user.role}</p> */}
                    <p className="text-sm text-muted-foreground">{user.role}</p>
                    <div className="mt-2">
                      {user.interests.map((interest, index) => (
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
      {selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
      <AddPersonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPerson={handleAddPerson}
      />
    </div>
  );
}
