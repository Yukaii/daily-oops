/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: `https://${process.env.DOMAIN}`,
  changefreq: 'monthly',
  priority: 1.0,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap-index.xml', '/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      `https://${process.env.DOMAIN}/server-sitemap-index.xml`,
      `https://${process.env.DOMAIN}/server-sitemap.xml`,
    ],
  },
}
