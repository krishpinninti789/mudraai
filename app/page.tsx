import { ArchivalSection } from "./components/ArchivalSection";
import { DetectionInterface } from "./components/DetectionInterface";
import { Footer } from "./components/FooterSection";
import { HeroSection } from "./components/HeroSection";
import { KnowledgeSection } from "./components/KnowledgeSection";
import { TelemetryPanel } from "./components/TelemetryPanel";
import { Navigation } from "./components/WebNavBar";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />

      {/* Main App Interface */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <DetectionInterface />
          <TelemetryPanel />
        </div>

        <KnowledgeSection />
        <ArchivalSection />
      </main>

      <Footer />
    </div>
  );
}
