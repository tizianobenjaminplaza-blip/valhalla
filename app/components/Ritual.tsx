export default function Ritual() {
  return (
    <section
      className="min-h-screen py-32 px-6 md:px-20"
      style={{ background: "#0a0a0a" }}
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.5em] uppercase mb-4 text-gray-500">
          El proceso
        </p>
        <h2 className="text-5xl md:text-7xl font-bold mb-20 tracking-tight text-white">
          El Ritual
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
          {[
            { number: "01", title: "La Bienvenida", desc: "Desde el primer momento, el ambiente te transporta. Whisky o café, tú eliges cómo empezar." },
            { number: "02", title: "El Diagnóstico", desc: "Analizamos tu rostro, tu estilo, tu historia. El corte perfecto empieza por escuchar." },
            { number: "03", title: "El Ritual", desc: "Tijeras, navaja y precisión milimétrica. Cada movimiento tiene un propósito." },
            { number: "04", title: "El Acabado", desc: "Productos premium, masaje final, espejo. Porque los detalles son la diferencia." },
          ].map((step, i) => (
            <div key={i} className="p-10 flex flex-col gap-4" style={{ background: "#0a0a0a" }}>
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