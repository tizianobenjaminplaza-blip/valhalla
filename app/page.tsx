import Hero from "./Hero";
import Ritual from "./components/Ritual";
import Forge from "./components/Forge";
import Valhalla from "./components/Valhalla";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ritual />
      <Forge />
      <Valhalla />
    </main>
  );
}