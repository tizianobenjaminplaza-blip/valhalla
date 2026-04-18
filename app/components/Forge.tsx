const services = [
  { name: "Corte Clásico", price: "18€", desc: "Tijera y máquina. Precisión atemporal." },
  { name: "Corte + Barba", price: "28€", desc: "El combo completo. Navaja incluida." },
  { name: "Afeitado Ritual", price: "22€", desc: "Toalla caliente, crema artesanal, navaja." },
  { name: "Diseño de Barba", price: "15€", desc: "Perfilado y definición a medida." },
  { name: "Tratamiento", price: "20€", desc: "Hidratación y cuidado premium." },
  { name: "El Guerrero", price: "45€", desc: "Corte + Barba + Tratamiento. La experiencia completa." },
];

export default function Forge() {
  return (
    <section
      className="min-h-screen py-32 px-6 md:px-20"
      style={{ background: "#0f0f0f" }}
    >
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.5em] uppercase mb-4 text-gray-500">
          Servicios
        </p>
        <h2 className="text-5xl md:text-7xl font-bold mb-20 tracking-tight text-white">
          La Fragua
        </h2>

        <div className="flex flex-col">
          {services.map((s, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-7 border-b border-zinc-900"
            >
              <div className="flex flex-col gap-1">
                <span className="text-lg font-semibold tracking-wide text-white">
                  {s.name}
                </span>
                <span className="text-xs text-gray-500">{s.desc}</span>
              </div>
              <span className="text-2xl font-light tracking-tight text-gray-400">
                {s.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}