//Higher order component to add same functionality to each page

import React from "react";
import { Component } from "react";
import { motion } from "framer-motion";

const MotionHoc = (Component) => {
  return function Hoc() {
    return (
      <motion.div
        initial={{ y: 500 }}
        animate={{
          y: 0,
          transition: { duration: 0.5, type: "spring" },
        }}
        exit={{
          y: -500,
          transition: { duration: 0.3, type: "spring", ease: "easeInOut" },
        }}
      >
        <Component />
      </motion.div>
    );
  };
};

export default MotionHoc;
