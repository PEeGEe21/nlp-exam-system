"use client";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "../../utils/motion";
import TextAnimation from "./TextAnimation";



export default function A4Animation({baseText, texts=[]}) {
  return (
    <div className="flex w-full items-center justify-center h-full text-center min-h-28 ">
      <motion.div
        variants={containerVariants}
        animate="visible"
        initial="hidden"
      >
        <motion.span
          variants={itemVariants}
          className="font-michroma text-2xl font-normal text-center"
        >
          <TextAnimation delay={0} baseText={baseText} texts={texts}/>
        </motion.span>
      </motion.div>
    </div>
  );
}
