import Hero from "./Hero";
import Ritual from "./components/Ritual";
import Forge from "./components/Forge";
import Valhalla from "./components/Valhalla";
import Gallery from "./components/Gallery";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ritual />
      <Gallery />
      <Forge />
      <Valhalla />
    </main>
  );
}