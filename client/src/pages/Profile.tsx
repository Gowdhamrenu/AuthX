import { useEffect, useState } from "react";
import { getProfile } from "../services/auth.service";

interface User {
  _id: string;
  name: string;
  email: string;
}

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const result = await getProfile();

        setUser(result.user);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    loadProfile();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }
    const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
    };

  return (
    <div>
      <h1>Profile</h1>

      <p>
        <strong>Name:</strong> {user.name}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;