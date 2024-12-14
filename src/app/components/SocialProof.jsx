import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Users } from "lucide-react";

export default function SocialProof() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-16 text-center">
      <Card className="border-white text-white">
        <CardHeader>
          <Users className="w-16 h-16 mx-auto mb-4 text-white" />
          <CardTitle className="text-2xl">
            Join 1000+ users who never forget a name
          </CardTitle>
          <CardDescription className="text-white">
            Perfect for networking professionals, community leaders, and social
            connectors
          </CardDescription>
        </CardHeader>
      </Card>
    </section>
  );
}
