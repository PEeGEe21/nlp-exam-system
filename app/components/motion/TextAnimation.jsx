
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import RedoAnimText from "./RedoAnim";
import CursorBlinker from "./CursorBlinker";

export default function TextAnimation({delay, baseText = 'Sign In...', texts = []}) {
  const [done, setDone] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.slice(0, latest)
  );

  useEffect(() => {
    const controls = animate(count, baseText.length, {
      type: "tween",
      delay: delay,
      duration: 1,
      ease: "easeInOut",
      onComplete: () => {
        setDone(true);
      }
    });
    return controls.stop;
  }, [baseText, count, delay]);

  return (
    <span className="">
      {/* <motion.span>{displayText}</motion.span> */}
      <motion.span>{displayText}</motion.span>
      {done && (
        <>
          <br />
        </>
      )}
      <RedoAnimText delay={delay + 1} texts={texts}/>
      <CursorBlinker />
    </span>
  );
}
