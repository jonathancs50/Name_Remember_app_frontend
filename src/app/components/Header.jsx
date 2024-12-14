import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">RememberMe</h1>
        {/* <p className="text-blue-200">
          Never forget a face, always remember a story
        </p> */}
      </div>
      <div className="space-x-4 mt-4 sm:mt-0">
        <Button variant="outline">Log In</Button>
        <Button>Sign Up</Button>
      </div>
    </header>
  );
}
