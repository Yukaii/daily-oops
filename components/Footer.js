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
      <div className="d-flex flex-justify-center footer-links-container flex-wrap">
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

      <style jsx scoped>{`
        .footer-links-container {
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .footer-links-container {
            gap: 0.5rem;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
