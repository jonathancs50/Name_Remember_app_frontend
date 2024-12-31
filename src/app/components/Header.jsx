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
        // Ensure the session is loaded and contains the ID token
        if (!session || !session.idToken) {
          console.error("ID Token is missing in the session");
          return;
        }
  
        console.log("ID Token:", session.idToken);
  
        const response = await fetch("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${session.idToken}`, // Correctly pass the ID token
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
  
        const data = await response.json();
        console.log("Backend Response:", data);
  
        // Adjust to match the backend response
        const username = data.givenName; // Assuming the backend sends `givenName`
        setIsUserData(username);
        setError(null);
      } catch (err) {
        console.error("Error fetching user info:", err);
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
