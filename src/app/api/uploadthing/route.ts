import { createNextRouteHandler } from 'uploadthing/next'

import { uploadRouter } from './core'

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: uploadRouter,
  config: {
    uploadthingId: process.env.UPLOADTHING_APP_ID,
    uploadthingSecret: process.env.UPLOADTHING_SECRET
  }
})
