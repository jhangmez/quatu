import { NextResponse } from 'next/server'
import { useMutation } from '@apollo/client'
import axios from 'axios'

export async function POST(req: Request) {
  const { email, password, name } = await req.json()

  const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL
  if (!graphqlUrl) {
    throw new Error(
      'The NEXT_PUBLIC_GRAPHQL environment variable is not defined'
    )
  }

  const response = await axios.post(graphqlUrl, {
    query: `
    mutation Mutation($email: String!, $password: String!, $name: String, $bio: String) {
      signup(email: $email, password: $password, name: $name) {
        token
      }
      addProfileForUser(
        userUniqueInput: {
          email: $email
        }
        bio: $bio
      ) {
        bio
      }
      }
    `,
    variables: {
      email: email,
      password: password,
      name: name
    }
  })

  const user = response.data
  if (user.errors) {
    return NextResponse.json({ error: 'El usuario ya existe' }, { status: 400 })
  }

  return NextResponse.json(user)
}
