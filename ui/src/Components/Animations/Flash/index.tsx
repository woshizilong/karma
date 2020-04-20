import React, {
  FunctionComponent,
  ReactNodeArray,
  CSSProperties,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";

import { motion, useAnimation } from "framer-motion";

const Flash: FunctionComponent<{
  children: ReactNodeArray;
  spyOn: number | string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}> = ({ children, spyOn, className, style, onClick }) => {
  const controls = useAnimation();

  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      controls.start({
        opacity: [1, 0, 1, 0, 1],
      });
    } else {
      ref.current = true;
    }
  }, [controls, spyOn]);

  return (
    <motion.span
      animate={controls}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </motion.span>
  );
};

export { Flash };
