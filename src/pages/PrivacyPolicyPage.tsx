import React from 'react';
import { Shield, Lock, Eye, FileText, ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SECTIONS = [
  { id: 'introduction', title: '1. Inleiding' },
  { id: 'data-collection', title: '2. Gegevens die We Verzamelen' },
  { id: 'usage', title: '3. Hoe We Uw Gegevens Gebruiken' },
  { id: 'cookies', title: '4. Cookies & Tracking' },
  { id: 'storage', title: '5. Opslag & Beveiliging' },
  { id: 'rights', title: '6. Uw Rechten' },
  { id: 'contact', title: '7. Contact' }
];

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      {/* Header */}
      <div className="bg-black text-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 hover:text-white mb-8 text-[10px] font-medium uppercase tracking-[0.4em] group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Terug
          </button>
          <div className="flex items-center space-x-4 mb-6">
            <Shield className="w-8 h-8 text-[#ff6600]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-[#ff6600]">Juridisch Kader</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-medium uppercase tracking-tighter leading-none mb-6">Privacy<br />Beleid</h1>
          <p className="text-gray-400 uppercase tracking-widest text-xs">Laatst bijgewerkt: 20 januari 2026</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Sidebar Navigation */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Inhoud</h3>
            <nav className="space-y-4">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="flex items-center group w-full text-left"
                >
                  <ChevronRight className="w-3 h-3 mr-2 text-[#ff6600] opacity-0 group-hover:opacity-100 transition-all" />
                  <span className="text-[11px] font-medium uppercase tracking-tight text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {section.title}
                  </span>
                </button>
              ))}
            </nav>
          </aside>

          {/* Policy Content */}
          <main className="lg:col-span-9 space-y-20">
            
            <section id="introduction" className="scroll-mt-32">
              <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">1. Inleiding</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-normal leading-relaxed uppercase tracking-tight">
                <p>Bij Praise FM Nederland zijn we toegewijd aan het beschermen van uw persoonlijke informatie en transparant te zijn over wat we ermee doen. Dit beleid beschrijft hoe we uw persoonlijke gegevens gebruiken wanneer u onze website, mobiele applicaties gebruikt of interactie heeft met onze digitale uitzenddiensten.</p>
                <p className="mt-4">Wij handelen als gegevensbeheerder voor de informatie die we verzamelen en zijn toegewijd aan het verwerken ervan in overeenstemming met wereldwijde privacy standaarden.</p>
              </div>
            </section>

            <section id="data-collection" className="scroll-mt-32">
              <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">2. Gegevens die We Verzamelen</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div className="p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <Lock className="w-6 h-6 text-[#ff6600] mb-6" />
                  <h4 className="text-lg font-medium uppercase tracking-tight mb-4 dark:text-white">Account Informatie</h4>
                </div>
                <div className="p-8 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
                  <Eye className="w-6 h-6 text-[#ff6600] mb-6" />
                  <h4 className="text-lg font-medium uppercase tracking-tight mb-4 dark:text-white">Gebruiksgegevens</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-tight leading-relaxed">We verzamelen informatie over uw interacties met onze speler, inclusief "favoriete" nummers, favoriete overdenkingen en zoekgeschiedenis om uw ervaring te personaliseren.</p>
                </div>
              </div>
            </section>

            <section id="usage" className="scroll-mt-32">
              <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">3. Hoe We Uw Gegevens Gebruiken</h2>
              <ul className="space-y-6 text-gray-600 dark:text-gray-400 font-normal uppercase tracking-tight text-sm">
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#ff6600] text-black text-[10px] font-black flex items-center justify-center mr-4 flex-shrink-0">A</span>
                  <span>Om onze live streaming en podcast diensten te leveren en te onderhouden.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#ff6600] text-black text-[10px] font-black flex items-center justify-center mr-4 flex-shrink-0">B</span>
                  <span>Om u te informeren over wijzigingen in onze programmering of aankomende evenementen (als u zich heeft aangemeld voor meldingen).</span>
                </li>
                <li className="flex items-start">
                  <span className="w-6 h-6 bg-[#ff6600] text-black text-[10px] font-black flex items-center justify-center mr-4 flex-shrink-0">C</span>
                  <span>Om onze platform prestaties en gebruikersinterface te verbeteren op basis van geaggregeerde gebruikspatronen.</span>
                </li>
              </ul>
            </section>

            <section id="cookies" className="scroll-mt-32">
              <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">4. Cookies & Tracking</h2>
              <div className="bg-gray-50 dark:bg-white/5 p-10">
                <p className="text-gray-600 dark:text-gray-400 font-normal uppercase tracking-tight text-sm leading-relaxed mb-6">We gebruiken essentiële cookies om uw inlogsessie te onderhouden en uw speler voorkeuren op te slaan (zoals volume en thema). Deze zijn noodzakelijk voor het correct functioneren van de website.</p>
                <div className="flex items-center space-x-3 text-[#ff6600]">
                  <FileText className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Bekijk Cookie Beleid</span>
                </div>
              </div>
            </section>

            <section id="storage" className="scroll-mt-32">
              <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">5. Opslag & Beveiliging</h2>
            </section>

            <section id="rights" className="scroll-mt-32">
              <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">6. Uw Rechten</h2>
              <p className="text-gray-600 dark:text-gray-400 font-normal uppercase tracking-tight text-sm leading-relaxed mb-6">U heeft het recht om de informatie die we over u hebben in te zien, bij te werken of te verwijderen. U kunt deze acties direct uitvoeren vanaf uw profielpagina of door contact op te nemen met ons ondersteuningsteam.</p>
              <button 
                onClick={() => navigate('/profile')}
                className="bg-black dark:bg-white text-white dark:text-black px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all"
              >
                Toegang tot Profiel Instellingen
              </button>
            </section>

            <section id="contact" className="scroll-mt-32">
              <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">7. Contact</h2>
              <p className="text-gray-600 dark:text-gray-400 font-normal uppercase tracking-tight text-sm leading-relaxed">Voor vragen over dit Privacy Beleid, neem contact op met onze Functionaris Gegevensbescherming via:</p>
              <div className="mt-8">
                <p className="text-black dark:text-white text-xl font-medium uppercase tracking-tighter">privacy@praisefm.nl</p>
                <p className="text-gray-500 text-[10px] font-medium uppercase tracking-widest mt-2">Compliance Afdeling — PRAISE FM NEDERLAND</p>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* Footer Decoration */}
      <div className="py-20 bg-gray-50 dark:bg-[#0a0a0a] text-center">
        <p className="text-[10px] text-gray-400 dark:text-gray-600 uppercase tracking-[0.5em]">Vertrouwen • Transparantie • Geloof</p>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;