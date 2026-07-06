require('dotenv').config()

const chokidar = require('chokidar')
const path = require('path')
const fs = require('fs')
const cloudinary = require('cloudinary').v2
const admin = require('firebase-admin')
const mm = require('music-metadata')

const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const WATCH_FOLDER = 'E:/PRAISE FM RECORDS'

// Atualizado com programas e apresentadores holandeses
const PROGRAMS = [
  {
    slug: 'classic',
    title: 'Praise FM Classics',
    presenter: 'Martien Holterman',
    folder: 'CLASSICS',
    image:
      'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874294/martien-holterman_ckagup.webp',
  },
  {
    slug: 'future-artists',
    title: 'Future Artists',
    presenter: 'Lauke Adkin',
    folder: 'FUTURE ARTISTS',
    image:
      'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874296/lauke-adkin_tw08fj.webp',
  },
  {
    slug: 'praise-fm-rock',
    title: 'Praise FM Rock',
    presenter: 'Lieke Aarnink',
    folder: 'ROCK',
    image: 
      'https://res.cloudinary.com/trjf7ykr/image/upload/v1782874296/lieke-aarnink_x9qyzx.webp',
  },
]

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForFile(filePath) {
  let lastSize = -1

  while (true) {
    const stats = fs.statSync(filePath)

    if (stats.size === lastSize) {
      return
    }

    lastSize = stats.size
    await sleep(3000)
  }
}

function findProgram(filePath) {
  const normalized = filePath.toLowerCase()

  if (normalized.includes('classics')) {
    return PROGRAMS.find((p) => p.slug === 'classic')
  }

  if (normalized.includes('future artists')) {
    return PROGRAMS.find((p) => p.slug === 'future-artists')
  }

  if (normalized.includes('rock')) {
    return PROGRAMS.find((p) => p.slug === 'praise-fm-rock')
  }

  return null
}

async function processFile(filePath) {
  try {
    const fileName = path.basename(filePath)

    // Traduzido para holandês
    console.log(`\nNieuwe aflevering gedetecteerd: ${fileName}`)

    const program = findProgram(filePath)

    if (!program) {
      console.log(`Programma niet geïdentificeerd: ${fileName}`)
      return
    }

    console.log(`Programma geïdentificeerd: ${program.title}`)
    console.log('Wachten tot bestand klaar is met opnemen...')

    await waitForFile(filePath)

    console.log('Bestand klaar. Duur lezen...')

    const metadata = await mm.parseFile(filePath)
    const durationMinutes = Math.round((metadata.format.duration || 3600) / 60)

    const dateString = new Date().toISOString().split('T')[0]

    console.log('Verzenden naar Cloudinary...')

    const uploadResult = await cloudinary.uploader.upload(filePath, {
      resource_type: 'video',
      folder: `praise-fm-episodes/${program.slug}`,
      public_id: `${dateString}_${Date.now()}`,
      overwrite: true,
    })

    // Descrição traduzida para holandês
    const episode = {
      title: program.title,
      presenter: program.presenter,
      description: `Herhaling van ${program.title}.`,
      audioUrl: uploadResult.secure_url,
      image: program.image,
      duration: `${durationMinutes} mins`,
      publishedAt: admin.firestore.Timestamp.now(),
      date: dateString,
    }

    await db
      .collection('programs')
      .doc(program.slug)
      .collection('episodes')
      .doc(dateString)
      .set(episode, { merge: true })

    console.log(`Aflevering gepubliceerd in Firebase: ${program.slug}/${dateString}`)
  } catch (error) {
    console.error('Fout bij verwerken bestand:', error)
  }
}

console.log('Map monitoren:')
console.log(WATCH_FOLDER)

const watcher = chokidar.watch(WATCH_FOLDER, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  ignoreInitial: true,
  depth: 3,
})

watcher.on('add', async (filePath) => {
  if (!filePath.toLowerCase().endsWith('.mp3')) return
  await processFile(filePath)
})