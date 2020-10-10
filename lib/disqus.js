export function getDisqusConfig () {
  return {
    shortname: process.env.DISQUS_SHORTNAME,
    domain: process.env.DISQUS_DOMAIN
  }
}
