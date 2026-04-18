export const LOCALES = ['en', 'zh-TW'] as const

export type AppLocale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = 'en'

type Messages = {
  htmlLang: string
  openGraphLocale: string
  siteDescription: string
  languageSwitch: string
  languageNames: Record<AppLocale, string>
  themeToggle: string
  nav: {
    home: string
    blog: string
    projects: string
    about: string
    more: string
  }
  home: {
    greeting: string
    description: string
    signoff: string
    recentPosts: string
    morePosts: string
    subscribeViaRss: string
    introBeforeBlog: string
    introBlog: string
    introBetweenBlogAndProjects: string
    introProjects: string
    introBetweenProjectsAndAbout: string
    introAbout: string
    introAfterAbout: string
  }
  pages: {
    aboutTitle: string
    blogTitle: string
    projectsTitle: string
  }
  aboutMarkdown: string
  projectsAnnouncement: string
  postRow: {
    unreadLabel: string
    postedOn: (postNumber: number, date: string) => string
  }
  post: {
    coverImageAlt: string
    publishedWithLabel: string
    giscusLang: string
  }
}

const messages: Record<AppLocale, Messages> = {
  en: {
    htmlLang: 'en',
    openGraphLocale: 'en_US',
    siteDescription: "Yukai's blog. Web tech, apps, photos, and notes.",
    languageSwitch: 'Language',
    languageNames: {
      en: 'EN',
      'zh-TW': '中',
    },
    themeToggle: 'Toggle color theme',
    nav: {
      home: 'Home',
      blog: 'Blog',
      projects: 'Projects',
      about: 'About',
      more: 'More',
    },
    home: {
      greeting: 'Hi',
      description: "This is Yukai Huang's personal website.",
      signoff: 'Enjoy!',
      recentPosts: 'Recent posts',
      morePosts: 'More posts',
      subscribeViaRss: 'Subscribe via RSS',
      introBeforeBlog: 'Here you can read my ',
      introBlog: 'recent posts',
      introBetweenBlogAndProjects: ', play with ',
      introProjects: 'side projects',
      introBetweenProjectsAndAbout: ', or ',
      introAbout: 'get to know me more',
      introAfterAbout: '.',
    },
    pages: {
      aboutTitle: 'About me',
      blogTitle: 'Blog',
      projectsTitle: 'Projects',
    },
    aboutMarkdown: `# About me

Hello there, this is Yukai Huang.

I'm an editor maniac, an indie software developer, and a jazz enthusiast.

Co-founded <a href="https://hackmd.io" target="_blank" rel="noreferrer noopener">HackMD</a>, working as a full time developer based in Taiwan.

Love making [side projects](/projects) and exploring [new ideas](https://github.com/users/Yukaii/projects/1).

You can find me on <a href="https://github.com/Yukaii" target="_blank" rel="noreferrer noopener">GitHub</a> and <a href="https://twitter.com/yukaii_h" target="_blank" rel="noreferrer noopener">Twitter</a>.`,
    projectsAnnouncement: `# Projects

Here are some of the projects that I've worked on.

For older projects, please visit my [GitHub](https://github.com/Yukaii), or take a look [here](./oldProjects).`,
    postRow: {
      unreadLabel: "You haven't read this article yet.",
      postedOn: (postNumber, date) => `#${postNumber} posted on ${date}`,
    },
    post: {
      coverImageAlt: 'cover image',
      publishedWithLabel: 'published with',
      giscusLang: 'en',
    },
  },
  'zh-TW': {
    htmlLang: 'zh-TW',
    openGraphLocale: 'zh_TW',
    siteDescription: 'Yukai 的部落格。網頁技術、應用程式、照片與筆記。',
    languageSwitch: '語言',
    languageNames: {
      en: 'EN',
      'zh-TW': '中',
    },
    themeToggle: '切換佈景主題',
    nav: {
      home: '首頁',
      blog: '文章',
      projects: '專案',
      about: '關於',
      more: '更多',
    },
    home: {
      greeting: '哈囉',
      description: '這裡是 Yukai Huang 的個人網站。',
      signoff: '安久吧！',
      recentPosts: '最新文章',
      morePosts: '更多文章',
      subscribeViaRss: '透過 RSS 訂閱',
      introBeforeBlog: '你可以在這裡看看我的 ',
      introBlog: '最新文章',
      introBetweenBlogAndProjects: '、玩玩我做過的 ',
      introProjects: 'side projects',
      introBetweenProjectsAndAbout: '，或是 ',
      introAbout: '更認識我一些',
      introAfterAbout: '。',
    },
    pages: {
      aboutTitle: '關於我',
      blogTitle: '文章',
      projectsTitle: '專案',
    },
    aboutMarkdown: `# 關於我

你好，我是 Yukai Huang。

我是個編輯器狂熱者、獨立軟體開發者，也是爵士樂愛好者。

我是 <a href="https://hackmd.io" target="_blank" rel="noreferrer noopener">HackMD</a> 共同創辦人，目前在台灣擔任全職開發者。

喜歡做 [side projects](/projects)，也喜歡探索[新點子](https://github.com/users/Yukaii/projects/1)。

你可以在 <a href="https://github.com/Yukaii" target="_blank" rel="noreferrer noopener">GitHub</a> 和 <a href="https://twitter.com/yukaii_h" target="_blank" rel="noreferrer noopener">Twitter</a> 找到我。`,
    projectsAnnouncement: `# 專案

這裡整理了我做過的一些專案。

如果想看更早期的作品，請到 [GitHub](https://github.com/Yukaii)，或看看 [這裡](./oldProjects)。`,
    postRow: {
      unreadLabel: '你還沒讀過這篇文章。',
      postedOn: (postNumber, date) => `#${postNumber} 發佈於 ${date}`,
    },
    post: {
      coverImageAlt: '文章封面',
      publishedWithLabel: '發佈於',
      giscusLang: 'zh-TW',
    },
  },
}

export function normalizeLocale(locale?: string): AppLocale {
  return locale === 'zh-TW' ? 'zh-TW' : DEFAULT_LOCALE
}

export function getMessages(locale?: string): Messages {
  return messages[normalizeLocale(locale)]
}

export function getAlternateOpenGraphLocales(locale?: string): string[] {
  const currentLocale = normalizeLocale(locale)

  return LOCALES.filter((value) => value !== currentLocale).map(
    (value) => messages[value].openGraphLocale,
  )
}

export function getDayjsLocale(locale?: string): string {
  return normalizeLocale(locale) === 'zh-TW' ? 'zh-tw' : 'en'
}

export function getLocalizedPath(path: string, locale?: string): string {
  const currentLocale = normalizeLocale(locale)

  if (currentLocale === DEFAULT_LOCALE) {
    return path
  }

  return path === '/' ? `/${currentLocale}` : `/${currentLocale}${path}`
}
