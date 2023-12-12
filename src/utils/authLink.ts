import { setContext } from '@apollo/client/link/context'
import { getSession } from 'next-auth/react'

export const authLink = setContext(async (_, context) => {
  const session = await getSession()
  const modifiedHeader = {
    headers: {
      ...context.headers,
      Authorization: session?.user.accessToken
        ? `Bearer ${session?.user.accessToken}`
        : ''
    }
  }
  return modifiedHeader
})

export const isLogin = async () => {
  const session = await getSession()
  return !!session
}
