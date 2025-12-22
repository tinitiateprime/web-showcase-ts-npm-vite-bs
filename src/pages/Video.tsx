import { motion } from "framer-motion";
import { FaVideo } from "react-icons/fa";
import { Card } from "react-bootstrap";

const Video = () => {
  return (
    <motion.div
      className="container my-5"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        whileHover={{ scale: 1.03, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <Card
          className="border-0"
          style={{
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          {/* Card Header */}
          <div className="card-header bg-transparent border-0 pb-0 d-flex align-items-center">
            <FaVideo className="text-danger fs-3 me-2" />
            <h3 className="mb-0 text-danger">Featured Video</h3>
          </div>

          {/* Card Body */}
          <Card.Body>
            <div className="ratio ratio-16x9 rounded overflow-hidden">
              <iframe
                className="embed-responsive-item"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video"
                allowFullScreen
                style={{ border: 0 }}
              ></iframe>
            </div>
          </Card.Body>

          {/* Card Footer */}
          <Card.Footer className="bg-transparent border-0 text-muted">
            🎬 Learn more from our official YouTube channel.
          </Card.Footer>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Video;
