import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";

const OnlineEditor = () => {
  return (
    <motion.div
      className="container mt-5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-info mb-4">
        <FaEdit className="me-2" /> Online Editor
      </h2>

      <div className="bg-light p-4 rounded shadow">
        <textarea
          className="form-control"
          rows={8}   // ✅ must be number
          placeholder="Start typing here..."
        />
      </div>
    </motion.div>
  );
};

export default OnlineEditor;
