"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProtectedComponent() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch protected data:", error);
      }
    };

    if (session?.accessToken) {
      fetchProtectedData();
    }
  }, [session]);

  if (!session) {
    return <div>Please sign in to view this content</div>;
  }

  return (
    <div>
      <h1>Protected Content</h1>
      {userData && <pre>{JSON.stringify(userData, null, 2)}</pre>}
    </div>
  );
}
