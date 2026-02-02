import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { Storybook } from './components/Storybook';
import { Footer } from './components/Footer';
import { heroSections } from './data/mockData';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Triptych Layout - Single Screen */}
      <main className="triptych-grid pt-44 md:pt-48 flex-1">
        {/* Left: The Shop */}
        <HeroSection
          {...heroSections.shop}
          bgColor="bg-[var(--white)]"
        />

        {/* Center: Storybook (compact view with glassmorphism) */}
        <Storybook compact />

        {/* Right: The Studio */}
        <HeroSection
          {...heroSections.studio}
          bgColor="bg-[var(--soft-blush)]"
        />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
}

export default App;
