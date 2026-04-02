"use client";

import { motion } from "framer-motion";

export default function DeepScanUI({ loadingText }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background ambient grid glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Main Radar Container */}
      <div className="relative flex items-center justify-center w-full max-w-lg aspect-square">
        
        {/* Pulsing Outer Rings */}
        <motion.div 
          animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 border-[1px] border-white/20 rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
          className="absolute inset-0 border-[1px] border-white/10 rounded-full"
        />

        {/* Central Core */}
        <div className="relative w-32 h-32 rounded-full border border-white/30 bg-black shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden z-10">
           {/* Radar Sweeper */}
           <motion.div 
              className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,transparent_70%,rgba(255,255,255,0.5)_100%)] origin-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
           />
           <div className="absolute inset-[2px] bg-black rounded-full" />
           <div className="w-1.5 h-1.5 bg-white rounded-full z-20 shadow-[0_0_10px_white]" />
        </div>

        {/* Binary / Hex data floating code ring */}
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-10 border border-dashed border-white/[0.15] rounded-full"
        />

        {/* Scan Line passing down the screen */}
        <motion.div 
          animate={{ top: ['-10%', '110%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent z-50 pointer-events-none"
        />

      </div>

      {/* Cinematic Text Reveal */}
      <div className="absolute bottom-1/4 flex flex-col items-center">
        <motion.div 
            key={loadingText}
            initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
            className="text-white font-mono tracking-[0.3em] uppercase text-sm md:text-base text-center max-w-md px-4"
        >
            [{loadingText}]
        </motion.div>
        
        {/* Fake processing bar */}
        <div className="w-48 h-[2px] bg-white/10 mt-8 rounded-full overflow-hidden">
           <motion.div 
             animate={{ x: ['-100%', '100%'] }}
             transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
             className="w-1/2 h-full bg-white rounded-full shadow-[0_0_10px_white]"
           />
        </div>
      </div>

    </motion.div>
  );
}
