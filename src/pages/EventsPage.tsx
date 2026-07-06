import React, { useState, useEffect, useCallback } from 'react';
import {
  Calendar, MapPin, ExternalLink, Music2,
  Ticket, Loader2, RefreshCw, Search, AlertCircle
} from 'lucide-react';

// ─── ⚙️  Config ───────────────────────────────────────────────────────────────
const TM_API_KEY = import.meta.env.VITE_TICKETMASTER_KEY ?? 'knLH1Jjqm2gn2f8wnjS0xAmxDgh7kf0S';

// Artistas Gospel/CCM monitorados
const GOSPEL_KEYWORDS = [
  'Kirk Franklin',
  'Maverick City Music',
  'Elevation Worship',
  'Tasha Cobbs Leonard',
  'Chris Tomlin',
  'Hillsong',
  'Bethel Music',
  'Phil Wickham',
  'Lauren Daigle',
  'for KING & COUNTRY',
  'TobyMac',
  'CeCe Winans',
  'Travis Greene',
  'Todd Dulaney',
  'Lecrae',
];

// ─── Tipos ────────────────────────────────────────────────────────────────────
interface TMVenue {
  name: string;
  city?: { name: string };
  state?: { stateCode: string; name: string };
  country?: { countryCode: string; name: string };
}

interface TMEvent {
  id: string;
  name: string;
  url: string;
  dates: {
    start: { localDate: string; localTime?: string };
    status?: { code: string };
  };
  images?: { url: string; width: number; height: number }[];
  priceRanges?: { min: number; max: number; currency: string }[];
  _embedded?: { venues?: TMVenue[] };
  _keyword: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getVenue(e: TMEvent): TMVenue | null {
  return e._embedded?.venues?.[0] ?? null;
}

// Alterado para formato holandês
function formatDate(localDate: string) {
  const d = new Date(localDate + 'T12:00:00');
  return {
    month: d.toLocaleDateString('nl-NL', { month: 'short' }),
    day: d.getDate(),
    year: d.getFullYear(),
    weekday: d.toLocaleDateString('nl-NL', { weekday: 'short' }),
    full: d.toLocaleDateString('nl-NL', { month: 'long', day: 'numeric', year: 'numeric' }),
  };
}

function daysUntil(localDate: string) {
  return Math.ceil((new Date(localDate + 'T12:00:00').getTime() - Date.now()) / 86400000);
}

function getBestImage(e: TMEvent) {
  if (!e.images?.length) return null;
  const sorted = [...e.images].sort((a, b) => b.width - a.width);
  return (sorted.find(i => i.width / (i.height || 1) > 1.5) ?? sorted[0]).url;
}

// Formatação de preço (EUR para Holanda)
function formatPrice(e: TMEvent) {
  const r = e.priceRanges?.[0];
  if (!r) return null;
  const currency = r.currency === 'EUR' ? '€' : '$';
  return r.min === r.max ? `${currency}${Math.round(r.min)}` : `${currency}${Math.round(r.min)}–${currency}${Math.round(r.max)}`;
}

// Adicionado filtro por país (NL - Netherlands)
async function fetchForKeyword(keyword: string): Promise<TMEvent[]> {
  const params = new URLSearchParams({
    apikey: TM_API_KEY,
    keyword,
    classificationName: 'Music',
    countryCode: 'NL', // Foco em eventos na Holanda
    size: '5',
    sort: 'date,asc',
  });
  const res = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?${params}`);
  if (!res.ok) throw new Error(`TM ${res.status}`);
  const data = await res.json();
  return (data._embedded?.events ?? []).map((ev: TMEvent) => ({ ...ev, _keyword: keyword }));
}

// ─── Card ─────────────────────────────────────────────────────────────────────
const EventCard: React.FC<{ event: TMEvent }> = ({ event }) => {
  const venue = getVenue(event);
  const d = formatDate(event.dates.start.localDate);
  const days = daysUntil(event.dates.start.localDate);
  const image = getBestImage(event);
  const price = formatPrice(event);
  const cancelled = event.dates.status?.code === 'cancelled';
  const location = [
    venue?.city?.name,
    venue?.state?.stateCode,
    venue?.country?.countryCode !== 'NL' ? venue?.country?.name : undefined,
  ].filter(Boolean).join(', ');

  return (
    <div className={`group flex flex-col bg-white dark:bg-gray-900 border rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${
      cancelled ? 'border-red-200 dark:border-red-900/40 opacity-60' : 'border-gray-100 dark:border-white/5 hover:border-orange-400 dark:hover:border-orange-500'
    }`}>

      {/* Imagem ou header laranja */}
      {image ? (
        <div className="relative h-36 overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img src={image} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {!cancelled && days >= 0 && days <= 30 && (
            <span className="absolute top-3 right-3 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {days === 0 ? 'Vandaag' : days === 1 ? 'Morgen' : `${days}d`}
            </span>
          )}
          {cancelled && <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">Geannuleerd</span>}
          <span className="absolute bottom-3 left-3 bg-black/50 text-white text-[9px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full backdrop-blur-sm">{event._keyword}</span>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music2 className="w-4 h-4 text-orange-100" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-100">{event._keyword}</span>
          </div>
          {!cancelled && days >= 0 && days <= 30 && (
            <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
              {days === 0 ? 'Vandaag' : days === 1 ? 'Morgen' : `${days}d`}
            </span>
          )}
        </div>
      )}

      {/* Corpo */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 uppercase tracking-tight">
          {event.name}
        </h3>

        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center bg-orange-50 dark:bg-orange-500/10 border border-orange-100 dark:border-orange-500/20 rounded-lg w-12 h-12 flex-shrink-0">
            <span className="text-[9px] font-bold uppercase tracking-wider text-orange-400">{d.month}</span>
            <span className="text-lg font-black text-orange-500 leading-none">{d.day}</span>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{d.weekday}, {d.full}</p>
            {event.dates.start.localTime && (
              <p className="text-[11px] text-gray-400 mt-0.5">
                {/* Formato 24h para Holanda */}
                {new Date(`2000-01-01T${event.dates.start.localTime}`).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
              </p>
            )}
          </div>
        </div>

        {venue && (
          <div className="flex items-start gap-2">
            <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{venue.name}</p>
              {location && <p className="text-[11px] text-gray-400">{location}</p>}
            </div>
          </div>
        )}

        {price && (
          <p className="text-xs text-gray-500">Vanaf <span className="font-semibold text-gray-800 dark:text-gray-200">{price}</span></p>
        )}

        <div className="mt-auto pt-3">
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-[11px] font-black uppercase tracking-widest px-4 py-2.5 rounded-lg transition-all"
          >
            <Ticket className="w-3.5 h-3.5" />
            Kaarten Kopen
          </a>
        </div>
      </div>
    </div>
  );
};

// ─── Página ───────────────────────────────────────────────────────────────────
const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<TMEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'this-month' | 'next-3-months'>('all');

  const load = useCallback(async () => {
    if (TM_API_KEY === 'SUA_KEY_AQUI') { setError('missing_key'); setLoading(false); return; }
    setLoading(true); setError(null);
    try {
      const results = await Promise.allSettled(GOSPEL_KEYWORDS.map(fetchForKeyword));
      const seen = new Set<string>();
      const flat: TMEvent[] = [];
      results.forEach(r => {
        if (r.status === 'fulfilled') r.value.forEach(e => { if (!seen.has(e.id)) { seen.add(e.id); flat.push(e); } });
      });
      const gospelOnly = flat.filter((event) => {
        const eventName = event.name.toLowerCase();
        return GOSPEL_KEYWORDS.some((artist) =>
          eventName.includes(artist.toLowerCase())
        );
      });

      gospelOnly.sort(
        (a, b) =>
          new Date(a.dates.start.localDate).getTime() -
          new Date(b.dates.start.localDate).getTime()
      );
      
      setEvents(gospelOnly);
    } catch {
      setError('Fout bij het laden van evenementen. Controleer uw API key.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = events.filter(e => {
    const days = daysUntil(e.dates.start.localDate);
    if (filter === 'this-month' && !(days >= 0 && days <= 30)) return false;
    if (filter === 'next-3-months' && !(days >= 0 && days <= 90)) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const v = getVenue(e);
      return e.name.toLowerCase().includes(q) || e._keyword.toLowerCase().includes(q) || !!v?.city?.name?.toLowerCase().includes(q);
    }
    return true;
  });

  const countries = new Set(events.map(e => getVenue(e)?.country?.countryCode).filter(Boolean));

  // Traduzido para holandês
  const FILTERS = [
    { key: 'all' as const, label: 'Alle Aankomende' },
    { key: 'this-month' as const, label: 'Deze Maand' },
    { key: 'next-3-months' as const, label: 'Volgende 3 Maanden' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="w-14 h-14 mx-auto mb-4 opacity-90" />
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-3">Gospel Evenementen</h1>
          <p className="text-orange-100 text-lg max-w-xl mx-auto">Echte aankomende concerten & worship avonden — mogelijk gemaakt door Ticketmaster.</p>
          {!loading && events.length > 0 && (
            <div className="flex justify-center gap-8 mt-8">
              {[
                { v: events.length, l: 'Evenementen' }, 
                { v: GOSPEL_KEYWORDS.length, l: 'Artiesten' }, 
                { v: countries.size, l: 'Landen' }
              ].map(({ v, l }) => (
                <React.Fragment key={l}>
                  <div><p className="text-3xl font-black">{v}</p><p className="text-orange-200 text-xs uppercase tracking-widest mt-0.5">{l}</p></div>
                  {l !== 'Landen' && <div className="w-px bg-white/20" />}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-white/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center gap-3">
          <div className="flex gap-2">
            {FILTERS.map(f => (
              <button key={f.key} onClick={() => setFilter(f.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === f.key ? 'bg-orange-500 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-orange-50 dark:hover:bg-white/10'}`}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex-1 min-w-[180px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="text" placeholder="Zoek artiest of stad..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-8 pr-4 py-1.5 text-sm bg-gray-100 dark:bg-white/5 border border-transparent focus:border-orange-300 rounded-full outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400" />
          </div>
          <button onClick={load} disabled={loading} className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-500 transition-colors disabled:opacity-40 ml-auto">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Vernieuwen
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {error === 'missing_key' && (
          <div className="max-w-lg mx-auto text-center py-20">
            <AlertCircle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">API Key niet geconfigureerd</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Voeg toe in <code className="bg-gray-100 dark:bg-white/10 px-1.5 py-0.5 rounded text-orange-500">.env</code>:</p>
            <pre className="bg-gray-900 text-green-400 text-xs text-left rounded-xl p-4 mb-6">VITE_TICKETMASTER_KEY=uw_consumer_key</pre>
            <a href="https://developer.ticketmaster.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors">
              <ExternalLink className="w-4 h-4" /> API Key Ophalen (gratis)
            </a>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <Loader2 className="w-10 h-10 animate-spin text-orange-500 mb-4" />
            <p className="text-sm">Evenementen laden van Ticketmaster...</p>
          </div>
        )}

        {error && error !== 'missing_key' && (
          <div className="text-center py-20">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <p className="text-red-500 mb-4 text-sm">{error}</p>
            <button onClick={load} className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">Opnieuw Proberen</button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-sm">Geen evenementen gevonden.</p>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="text-xs text-gray-400 mb-6">{filtered.length} evenement{filtered.length !== 1 ? 'en' : ''} gevonden</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(event => <EventCard key={event.id} event={event} />)}
            </div>
          </>
        )}
      </div>

      {/* Submit */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-xl p-8 text-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Evenement toevoegen</h3>
          <p className="text-sm text-gray-500 mb-4">Zie een evenement dat hier mist? Stuur ons de details en we voegen het toe.</p>
          <a href="/submit" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-colors">Evenement Indienen</a>
        </div>
      </div>

    </div>

  );

};

export default EventsPage;