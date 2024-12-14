import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, BookOpen, Search } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Event Organization",
    description:
      "Create custom events and tag people you meet. Church gatherings, work meetings, or social events - keep every connection organized.",
  },
  {
    icon: BookOpen,
    title: "Smart Notes",
    description:
      "Add personal details, conversation highlights, and context. Quick-access cards for each person's story.",
  },
  {
    icon: Search,
    title: "Easy Recall",
    description:
      "Search by event, name, or context. Review connections before your next meetup.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className=" text-blue-300">
            <CardHeader>
              <feature.icon className="w-12 h-12 mb-4 text-blue-300" />
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription className="text-white">
                {feature.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
