import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing({
  /**
   * Log out more information about the error, but don't return it to the client
   * @see https://docs.uploadthing.com/errors#error-formatting
   */
  errorFormatter: (err) => {
    console.log('Error al subir el archivo', err.message)
    console.log('  - Fue causado por:', err.cause)

    return { message: err.message }
  }
})

const auth = (req: Request) => ({ id: 'fakeId' }) // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1
    }
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth(req)

      // If you throw, the user will not be able to upload
      if (!user) throw new Error('No autorizado')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url', file.url)
      console.log('file by', file.name)
      console.log('file size', file.size)
      console.log('file key', file.key)

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId }
    }),

  withoutMdwr: f({
    image: {
      maxFileCount: 2,
      maxFileSize: '16MB'
    }
  })
    .middleware(() => {
      return { testMetadata: 'lol' }
    })

    .onUploadComplete(({ metadata, file }) => {
      console.log('uploaded with the following metadata:', metadata)
      metadata

      console.log('files successfully uploaded:', file)
      file
      // ^?
    }),

  videoAndImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 4
    },
    video: {
      maxFileSize: '16MB'
    }
  })
    .middleware(async ({ req }) => {
      const user = await auth(req)

      // If you throw, the user will not be able to upload
      if (!user) throw new Error('Unauthorized')

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log('Upload complete for userId:', metadata.userId)

      console.log('file url', file.url)

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId }
    })
} satisfies FileRouter

export type OurFileRouter = typeof uploadRouter
