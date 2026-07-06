import React from 'react';
import { Users, ArrowRight } from 'lucide-react';
import { Program } from '../types';
import { SCHEDULES } from '../constants';

interface PresentersPageProps {
  onNavigateToProgram: (program: Program) => void;
}

const PRESENTERS_DATA = [
  {
    name: 'Fleur Jansen',
    image: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874293/fleur-jansen_uhsh90.webp',
    bio: 'De rustgevende stem van de nacht. Fleur leidt Nachtgenade met vredige muziek en een kalme aanwezigheid.',
    programTitle: 'Nachtgenade'
  },
  {
    name: 'Lieke van Dijk',
    image: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874294/lieke-van-dijk_hftgmj.webp',
    bio: 'De energieke stem achter de Ochtendshow. Lieke brengt muziek, bemoediging en inspiratie om je dag te beginnen.',
    programTitle: 'Ochtendshow'
  },
  {
    name: 'Joris de Wit',
    image: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874293/joris-de-wit_pnika0.webp',
    bio: 'Op zondagen begeleidt Joris de luisteraars door een reflectieve en worship ervaring met Zondag met Christus.',
    programTitle: 'Zondag met Christus'
  },
  {
    name: 'Daan Bakker',
    image: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874173/daan-bakker_utmjoc.webp',
    bio: 'Daan Bakker is je middaggezel op Middaggenade, met worship, vrede en bemoediging tijdens het drukste deel van de dag.',
    programTitle: 'Middaggenade'
  },
  {
    name: 'DJ Malik',
    image: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874293/dj-malik_zozlug.webp',
    bio: 'DJ Malik brengt energie, ritme en verse hip hop naar Praise FM Flow.',
    programTitle: 'Praise FM Flow'
  },
  {
    name: 'Lauke Adkin',
    image: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874296/lauke-adkin_tw08fj.webp',
    bio: 'Lauke host Future Artists, waar ze onafhankelijk talent van over de hele wereld ontdekt en promoot.',
    programTitle: 'Future Artists'
  },
  {
    name: 'Eva de Jong',
    image: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874293/eva-de-jong_jbbrcd.webp',
    bio: 'Eva brengt de hits en de perfecte sfeer voor de weg naar huis op Thuisreis.',
    programTitle: 'Thuisreis'
  },
  {
    name: 'Lieke Aarnink',
    image: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874296/lieke-aarnink_x9qyzx.webp',
    bio: 'Lieke Aarnink brengt attitude en geloof met Praise FM Rock.',
    programTitle: 'Praise FM Rock'
  },
  {
    name: 'Martien Holterman',
    image: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874294/martien-holterman_ckagup.webp',
    bio: 'Een historicus van worshipmuziek. Martien host Praise FM Classics en neemt luisteraars mee terug naar tijdloze liederen die generaties hebben gevormd.',
    programTitle: 'Praise FM Classics'
  },
  {
    name: 'Katrien Van Eijk',
    image: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1783355141/katrien_van_eijk_pyharm.webp',
    bio: 'Katrien sluit de dag af met Praise FM Chill en creërt de perfecte sfeer.',
    programTitle: 'Praise FM Chill'
  }
];

const PresentersPage: React.FC<PresentersPageProps> = ({ onNavigateToProgram }) => {
  const findProgram = (title: string) => {
    for (let day = 0; day <= 6; day++) {
      const prog = (SCHEDULES[day] || []).find((p) => p.title === title);
      if (prog) return prog;
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#000] min-h-screen transition-colors duration-300">
      <div className="bg-black text-white py-20 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex items-center space-x-3 text-[#ff6600] mb-6">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-medium uppercase tracking-[0.4em]">
              De Stemmen van Praise FM Nederland
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-semibold uppercase tracking-tighter leading-none mb-8">
            Onze
            <br />
            Presentatoren
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-normal tracking-tight leading-relaxed">
            Ontmoet de stemmen achter de muziek, worship, inspiratie en speciale programmering die elke dag het geluid van Praise FM Nederland vormgeven.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRESENTERS_DATA.map((presenter) => {
            const program = findProgram(presenter.programTitle);

            return (
              <div
                key={presenter.name}
                className="flex flex-col group bg-white dark:bg-[#111] border border-gray-100 dark:border-white/5 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={presenter.image}
                    alt={presenter.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-60 transition-opacity"></div>

                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-[#ff6600] text-[10px] font-medium uppercase tracking-[0.3em] mb-2 block">
                      {presenter.programTitle}
                    </span>
                    <h2 className="text-3xl font-semibold text-white uppercase tracking-tighter">
                      {presenter.name}
                    </h2>
                  </div>
                </div>

                <div className="p-8 flex-grow flex flex-col">
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
                    {presenter.bio}
                  </p>

                  <div className="mt-auto">
                    {program ? (
                      <button
                        onClick={() => onNavigateToProgram(program)}
                        className="w-full bg-[#ff6600] text-white py-4 px-6 text-[10px] font-medium uppercase tracking-[0.2em] flex items-center justify-center space-x-2 hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors"
                      >
                        <span>Bekijk Programma</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="w-full border border-gray-200 dark:border-white/10 py-4 px-6 text-[10px] text-center text-gray-400 uppercase tracking-[0.2em]">
                        Programma pagina binnenkort beschikbaar
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-24 bg-gray-50 dark:bg-[#111] p-12 md:p-20 flex flex-col items-center text-center border border-gray-100 dark:border-white/5">
          <h4 className="text-4xl font-semibold uppercase tracking-tighter dark:text-white mb-6">
            Wilt u de volledige line-up?
          </h4>

          <p className="text-gray-500 max-w-xl text-sm mb-10 leading-relaxed">
            Ontdek het volledige uitzendschema en ontdek elke show die Praise FM Nederland uw thuis maakt voor worship, bemoediging en geweldige muziek.
          </p>

          <button
            onClick={() => {
              window.location.hash = '#/schedule';
            }}
            className="bg-black dark:bg-white text-white dark:text-black px-12 py-5 text-[10px] font-medium uppercase tracking-[0.3em] hover:bg-[#ff6600] dark:hover:bg-[#ff6600] hover:text-white transition-all shadow-xl active:scale-95"
          >
            Volledige Programmering
          </button>
        </div>
      </div>
    </div>
  );
};

export default PresentersPage;