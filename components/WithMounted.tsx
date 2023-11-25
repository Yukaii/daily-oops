import useMounted from '@/lib/hooks/useMounted'

type WithMountedProps = {
  children: (props: { mounted: boolean }) => React.ReactNode
}

export default function WithMounted({ children }: WithMountedProps) {
  const mounted = useMounted()

  return children({ mounted })
}
