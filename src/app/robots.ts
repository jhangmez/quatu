import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/categoria',
        '/funcionamiento',
        '/home',
        '/listado',
        '/precio',
        '/producto',
        '/settings',
        '/subcategoria',
        '/api/'
      ]
    },
    sitemap: 'https://quatu.vercel.app/sitemap.xml'
  }
}
