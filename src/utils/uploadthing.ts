import { generateReactHelpers } from '@uploadthing/react/hooks'
import { generateUploadDropzone } from '@uploadthing/react'

import type { OurFileRouter } from '@api/uploadthing/core'

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>()

export const UploadButton = generateUploadDropzone<OurFileRouter>()
