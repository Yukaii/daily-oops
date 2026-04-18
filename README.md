# Daily Oops Website - The source code of [yukai.dev](https://yukai.dev)

## About

This is the source code of my blog [Daily Oops](https://yukai.dev), which is built on [Next.js](https://nextjs.org) and uses HackMD as a CMS(Content Management System).

You can read the details of how it actually works [here](https://yukai.dev/blog/2021/05/16/hackmd-as-cms-blog-feat-next-js) (in Chinese).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## HackMD configuration

This project now uses the official [`@hackmd/api`](https://github.com/hackmdio/api-client/tree/develop/nodejs) SDK for note reads.

- `HACKMD_ACCESS_TOKEN` is required for builds and local development that fetch notes.
- `HACKMD_API_BASEURL` is optional and defaults to `https://api.hackmd.io/v1`.
- `HACKMD_BASEURL` is optional and defaults to `https://hackmd.io` for public links.
