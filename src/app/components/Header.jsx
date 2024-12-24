"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import AccountMenu from "./AccountMenu";
import LoginButton from "./LoginButton";
import { useEffect, useState } from "react";
import DeleteAccountDialog from "./DeleteAccountDialog";

export default function Header() {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { data: session, status } = useSession();
  const [isUserData, setIsUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        console.log(session.accessToken);
        if (!session?.accessToken) return;

        const response = await fetch("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch persons");
        }

        const data = await response.json();
        // Extract just the username from tokenClaims
        const username = data.tokenClaims.username;
        setIsUserData(username);
        setError(null);
      } catch (err) {
        setError(err.message);
        setIsUserData("User");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [session]);

  const handleLogout = () => {
    // Implement logout logic
    console.log("Logging out...");
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(true);
  };

  const handleUpdateAccount = () => {
    // Implement account update logic
    console.log("Updating account...");
  };

  return (
    <header className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
      <div>
        <Link href="/dashboard">
          <h1 className="text-3xl font-bold cursor-pointer">RememberMe</h1>
        </Link>
      </div>
      {status === "loading" ? null : session ? (
        <div className="p-4">
          <AccountMenu
            name={isUserData}
            onLogout={signOut}
            onDeleteAccount={handleDeleteAccount}
            onUpdateAccount={handleUpdateAccount}
          />
          <DeleteAccountDialog
            isOpen={showDeleteDialog}
            onClose={() => setShowDeleteDialog(false)}
          />
        </div>
      ) : (
        <div className="space-x-4 mt-4 sm:mt-0">
          <LoginButton text="Sign up" />
          <LoginButton text="Log in" />
        </div>
      )}
    </header>
  );
}
