import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// const eventTypes = {
//   WORK_FUNCTION: "bg-blue-500",
//   CONFERENCE: "bg-ping-500",
//   NETWORKING,
//   SOCIAL,
//   GYM,
//   SCHOOL,
//   OTHER,
// };
//ACTUAL EVENT RESPONSE DATA:
// {
//   "id": 1,
//   "name": "TechCon 2026",
//   "date": "2026-12-20",
//   "location": "San Francisco Convention Center",
//   "type": "CONFERENCE",
//   "description": "Annual technology conference focusing on AI and ML",
//   "eventContext": "Major tech conference where industry leaders present latest innovations. Good for networking with AI professionals.",
// }
const categories = [
  { id: 1, name: "EMCC Church", color: "bg-blue-500" },
  { id: 2, name: "AWS Summit 2024", color: "bg-pink-500" },
  { id: 3, name: "Gym", color: "bg-green-500" },
  { id: 4, name: "David's party", color: "bg-yellow-500" },
  {
    id: 5,
    name: "Familiy gathering",

    color: "bg-blue-500",
  },
  { id: 6, name: "Running Club", color: "bg-pink-500" },
  { id: 7, name: "Mike's party", color: "bg-green-500" },
  { id: 8, name: "Becks Wedding", color: "bg-yellow-500" },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Your Groups</h1>
        {/* <p className="text-muted-foreground">
          Discover top talent across various industries
        </p> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            href={`home/${category.name}`}
            key={category.id}
            className="group"
          >
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className={`h-2 ${category.color}`} />
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {category.name}
                  <Badge
                    variant="secondary"
                    className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    2024/12/12
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Discover elite {category.name.toLowerCase()} professionals
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
