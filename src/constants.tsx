import { Program } from './types'

export const COLORS = {
  ACCENT: '#ff6600',
  DARK: '#1a1a1a',
  GRAY: '#f3f4f6'
}

// Imagens dos apresentadores da Praise FM Nederland (Cloudinary)
const IMAGES = {
  FLEUR_JANSEN: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874293/fleur-jansen_uhsh90.webp',
  LIEKE_VAN_DIJK: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874294/lieke-van-dijk_hftgmj.webp',
  JORIS_DE_WIT: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874293/joris-de-wit_pnika0.webp',
  DAAN_BAKKER: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874173/daan-bakker_utmjoc.webp',
  DJ_MALIK: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874293/dj-malik_zozlug.webp',
  LAUKE_ADKIN: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874296/lauke-adkin_tw08fj.webp',
  EVA_DE_JONG: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874293/eva-de-jong_jbbrcd.webp',
  LIEKE_AARNINK: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874296/lieke-aarnink_x9qyzx.webp',
  MARTIEN_HOLTERMAN: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874294/martien-holterman_ckagup.webp',
  KATRIEN_VAN_EIJK: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1783355141/katrien_van_eijk_pyharm.webp',
  WORSHIP: 'https://res.cloudinary.com/trjf7ykr/image/upload/v1782875288/WHITENL_xepgma.webp'
}

// Programação de SEGUNDA a SÁBADO (dias 1-6)
const weekday: Program[] = [
  {
    id: 'nachtgenade',
    title: 'Nachtgenade',
    host: 'Fleur Jansen',
    startTime: '00:00',
    endTime: '06:00',
    description: 'Aanbidding gedurende de nacht.',
    image: IMAGES.FLEUR_JANSEN
  },
  {
    id: 'worship-ochtend',
    title: 'Worship',
    host: 'Praise FM NL',
    startTime: '06:00',
    endTime: '07:00',
    description: 'Begin je dag met aanbidding.',
    image: IMAGES.WORSHIP
  },
  {
    id: 'ochtendshow',
    title: 'Ochtendshow',
    host: 'Lieke van Dijk',
    startTime: '07:00',
    endTime: '12:00',
    description: 'Muziek, bemoediging en inspiratie.',
    image: IMAGES.LIEKE_VAN_DIJK
  },
  {
    id: 'worship-middag',
    title: 'Worship',
    host: 'Praise FM NL',
    startTime: '12:00',
    endTime: '13:00',
    description: 'Een middaguur van aanbidding.',
    image: IMAGES.WORSHIP
  },
  {
    id: 'middaggenade',
    title: 'Middaggenade',
    host: 'Daan Bakker',
    startTime: '13:00',
    endTime: '16:00',
    description: 'Geloof en bemoediging door muziek.',
    image: IMAGES.DAAN_BAKKER
  },
  {
    id: 'praise-fm-flow',
    title: 'Praise FM Flow',
    host: 'DJ Malik',
    startTime: '16:00',
    endTime: '17:00',
    description: 'Hip Hop en energie.',
    image: IMAGES.DJ_MALIK
  },
  {
    id: 'future-artists',
    title: 'Future Artists',
    host: 'Lauke Adkin',
    startTime: '17:00',
    endTime: '18:00',
    description: 'Ontdek de toekomstige sound van christelijke muziek.',
    image: IMAGES.LAUKE_ADKIN
  },
  {
    id: 'thuisreis',
    title: 'Thuisreis',
    host: 'Eva de Jong',
    startTime: '18:00',
    endTime: '20:00',
    description: 'Jouw gezelschap op weg naar huis.',
    image: IMAGES.EVA_DE_JONG
  },
  {
    id: 'praise-fm-rock',
    title: 'Praise FM Rock',
    host: 'Lieke Aarnink',
    startTime: '20:00',
    endTime: '21:00',
    description: 'Christelijke rock en geloof.',
    image: IMAGES.LIEKE_AARNINK
  },
  {
    id: 'praise-fm-classics',
    title: 'Praise FM Classics',
    host: 'Martien Holterman',
    startTime: '21:00',
    endTime: '22:00',
    description: 'Tijdloze christelijke favorieten.',
    image: IMAGES.MARTIEN_HOLTERMAN
  },
  {
    id: 'praise-fm-chill',
    title: 'Praise FM Chill',
    host: 'Katrien Van Eijk',
    startTime: '22:00',
    endTime: '00:00',
    description: 'Katrien Van Eijk brengt het beste van de Chill.',
    image: IMAGES.KATRIEN_VAN_EIJK
  }
]

// Programação de DOMINGO (dia 0)
const sunday: Program[] = [
  {
    id: 'zondag-nachtgenade',
    title: 'Nachtgenade',
    host: 'Fleur Jansen',
    startTime: '00:00',
    endTime: '06:00',
    description: 'Aanbidding gedurende de nacht.',
    image: IMAGES.FLEUR_JANSEN
  },
  {
    id: 'zondag-worship-ochtend',
    title: 'Worship',
    host: 'Praise FM NL',
    startTime: '06:00',
    endTime: '07:00',
    description: 'Begin je zondag met aanbidding.',
    image: IMAGES.WORSHIP
  },
  {
    id: 'zondag-met-christus',
    title: 'Zondag met Christus',
    host: 'Joris de Wit',
    startTime: '07:00',
    endTime: '12:00',
    description: 'Zondag met geloof en aanbidding.',
    image: IMAGES.JORIS_DE_WIT
  },
  {
    id: 'zondag-worship-middag',
    title: 'Worship',
    host: 'Praise FM NL',
    startTime: '12:00',
    endTime: '13:00',
    description: 'Een middaguur van aanbidding.',
    image: IMAGES.WORSHIP
  },
  {
    id: 'zondag-middaggenade',
    title: 'Middaggenade',
    host: 'Daan Bakker',
    startTime: '13:00',
    endTime: '16:00',
    description: 'Een vloeiende middagmix van aanbidding.',
    image: IMAGES.DAAN_BAKKER
  },
  {
    id: 'zondag-praise-fm-flow',
    title: 'Praise FM Flow',
    host: 'DJ Malik',
    startTime: '16:00',
    endTime: '17:00',
    description: 'Hip Hop en energie.',
    image: IMAGES.DJ_MALIK
  },
  {
    id: 'zondag-future-artists',
    title: 'Future Artists',
    host: 'Lauke Adkin',
    startTime: '17:00',
    endTime: '18:00',
    description: 'Ontdek de toekomstige sound van christelijke muziek.',
    image: IMAGES.LAUKE_ADKIN
  },
  {
    id: 'zondag-worship-avond',
    title: 'Worship',
    host: 'Praise FM NL',
    startTime: '18:00',
    endTime: '20:00',
    description: 'Avondaanbidding en vredige christelijke muziek.',
    image: IMAGES.WORSHIP
  },
  {
    id: 'zondagdienst',
    title: 'Zondagdienst',
    host: 'Praise FM NL',
    startTime: '20:00',
    endTime: '21:00',
    description: 'Een gefocuste boodschap van geloof, hoop en bemoediging.',
    image: IMAGES.WORSHIP
  },
  {
    id: 'zondag-praise-fm-classics',
    title: 'Praise FM Classics',
    host: 'Martien Holterman',
    startTime: '21:00',
    endTime: '22:00',
    description: 'Tijdloze christelijke liederen en moderne klassiekers.',
    image: IMAGES.MARTIEN_HOLTERMAN
  },
  {
    id: 'zondag-praise-fm-chill',
    title: 'Praise FM Chill',
    host: 'Katrien Van Eijk',
    startTime: '22:00',
    endTime: '00:00',
    description: 'Katrien Van Eijk brengt het beste van de Chill.',
    image: IMAGES.KATRIEN_VAN_EIJK
  }
]

export const SCHEDULES: Record<number, Program[]> = {
  0: sunday,      // DOMINGO
  1: weekday,     // SEGUNDA
  2: weekday,     // TERÇA
  3: weekday,     // QUARTA
  4: weekday,     // QUINTA
  5: weekday,     // SEXTA
  6: weekday      // SÁBADO
}