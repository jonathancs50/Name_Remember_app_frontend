import { Button } from "@/components/ui/button";
import Image from "next/image";
import FancyButton from "./FancyButton";

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-8 md:py-16 text-center">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="text-left md:text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Transform brief encounters into lasting connections
          </h2>
          <p className="text-lg md:text-xl text-blue-200 mb-6">
            MeetMinder helps you remember everyone you meet at social events,
            work functions, and gatherings.
          </p>
          <p className="text-base md:text-lg text-blue-300 mb-8">
            Stop awkward moments of forgetting names. Start building meaningful
            relationships.
          </p>
          {/* <Button size="lg" className="w-full sm:w-auto">
            Get Started
          </Button> */}
          <FancyButton />
        </div>
        <div className="mt-8 md:mt-0">
          <Image
            src="/meetminder-removebg-preview.png"
            alt="People connecting"
            width={500}
            height={300}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
