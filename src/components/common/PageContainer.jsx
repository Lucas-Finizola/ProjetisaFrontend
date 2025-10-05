import React from 'react';
import { motion } from 'framer-motion'; // Importe motion do framer-motion

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const PageContainer = ({ children, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
      className={`bg-white ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default PageContainer;
