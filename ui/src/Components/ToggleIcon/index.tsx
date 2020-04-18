import React, { FunctionComponent } from "react";

import { motion } from "framer-motion";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

const variants = {
  open: { rotate: 0 },
  closed: { rotate: 180 },
};

const ToggleIcon: FunctionComponent<{ className: string; isOpen: boolean }> = ({
  className,
  isOpen,
}) => {
  return (
    <motion.div
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={{ duration: 0.3 }}
      initial={false}
    >
      <FontAwesomeIcon icon={faChevronDown} className={className} />
    </motion.div>
  );
};

export { ToggleIcon };
