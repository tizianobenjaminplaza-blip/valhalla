"use client";
import CircularGallery from "./CircularGallery";

const items = [
  { image: "https://picsum.photos/seed/11/800/600?grayscale", text: "Corte Clásico" },
  { image: "https://picsum.photos/seed/22/800/600?grayscale", text: "Diseño de Barba" },
  { image: "https://picsum.photos/seed/33/800/600?grayscale", text: "Afeitado Ritual" },
  { image: "https://picsum.photos/seed/44/800/600?grayscale", text: "El Guerrero" },
  { image: "https://picsum.photos/seed/55/800/600?grayscale", text: "Tratamiento" },
  { image: "https://picsum.photos/seed/66/800/600?grayscale", text: "Perfilado" },
];

export default function Gallery() {
  return (
    <section className="py-32 px-6 md:px-20" style={{ background: "#0a0a0a" }}>
      <div className="max-w-5xl mx-auto mb-16">
        <p className="text-xs tracking-[0.5em] uppercase mb-4 text-gray-500">
          Galería
        </p>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
          El Arte
        </h2>
      </div>
      <div style={{ height: "500px", position: "relative" }}>
        <CircularGallery
          items={items}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.02}
        />
      </div>
    </section>
  );
}