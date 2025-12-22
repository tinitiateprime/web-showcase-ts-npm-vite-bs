import { useEffect, useState } from "react";

const mockUser = {
  name: "Tinitiate",
  role: "Frontend Developer | React & UI/UX Enthusiast",
  email: "tinitiate@example.com",
  phone: "9876543210",
  avatar: "https://source.unsplash.com/150x150/?profile"
};

const ProfilePage = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("userProfile");
    return saved ? JSON.parse(saved) : mockUser;
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    document.body.style.background = darkMode
      ? "linear-gradient(135deg, #121212, #292929)"
      : "linear-gradient(135deg, #e0eafc, #cfdef3)";
    document.body.style.color = darkMode ? "#f4f4f4" : "#1a1a1a";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(user));
    setEditMode(false);
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

        * {
          font-family: 'Poppins', sans-serif;
          transition: all 0.4s ease-in-out;
        }

        .profile-card {
          position: relative;
          background: ${darkMode ? "#1f1f1f" : "#ffffffcc"};
          backdrop-filter: blur(14px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          padding: 2rem;
          border-radius: 20px;
          max-width: 480px;
          width: 90%;
          text-align: center;
          overflow: hidden;
          z-index: 2;
        }

        .profile-card::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, #0d6efd, #6610f2, #0d6efd);
          animation: rotate 6s linear infinite;
          z-index: -1;
          opacity: 0.2;
        }

        .profile-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 1rem;
          border: 4px solid ${darkMode ? "#fff" : "#0d6efd"};
          box-shadow: 0 8px 15px rgba(0,0,0,0.3);
        }

        .toggle-btn {
          background: ${darkMode ? "#444" : "#007bff"};
          color: #fff;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 12px;
          margin-top: 1.5rem;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .toggle-btn:hover {
          background: ${darkMode ? "#666" : "#0056b3"};
        }

        .profile-card:hover {
          transform: scale(1.02);
          box-shadow: 0 12px 35px rgba(0,0,0,0.4);
        }

        .profile-form input {
          margin: 0.4rem 0;
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 0.5rem;
          width: 100%;
        }

        .save-btn {
          background: #28a745;
          color: #fff;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 10px;
          margin-top: 1rem;
          cursor: pointer;
        }

        .save-btn:hover {
          background: #218838;
        }

        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="profile-card">
        <img src={user.avatar} alt="Profile" className="profile-img" />
        {!editMode ? (
          <>
            <h2>{user.name}</h2>
            <p>{user.role}</p>
            <p style={{ fontSize: "0.9rem" }}>
              📧 {user.email} <br />
              📞 {user.phone}
            </p>
            <button
              className="toggle-btn"
              onClick={() => setEditMode(true)}
            >
              ✏️ Edit Profile
            </button>
          </>
        ) : (
          <div className="profile-form">
            <input
              type="text"
              value={user.name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Name"
            />
            <input
              type="text"
              value={user.role}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, role: e.target.value }))
              }
              placeholder="Role"
            />
            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Email"
            />
            <input
              type="text"
              value={user.phone}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, phone: e.target.value }))
              }
              placeholder="Phone"
            />
            <button className="save-btn" onClick={handleSave}>
              ✅ Save Changes
            </button>
          </div>
        )}
        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
};

export default ProfilePage;
