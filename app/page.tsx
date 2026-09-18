import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Capabilities from '@/components/Capabilities';
import Products from '@/components/Products';
import SupplyChain from '@/components/SupplyChain';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Capabilities />
        <Products />
        <SupplyChain />
        <Contact />
      </main>
    </>
  );
}
