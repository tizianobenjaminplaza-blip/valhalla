"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Valhalla() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
      }
    );
    gsap.fromTo(contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center py-32 px-6 text-center relative overflow-hidden bg-black">
      <span className="absolute font-bold opacity-[0.03] select-none pointer-events-none text-white" style={{ fontSize: "20vw" }}>
        VALHALLA
      </span>
      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="text-xs tracking-[0.5em] uppercase mb-6 text-gray-500">Próximamente</p>
        <h2 ref={titleRef} className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-white">
          Tu lugar en el Valhalla
        </h2>
        <div ref={contentRef}>
          <p className="text-base leading-relaxed mb-12 text-gray-500">
            Castrocalvón, León. Próxima apertura.
          </p>
          <div className="h-px w-32 mx-auto mb-12 bg-gray-700" />
          <a href="mailto:hola@valhallabarberia.es" className="inline-block px-10 py-4 text-sm uppercase border border-gray-400 text-white hover:bg-white hover:text-black transition-all duration-300">
            Únete a la lista
          </a>
          <p className="mt-16 text-xs uppercase opacity-30 text-gray-400">
            2026 Valhalla Barbería
          </p>
        </div>
      </div>
    </section>
  );
}