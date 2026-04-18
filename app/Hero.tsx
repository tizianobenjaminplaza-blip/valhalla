"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(#c0c0c0 1px, transparent 1px),
                            linear-gradient(90deg, #c0c0c0 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 text-center px-6">
        <p className="text-xs tracking-[0.5em] uppercase mb-8 text-gray-500">
          Castrocalvón · León · España
        </p>

        <h1
          ref={titleRef}
          className="text-[clamp(5rem,18vw,16rem)] font-bold leading-none tracking-tighter text-white"
        >
          VALHALLA
        </h1>

        <div className="h-px w-48 mx-auto my-8 bg-gray-400" />

        <p className="text-sm tracking-[0.4em] uppercase text-gray-400">
          Barbería · Experiencia · Ritual
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs tracking-widest uppercase text-gray-400">Scroll</span>
        <div className="w-px h-16 animate-pulse bg-gray-400" />
      </div>
    </section>
  );
}