import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

export const authOptions: NextAuthOptions = {
  session: {
    maxAge: 60 * 60 * 2
  },
  jwt: {
    maxAge: 60 * 60 * 2
  },
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { username, password } = credentials ?? {}
        if (!username || !password) {
          throw new Error('Falta nombre de usuario o contraseña')
        }

        const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL
        if (!graphqlUrl) {
          throw new Error(
            'The NEXT_PUBLIC_GRAPHQL environment variable is not defined'
          )
        }
        const response = await axios.post(graphqlUrl, {
          query: `
          mutation Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              token
              user {
                id
              }
            }
          }
    `,
          variables: {
            username: username,
            password: password
          }
        })

        const data = response.data

        if (data.errors) {
          throw new Error('Error en la autenticación', data.errors)
        }
        if (data.data.login) {
          return {
            id: data.data.login.user.id,
            accessToken: data.data.login.token
          }
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    }
  }
}
