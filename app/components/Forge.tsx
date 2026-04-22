"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: "Corte Clásico", price: "18€", desc: "Tijera y máquina. Precisión atemporal." },
  { name: "Corte + Barba", price: "28€", desc: "El combo completo. Navaja incluida." },
  { name: "Afeitado Ritual", price: "22€", desc: "Toalla caliente, crema artesanal, navaja." },
  { name: "Diseño de Barba", price: "15€", desc: "Perfilado y definición a medida." },
  { name: "Tratamiento", price: "20€", desc: "Hidratación y cuidado premium." },
  { name: "El Guerrero", price: "45€", desc: "Corte + Barba + Tratamiento. La experiencia completa." },
];

export default function Forge() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 85%" }
      }
    );

    itemsRef.current.forEach((item, i) => {
      gsap.fromTo(item,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: i * 0.08, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-6 md:px-20" style={{ background: "#0f0f0f" }}>
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.5em] uppercase mb-4 text-gray-500">Servicios</p>
        <h2 ref={titleRef} className="text-5xl md:text-7xl font-bold mb-20 tracking-tight text-white">
          La Fragua
        </h2>
        <div className="flex flex-col">
          {services.map((s, i) => (
            <div
              key={i}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              className="flex items-center justify-between py-7 border-b border-zinc-900 group cursor-default"
            >
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold tracking-wide text-white group-hover:text-gray-300 transition-colors duration-300">
                  {s.name}
                </span>
                <span className="text-xs text-gray-500">{s.desc}</span>
              </div>
              <span className="text-2xl font-light text-gray-400">{s.price}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}