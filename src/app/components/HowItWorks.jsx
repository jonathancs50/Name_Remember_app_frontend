import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const steps = [
  {
    id: 1,
    title: "Create an event",
    description: "Set up your gathering in seconds",
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Add people as you meet them",
    description: "Quick and easy input",
    color: "bg-pink-500",
  },
  {
    id: 3,
    title: "Include personal notes and context",
    description: "Capture the essence of each interaction",
    color: "bg-green-500",
  },
  {
    id: 4,
    title: "Review before future meetings",
    description: "Refresh your memory effortlessly",
    color: "bg-yellow-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-16 rounded-lg my-8 md:my-16">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className={`h-2 ${step.color}`} />
            <CardHeader>
              <CardTitle className="flex justify-between items-center  font-bold text-2xl">
                {step.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
