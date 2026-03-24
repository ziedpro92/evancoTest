"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play, Search, BarChart2, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const stepIcons = [Search, BarChart2, CheckCircle];

const StepRow = ({ step, index }: { step: any; index: number }) => {
  const reverse = index % 2 === 0;
  const Icon = stepIcons[index] || Search;

  const illustrationEl = (
    <motion.div
      className="flex-1 flex items-center justify-center"
      initial={{ opacity: 0, x: reverse ? 60 : -60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
    >
      <img
        src={step.image}
        alt={step.imageAlt}
        style={{ width: "100%", maxWidth: "500px", height: "auto", objectFit: "contain", filter: "drop-shadow(0 28px 48px rgba(0,0,0,0.16))", display: "block" }}
      />
    </motion.div>
  );

  const descriptionEl = (
    <motion.div
      className="flex-1 relative flex flex-col justify-center"
      initial={{ opacity: 0, x: reverse ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      style={{ minHeight: "360px" }}
    >
      <span
        aria-hidden
        className="absolute select-none pointer-events-none font-bold leading-none"
        style={{ fontSize: "clamp(160px, 20vw, 240px)", color: "rgba(var(--primary-color-rgb),0.12)", top: "-0.1em", left: "-0.05em", zIndex: 0, lineHeight: 1, letterSpacing: "-0.04em" }}
      >
        {step.id}
      </span>
      <div className="relative z-10 flex flex-col p-6 md:p-8">
        <div className="flex justify-center mb-6">
          <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "rgba(var(--primary-color-rgb),0.10)", border: "2px solid rgba(var(--primary-color-rgb),0.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon style={{ width: "32px", height: "32px", color: "var(--primary-color)" }} />
          </div>
        </div>
        <h3 className="text-3xl md:text-4xl font-serif text-gray-900 text-center mb-4">{step.title}</h3>
        <p className="text-gray-600 leading-relaxed text-center text-lg">{step.description}</p>
      </div>
    </motion.div>
  );

  return (
    <div className={`flex flex-col md:gap-16 items-center py-8 gap-8 ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      {illustrationEl}
      {descriptionEl}
    </div>
  );
};

export default function EventSteps() {
  const { content } = useLanguage();
  const { howItWorks } = content;

  return (
    <section id="howItWorks" className="py-20 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
        >
          <h3 className="text-base font-semibold text-PRIMARY uppercase tracking-wider mb-2">
            {howItWorks.subtitle}
          </h3>
          <h2 className="text-5xl font-serif text-gray-900 section-title mb-4">
            {howItWorks.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{howItWorks.description}</p>
        </motion.div>

        {/* Video placeholder */}
        <motion.div
          className="relative rounded-2xl overflow-hidden shadow-2xl mb-20 cursor-pointer group"
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ maxHeight: "480px" }}
        >
          <img src={howItWorks.video.image} alt={howItWorks.video.title} className="w-full h-full object-cover" style={{ maxHeight: "480px" }} />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <motion.div
              className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform"
              whileHover={{ scale: 1.1 }}
            >
              <Play className="w-8 h-8 text-PRIMARY ml-1" fill="currentColor" />
            </motion.div>
            <div className="text-center text-white">
              <p className="text-sm uppercase tracking-widest opacity-80 mb-1">{howItWorks.video.subtitle}</p>
              <h3 className="text-2xl font-serif">{howItWorks.video.title}</h3>
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {howItWorks.steps.map((step, index) => (
            <StepRow key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
