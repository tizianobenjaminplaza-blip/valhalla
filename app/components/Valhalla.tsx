export default function Valhalla() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-32 px-6 text-center relative overflow-hidden bg-black">
      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="text-xs tracking-widest uppercase mb-6 text-gray-500">
          Próximamente
        </p>
        <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-white">
          Tu lugar en el Valhalla
        </h2>
        <p className="text-base leading-relaxed mb-12 text-gray-500">
          Castrocalvón, León. Próxima apertura.
        </p>
        <div className="h-px w-32 mx-auto mb-12 bg-gray-700" />
        <a href="mailto:hola@valhallabarberia.es" className="inline-block px-10 py-4 text-sm uppercase border border-gray-400 text-white">
          Únete a la lista
        </a>
        <p className="mt-16 text-xs uppercase opacity-30 text-gray-400">
          2026 Valhalla Barbería
        </p>
      </div>
    </section>
  );
}