import { revalidatePath } from 'next/cache'

/**
 * On-demand ISR revalidation.
 *
 * Call after publishing new content so visitors get fresh pages without
 * waiting for the 300s time-based revalidation, e.g.:
 *
 *   POST /api/revalidate
 *   Authorization: Bearer <REVALIDATE_SECRET>
 *   { "path": "/blog/2024/01/02/slug" }
 *
 * A GET with `?secret=...&path=...` is also accepted for simple webhooks.
 * Omitting `path` revalidates the site root layout (all pages).
 */
const getSecret = (request: Request): string | null => {
  const auth = request.headers.get('authorization')

  if (auth?.startsWith('Bearer ')) {
    return auth.slice('Bearer '.length)
  }

  return new URL(request.url).searchParams.get('secret')
}

const getPath = async (request: Request): Promise<string | null> => {
  if (request.method === 'POST') {
    try {
      const body = (await request.json()) as { path?: unknown }
      return typeof body.path === 'string' ? body.path : null
    } catch {
      return null
    }
  }

  return new URL(request.url).searchParams.get('path')
}

async function handleRevalidate(request: Request) {
  const secret = process.env.REVALIDATE_SECRET

  if (!secret) {
    return Response.json(
      { error: 'REVALIDATE_SECRET is not configured' },
      { status: 500 },
    )
  }

  if (getSecret(request) !== secret) {
    return Response.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const path = await getPath(request)

  if (path && !path.startsWith('/')) {
    return Response.json({ error: 'path must start with /' }, { status: 400 })
  }

  revalidatePath(path ?? '/', 'layout')

  return Response.json({ revalidated: true, path: path ?? '/' })
}

export async function GET(request: Request) {
  return handleRevalidate(request)
}

export async function POST(request: Request) {
  return handleRevalidate(request)
}
