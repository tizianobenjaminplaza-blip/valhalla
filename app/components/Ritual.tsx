"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { number: "01", title: "La Bienvenida", desc: "Desde el primer momento, el ambiente te transporta. Whisky o café, tú eliges cómo empezar." },
  { number: "02", title: "El Diagnóstico", desc: "Analizamos tu rostro, tu estilo, tu historia. El corte perfecto empieza por escuchar." },
  { number: "03", title: "El Ritual", desc: "Tijeras, navaja y precisión milimétrica. Cada movimiento tiene un propósito." },
  { number: "04", title: "El Acabado", desc: "Productos premium, masaje final, espejo. Porque los detalles son la diferencia." },
];

export default function Ritual() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
      }
    );

    cardsRef.current.forEach((card, i) => {
      gsap.fromTo(card,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-6 md:px-20" style={{ background: "#0a0a0a" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.5em] uppercase mb-4 text-gray-500">El proceso</p>
        <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-20 tracking-tight text-white">
          El Ritual
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="p-10 flex flex-col gap-4"
              style={{ background: "#0a0a0a" }}
            >
              <span className="text-6xl font-bold opacity-10 text-gray-400">{step.number}</span>
              <h3 className="text-xl font-semibold tracking-wide text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}