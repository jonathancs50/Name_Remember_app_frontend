import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Your Groups</h1>
        <p className="text-muted-foreground">Create an Event or Friend Group</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
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
        ))}
      </div>
    </div>
  );
}
