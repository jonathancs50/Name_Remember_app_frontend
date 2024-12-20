import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Target } from "lucide-react";

export default function LearnMore() {
  return (
    <section
      id="learn-more"
      className="container mx-auto px-4 py-8 md:py-16 rounded-lg my-8 md:my-16"
    >
      <h2 className="text-3xl font-bold text-center mb-12">Learn More</h2>
      <div className="grid gap-8">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="h-2 bg-purple-500" />
          <CardHeader>
            <CardTitle className="font-bold text-2xl">Why Remember?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Meeting new people is easy, but truly remembering them is hard.
              Remember helps you maintain meaningful connections by capturing
              the small details that matter. Whether you're a networker,
              business professional, or someone who loves making friends, our
              app helps you keep track of the important details that make each
              relationship special.
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="h-2 bg-green-500" />
          <CardHeader>
            <CardTitle className="flex items-center font-bold text-2xl">
              <Target className="mr-2" />
              Perfect For
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                "Professionals building their network",
                "People attending conferences and events",
                "Those who want to maintain meaningful friendships",
                "Anyone who struggles with remembering names and faces",
                "Community leaders keeping track of members",
                "Business owners connecting with clients",
                "Students meeting new classmates",
              ].map((item, index) => (
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
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="h-2 bg-blue-500" />
          <CardHeader>
            <CardTitle className="flex items-center font-bold text-2xl">
              <Shield className="mr-2" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your relationships are personal, and we take that seriously. All
              your data is stored securely. You have complete control over your
              contact information, with the ability to delete data at any time.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
