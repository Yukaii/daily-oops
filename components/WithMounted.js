import useMounted from 'lib/hooks/useMounted'

export default function WithMounted({ children }) {
  const mounted = useMounted()
  return children({ mounted })
}
