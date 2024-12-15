"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import AccountMenu from "./AccountMenu";

export default function Header() {
  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...')
  }

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    console.log('Deleting account...')
  }

  const handleUpdateAccount = () => {
    // Implement account update logic
    console.log('Updating account...')
  }
  return (
    <header className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
      <div>
        <Link href="/home">
          <h1 className="text-3xl font-bold cursor-pointer">
            RememberMe
          </h1>
        </Link>
        {/* <p className="text-blue-200">
          Never forget a face, always remember a story
        </p> */}
      </div>
      <div className="space-x-4 mt-4 sm:mt-0">
        <Button variant="outline">Log In</Button>
        <Button>Sign Up</Button>
      </div>
      <div className="p-4">
      <AccountMenu
        name="John Doe"
        onLogout={handleLogout}
        onDeleteAccount={handleDeleteAccount}
        onUpdateAccount={handleUpdateAccount}
      />
    </div>
    </header>
  );
}
