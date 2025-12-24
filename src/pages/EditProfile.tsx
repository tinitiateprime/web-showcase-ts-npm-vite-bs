import { useEffect, useState } from "react";

type UserProfile = {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
};

const DEFAULT_USER: UserProfile = {
  name: "Tinitiate",
  role: "Frontend Developer",
  email: "tinitiate@example.com",
  phone: "9876543210",
  avatar: "https://source.unsplash.com/150x150/?portrait",
};

const safeParse = <T,>(value: string | null, fallback: T): T => {
  try {
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const EditProfilePage = () => {
  const [user, setUser] = useState<UserProfile>(() =>
    safeParse<UserProfile>(localStorage.getItem("userProfile"), DEFAULT_USER)
  );

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    alert("✅ Profile updated successfully!");
  };

  useEffect(() => {
    document.body.style.background = "#f4f7fc";
    document.body.style.color = "#333";
  }, []);

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
        * { font-family: 'Inter', sans-serif; transition: all 0.3s ease; }
        .profile-section {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          padding: 2rem;
          width: 100%;
          max-width: 1000px;
          display: flex;
          flex-direction: column;
          animation: fadeIn 0.8s ease forwards;
        }
        @media(min-width: 768px){
          .profile-section {
            flex-direction: row;
            align-items: flex-start;
          }
        }
        .profile-preview { flex: 1; text-align: center; margin-bottom: 2rem; }
        .profile-preview img {
          width: 150px; height: 150px; border-radius: 50%;
          border: 4px solid #007bff; margin-bottom: 1rem; object-fit: cover;
        }
        .profile-form { flex: 2; margin-left: 2rem; }
        @media(max-width: 767px){ .profile-form { margin-left: 0; } }
        .profile-form input {
          width: 100%; padding: 0.75rem; margin-bottom: 1rem;
          border-radius: 12px; border: 1px solid #ddd;
        }
        .save-btn {
          background: #007bff; color: #fff; padding: 0.75rem 1.5rem;
          border: none; border-radius: 12px; cursor: pointer; font-weight: 600;
        }
        .save-btn:hover { background: #0056b3; }
        @keyframes fadeIn {
          from {opacity: 0; transform: translateY(20px);}
          to {opacity: 1; transform: translateY(0);}
        }
      `}</style>

      <div className="profile-section">
        <div className="profile-preview">
          <img src={user.avatar} alt="profile" />
          <h3>{user.name}</h3>
          <p>{user.role}</p>
        </div>

        <div className="profile-form">
          <h2 style={{ marginBottom: "1rem" }}>Edit Profile</h2>

          <input
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Avatar URL"
            value={user.avatar}
            onChange={(e) => setUser({ ...user, avatar: e.target.value })}
          />

          <button className="save-btn" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
};

export default EditProfilePage;
