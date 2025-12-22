import "bootstrap/dist/css/bootstrap.min.css";
import faviconNew from "../assets/favicon_new.png";

const RightSidebar = () => {
  return (
    <div
      className="right-sidebar p-4 border-start position-relative"
      style={{
        background: "linear-gradient(to bottom right, #6a11cb, #2575fc)",
        minHeight: "180vh",
        overflow: "hidden",
      }}
    >
      <img
        src={faviconNew}
        alt="Flowing"
        className="flow-image"
        style={{
          width: "110px",
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          animation: "flowDown 5s linear infinite",
        }}
      />

      {/* Animation style */}
      <style>
        {`
          @keyframes flowDown {
            0% { top: -120px; }   /* start above */
            100% { top: 180vh; }  /* move beyond bottom */
          }
        `}
      </style>
    </div>
  );
};

export default RightSidebar;
