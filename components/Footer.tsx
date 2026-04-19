export const Footer = () => {
  const links = [
    { name: 'GitHub', url: 'https://github.com/Yukaii' },
    { name: 'Mastodon', url: 'https://mastodon.social/@yukai' },
    { name: 'Threads', url: 'https://www.threads.net/@yukaii_h' },
    { name: 'Twitter', url: 'https://twitter.com/yukaii_h' },
    { name: 'Instagram', url: 'https://www.instagram.com/yukaii_h/' },
    { name: 'Twitch', url: 'https://www.twitch.tv/yukaii_h' },
  ]

  return (
    <footer className="container py-3">
      <hr />
      <div
        className="d-flex flex-justify-center flex-wrap"
        style={{ gap: '1rem' }}
      >
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
