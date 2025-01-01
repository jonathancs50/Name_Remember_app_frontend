import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    id: 1,
    title: "Free Plan",
    subtitle: "ReMind",
    color: "bg-blue-500",
    features: [
      "Store unlimited contact profiles",
      "Add detailed personal information",
      "Record where and how you met",
      "Track shared interests and hobbies",
      "Note conversation topics and highlights",
      "Add memorable details about each person",
      "Keep track of important dates",
      "Available on all devices",
      "No credit card required",
    ],
  },
  {
    id: 2,
    title: "Premium Plan",
    subtitle: "ReMind+",
    color: "bg-pink-500",
    comingSoon: true,
    features: [
      "All features from the free plan",
      "Advanced AI-powered search capabilities",
      "Find connections by conversation topics",
      "Intelligent relationship suggestions",
      "Vector search for natural language queries",
      "Find people by partial memories or contexts",
      "Smart grouping of similar contacts",
      "Pattern recognition across your network",
      "Early access to new features",
      "Priority support",
    ],
  },
];

export default function PricingCards() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-16 rounded-lg my-8 md:my-16">
      <h2 className="text-3xl font-bold text-center mb-12">Pricing Plans</h2>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className={`h-2 ${plan.color}`} />
            <CardHeader>
              <CardTitle className="flex justify-between items-center font-bold text-2xl">
                {plan.title}
                {plan.comingSoon && (
                  <Badge variant="secondary" className="ml-2">
                    Coming Soon
                  </Badge>
                )}
              </CardTitle>
              <p className="text-lg font-semibold text-muted-foreground">
                {plan.subtitle}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
