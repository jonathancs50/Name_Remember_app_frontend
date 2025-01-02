"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import AccountMenu from "./AccountMenu";
import LoginButton from "./LoginButton";
import { useEffect, useState } from "react";
import DeleteAccountDialog from "./DeleteAccountDialog";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { data: session, status } = useSession();
  const [isUserData, setIsUserData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // Check if we're still loading the session
        if (status === "loading") {
          return;
        }

        // Check if we have a valid session with an ID token
        if (!session?.idToken) {
          console.error("No valid session or ID token available");
          setIsUserData("User");
          setLoading(false);
          return;
        }

        const response = await fetch("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${session.idToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          console.error("Unauthorized access - redirecting to login");
          await signOut();
          router.push("/");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        console.log("Backend Response:", data);

        const username = data.givenName;
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

    // Only run fetchUserInfo if we have a session and we're not loading
    if (status !== "loading") {
      fetchUserInfo();
    }
  }, [session, status]);

  const handleDeleteAccount = () => {
    setShowDeleteDialog(true);
  };

  return (
    <header className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
      <div>
        <Link href="/dashboard">
          <h1 className="text-3xl font-bold cursor-pointer">ReMind</h1>
        </Link>
      </div>
      {status === "loading" ? null : session ? (
        <div className="p-4">
          <AccountMenu
            name={isUserData}
            onLogout={signOut}
            onDeleteAccount={handleDeleteAccount}
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
