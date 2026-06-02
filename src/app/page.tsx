import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Vision } from "@/components/Vision";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getContactInfo } from "@/lib/db";

// Always render fresh on the server so admin edits to contact info show up immediately.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Server-side fetch from SQLite — admin edits propagate on the next request.
  const info = getContactInfo();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero whatsapp={info.whatsapp} />
      <About />
      <Services />
      <Vision />
      <Contact
        info={{
          phone: info.phone,
          whatsapp: info.whatsapp,
          email: info.email,
          address: info.address,
          working_hours: info.working_hours,
        }}
      />
      <Footer info={info} />
    </main>
  );
}
