const fs = require('fs')
const path = require('path')

const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID

if (!adsenseId) {
  console.warn('Warning: NEXT_PUBLIC_ADSENSE_ID not found in environment variables. Skipping ads.txt generation.')
  process.exit(0)
}

// Remove 'ca-' prefix if present (AdSense IDs can be in format ca-pub-XXXXXXXX or pub-XXXXXXXX)
const publisherId = adsenseId.replace(/^ca-/, '')

const adsContent = `google.com, ${publisherId}, DIRECT, f08c47fec0942fa0
`

const publicDir = path.join(__dirname, '..', 'public')
const adsFilePath = path.join(publicDir, 'ads.txt')

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true })
}

fs.writeFileSync(adsFilePath, adsContent, 'utf8')
console.log(`✓ Generated ads.txt with publisher ID: ${publisherId}`)
