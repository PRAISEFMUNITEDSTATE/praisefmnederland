import React from 'react';
import { Phone, Clock, Radio, Star, Zap, ArrowRight } from 'lucide-react';

const AdvertisePage: React.FC = () => {
  // Mantido o número original - atualize se necessário
  const whatsappNumber = '+5521971099200';
  
  const plans = [
    {
      title: 'Commerciale Spot',
      duration: '30 seconden',
      price: '€5',
      description: 'Vooraf opgenomen bericht ingevoegd tijdens programmapauzes. Ideaal voor snelle promotie.',
      icon: <Zap className="w-6 h-6" />,
      highlight: false,
      message: "Hallo! Ik ben geïnteresseerd in de 30s Commerciale Spot op Praise FM Nederland."
    },
    {
      title: 'Live Vermelding',
      duration: 'Tijdens live shows',
      price: '€8',
      description: 'De presentator noemt uw merk live in de lucht, met direct bereik.',
      icon: <Star className="w-6 h-6" />,
      highlight: true,
      message: 'Hallo! Ik wil een Live Vermelding boeken op Praise FM Nederland.'
    },
    {
      title: '1-Uur Show',
      duration: '60 minuten',
      price: '€30',
      description: 'Uw eigen muziek- of talkshow voor een volledig uur. Kies uw gewenste tijdslot.',
      icon: <Radio className="w-6 h-6" />,
      highlight: false,
      message: "Hallo! Ik ben geïnteresseerd in de 1-Uur Show op Praise FM Nederland."
    },
    {
      title: 'Maandelijks Pakket',
      duration: '4 shows/maand',
      price: '€100',
      description: 'Vier shows van één uur gedurende de maand tegen een gereduceerd tarief.',
      icon: <Clock className="w-6 h-6" />,
      highlight: false,
      message: 'Hallo! Ik wil me aanmelden voor het Maandelijks Pakket op Praise FM Nederland.'
    }
  ];

  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            Adverteer bij <span className="text-black">Praise FM Nederland</span>
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-8 text-white/90">
            Breng uw merk naar duizenden luisteraars gepassioneerd over muziek en geloof.
          </p>
          <button
            onClick={() => openWhatsApp('Hallo! Ik wil adverteren bij Praise FM Nederland. Kunt u mij meer informatie sturen?')}
            className="inline-flex items-center gap-2 bg-black text-white hover:bg-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl"
          >
            <Phone className="w-6 h-6" />
            Chat op WhatsApp
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-4">
          Onze <span className="text-orange-500">Plannen</span>
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Kies het perfecte formaat voor uw campagne. Alle prijzen zijn onderhandelbaar via WhatsApp.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl p-6 border-2 transition-all hover:shadow-lg flex flex-col ${
                plan.highlight
                  ? 'border-orange-500 shadow-orange-100 dark:shadow-orange-900/20'
                  : 'border-transparent hover:border-orange-200 dark:hover:border-orange-800'
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Meest Populair
                </span>
              )}

              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 mb-4">
                {plan.icon}
              </div>

              <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
              <p className="text-sm text-orange-500 font-bold mb-3">{plan.duration}</p>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{plan.description}</p>

              <div className="mb-4">
                <span className="text-3xl font-black">{plan.price}</span>
                {plan.title === 'Maandelijks Pakket' && (
                  <span className="text-sm text-gray-500 block">Bespaar €20</span>
                )}
              </div>

              <button
                onClick={() => openWhatsApp(plan.message)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Boek Nu
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 dark:bg-[#1a1a1a] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12">
            Waarom adverteren bij <span className="text-orange-500">Praise FM Nederland</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 mb-4">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Gegarandeerd Bereik</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Duizenden luisteraars afgestemd 24/7 in Nederland en daarbuiten.
              </p>
            </div>

            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Betrokken Publiek</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Loyal luisteraars die de aanbevelingen van het station vertrouwen.
              </p>
            </div>

            <div className="bg-white dark:bg-[#121212] p-6 rounded-xl">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Snelle Resultaten</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Flexibele advertentieformaten die passen bij uw budget en doelen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Klaar om te <span className="text-orange-500">groeien</span> met ons?
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
            Klik op de onderstaande knop en spreek direct met ons verkoopteam.
          </p>
          <button
            onClick={() => openWhatsApp('Hallo! Ik wil adverteren bij Praise FM Nederland. Kunt u mij meer informatie sturen?')}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-full font-black text-lg transition-all hover:scale-105 shadow-xl"
          >
            <Phone className="w-6 h-6" />
            +55 21 97109-9200
          </button>
          <p className="mt-4 text-sm text-gray-400">
            Of bel het bovenstaande nummer tijdens kantooruren.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AdvertisePage;