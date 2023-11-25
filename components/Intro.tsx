import Link from 'next/link'

export default function Intro() {
  return (
    <>
      <h2>Hi</h2>

      <p>This is Yukai Huang&apos;s personal website.</p>

      <p>
        Here you can read my <Link href="/blog">recent posts</Link>, play with{' '}
        <Link href="/projects">my side projects before</Link>, or{' '}
        <Link href="/about">get to know me more</Link>.
      </p>

      <p>安久吧！</p>
    </>
  )
}
