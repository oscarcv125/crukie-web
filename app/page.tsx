import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuGrid from "@/components/MenuGrid";
import HowToOrder from "@/components/HowToOrder";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import OrderPanel from "@/components/OrderPanel";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MenuGrid />
      <HowToOrder />
      <Footer />
      <ChatBot />
      <WhatsAppFAB />
      <OrderPanel />
    </main>
  );
}
