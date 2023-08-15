import { motion } from "framer-motion";

const LayoutForTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 0.2,
    }}
    style={{
      width: "100%",
      height: "100%",
    }}
  >
    {children}
  </motion.div>
);

export default LayoutForTransition;
