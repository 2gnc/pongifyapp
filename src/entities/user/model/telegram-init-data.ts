import crypto from 'crypto'

const BOT_TOKEN = process.env.BOT_TOKEN!

export function verifyTelegramInitData(initData: string) {
  const urlParams = new URLSearchParams(initData)
  const hash = urlParams.get('hash')!
  urlParams.delete('hash')

  const dataCheckString = [...urlParams.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n')

  const secretKey = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest();
  
  const computedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

  if (computedHash !== hash) throw new Error('Invalid initData hash');

  return Object.fromEntries(urlParams.entries());
}
