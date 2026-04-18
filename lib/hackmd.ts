import HackMDAPI from '@hackmd/api'

import { config } from '@/lib/config'

const HACKMD_REQUEST_TIMEOUT_MS = 30_000
const HACKMD_RETRY_ATTEMPTS = 3
const HACKMD_RETRY_BASE_DELAY_MS = 250

let client: HackMDAPI | null = null

const getHackMDAccessToken = () => {
  const accessToken = process.env.HACKMD_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error(
      'Missing HACKMD_ACCESS_TOKEN for HackMD API access. Create a token in HackMD Settings -> API and set it in the environment.',
    )
  }

  return accessToken
}

export const getHackMDClient = () => {
  if (!client) {
    client = new HackMDAPI(getHackMDAccessToken(), config.hackmdApiBaseUrl, {
      wrapResponseErrors: true,
      timeout: HACKMD_REQUEST_TIMEOUT_MS,
      retryConfig: {
        maxRetries: HACKMD_RETRY_ATTEMPTS,
        baseDelay: HACKMD_RETRY_BASE_DELAY_MS,
      },
    })
  }

  return client
}
