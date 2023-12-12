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
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials ?? {}
        if (!email || !password) {
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
      mutation Login($loginEmail: String!, $loginPassword: String!) {
        login(email: $loginEmail, password: $loginPassword) {
          token
          user {
            id
            name
            email
          }
        }
      }
    `,
          variables: {
            loginEmail: email,
            loginPassword: password
          }
        })

        const data = response.data

        if (data.errors) {
          throw new Error('Error en la autenticación', data.errors)
        }
        if (data.data.login) {
          return {
            email: data.data.login.user.email,
            name: data.data.login.user.name,
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
