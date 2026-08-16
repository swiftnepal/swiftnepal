import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import Services from '@/components/Services';
import Calculator from '@/components/Calculator';
import CtaStrip from '@/components/CtaStrip';
import Faq from '@/components/Faq';
import PickupSection from '@/components/PickupSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Header />

      <main id="main-content">
        <Hero />
        <TrustBar />
        <Services />
        <Calculator />
        <CtaStrip />
        <Faq />
        <PickupSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
