import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className=" text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold mb-4">MeetMinder</h3>
            <p className="text-blue-200">
              Never forget a face, always remember a story
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/home" className="text-blue-200 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-blue-200 hover:text-white">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-700 text-center text-blue-300">
          <p>&copy; 2023 MeetMinder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
