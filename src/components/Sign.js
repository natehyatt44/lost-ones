// src/Sign.js
import React from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const signVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

const Sign = ({ content, position }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.25, triggerOnce: true });

  React.useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      className={`sign ${position}`}
      ref={ref}
      initial="hidden"
      animate={controls}
      exit="exit"
      variants={signVariants}
    >
      {content}
      <div className="pole" />
    </motion.div>
  );
};

export default Sign;
