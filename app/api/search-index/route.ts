import { normalizeLocale } from '@/lib/i18n'
import { getSearchIndexItems } from '@/lib/search'

export const revalidate = 300

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const locale = normalizeLocale(searchParams.get('locale') ?? undefined)
  const items = await getSearchIndexItems(locale)

  return Response.json(items)
}
