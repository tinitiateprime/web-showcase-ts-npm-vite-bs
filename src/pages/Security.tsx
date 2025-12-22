import { motion } from "framer-motion";
import { FaLock, FaKey, FaUserShield, FaSignOutAlt, FaShieldAlt } from "react-icons/fa";

const Security = () => {
  return (
    <motion.div
      className="container mt-5"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <h2 className="text-danger mb-4 d-flex align-items-center">
        <FaLock className="me-2" /> Security Settings
      </h2>

      {/* Password Section */}
      <div className="p-4 mb-4 rounded shadow bg-light">
        <h5 className="text-primary">
          <FaKey className="me-2" /> Change Password
        </h5>
        <p className="mb-2">
          Update your account password to keep your account secure.
        </p>
        <button className="btn btn-outline-primary btn-sm">Update Password</button>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="p-4 mb-4 rounded shadow bg-light">
        <h5 className="text-success">
          <FaShieldAlt className="me-2" /> Two-Factor Authentication (2FA)
        </h5>
        <p className="mb-2">
          Enable 2FA for an extra layer of protection on your account.
        </p>
        <button className="btn btn-outline-success btn-sm">Enable 2FA</button>
      </div>

      {/* Active Sessions Section */}
      <div className="p-4 mb-4 rounded shadow bg-light">
        <h5 className="text-warning">
          <FaUserShield className="me-2" /> Active Sessions
        </h5>
        <p className="mb-2">
          Review and log out from devices you don't recognize.
        </p>
        <button className="btn btn-outline-warning btn-sm">
          Manage Sessions
        </button>
      </div>

      {/* Logout All Section */}
      <div className="p-4 rounded shadow bg-light">
        <h5 className="text-danger">
          <FaSignOutAlt className="me-2" /> Logout from All Devices
        </h5>
        <p className="mb-2">
          For maximum security, you can log out from all active devices.
        </p>
        <button className="btn btn-outline-danger btn-sm">
          Logout All
        </button>
      </div>
    </motion.div>
  );
};

export default Security;
