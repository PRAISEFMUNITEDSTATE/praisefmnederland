import React from 'react';
import { FileText, ArrowLeft, ChevronRight, Cookie, Settings, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CookiesPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
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
            <Cookie className="w-8 h-8 text-[#ff6600]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-[#ff6600]">Gegevensopslag</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-medium uppercase tracking-tighter leading-none mb-6">Cookies<br />Beleid</h1>
          <p className="text-gray-400 uppercase tracking-widest text-xs">Laatst bijgewerkt: 20 januari 2026</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 font-normal leading-relaxed uppercase tracking-tight">
          <section className="mb-20">
            <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">Wat zijn Cookies?</h2>
            <p>Cookies zijn kleine tekstbestanden die op uw apparaat worden opgeslagen en ons helpen een naadloze ervaring te bieden. Bij Praise FM Nederland gebruiken we ze om uw sessie en speler voorkeuren te onthouden.</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-100 dark:bg-white/5 border border-gray-100 dark:border-white/5 mb-20">
             <div className="bg-white dark:bg-[#111] p-10">
               <Shield className="w-6 h-6 text-[#ff6600] mb-6" />
               <h3 className="text-xl font-medium uppercase tracking-tight mb-4 dark:text-white">Essentiële Cookies</h3>
             </div>
             <div className="bg-white dark:bg-[#111] p-10">
               <Settings className="w-6 h-6 text-[#ff6600] mb-6" />
               <h3 className="text-xl font-medium uppercase tracking-tight mb-4 dark:text-white">Speler Voorkeuren</h3>
               <p className="text-sm text-gray-500 uppercase tracking-tight leading-relaxed">We slaan uw volumeniveau, donker/licht thema keuze en recent gedraaide nummers lokaal op in uw browser.</p>
             </div>
          </div>

          <section className="mb-20">
            <h2 className="text-3xl font-medium uppercase tracking-tighter mb-8 dark:text-white border-b-2 border-black dark:border-white pb-4 inline-block">Cookies Beheren</h2>
            <p>U kunt cookies beheren of verwijderen via uw browserinstellingen. Houd er echter rekening mee dat het uitschakelen van essentiële cookies verhindert dat u inlogt of uw "Mijn Geluiden" bibliotheek opslaat.</p>
          </section>
          
          <div className="p-8 bg-[#ff6600]/10 border-2 border-[#ff6600] text-center">
             <p className="text-black dark:text-white text-sm font-regular uppercase tracking-widest">Wij gebruiken geen advertentiecookies van derden om uw gedrag op andere websites te volgen.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicyPage;