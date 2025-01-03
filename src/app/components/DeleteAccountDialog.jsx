import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useSession, signOut } from "next-auth/react";

export default function DeleteAccountDialog({ isOpen, onClose }) {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setError(null);

    try {
      // 1. Delete from backend
      const backendResponse = await fetch(
        "http://localhost:8080/api/users/delete",
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!backendResponse.ok) {
        throw new Error("Failed to delete user data from backend");
      }

      // 2. Clear any local state or storage if needed
      localStorage.removeItem("userData"); // If you have any local storage
      sessionStorage.clear(); // Clear any session storage

      // 3. Update session to null before signout
      await update(null);

      // 4. Close the dialog before signout
      onClose();

      // 5. Navigate to home page
      await router.push("/");

      // 6. Sign out after a small delay to ensure navigation is complete
      setTimeout(() => {
        signOut({
          redirect: false, // Prevent default redirect since we already navigated
        });
      }, 100);
    } catch (err) {
      console.error("Delete account error:", err);
      setError(err.message);
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete your account? This action cannot be
            undone. All your data will be permanently removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && <div className="text-red-500 text-sm mb-4 px-4">{error}</div>}
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 focus:ring-red-500"
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
