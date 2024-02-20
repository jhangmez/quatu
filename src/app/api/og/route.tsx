import { ImageResponse } from 'next/og'
// App router includes @vercel/og.
// No need to install it.

export const runtime = 'edge'

export async function GET(request: Request) {
  const fontData = await fetch(
    new URL('/public/font/LexendDeca-Bold.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())
  try {
    const { searchParams } = new URL(request.url)

    const hasTitle = searchParams.has('title')
    const title = hasTitle
      ? searchParams.get('title')?.slice(0, 100)
      : 'Título por defecto'

    const hasDescription = searchParams.has('description')
    const description = hasDescription
      ? searchParams.get('description')?.slice(0, 100)
      : 'Descripción por defecto'

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '-.02em',
            fontWeight: 700,
            background: '#e0e0ff'
          }}
        >
          <div
            style={{
              left: 42,
              top: 42,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='64'
              height='64'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M4 6V4h16v2zm0 14v-6H3v-2l1-5h16l1 5v2h-1v6h-2v-6h-4v6zm2-2h6v-4H6z'
              />
            </svg>
            <span
              style={{
                marginLeft: 8,
                fontSize: 48
              }}
            >
              quatu
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '20px 50px',
              margin: '0 42px',
              fontSize: 64,
              width: 'auto',
              maxWidth: 700,
              textAlign: 'center',
              backgroundColor: '#00006e',
              color: '#FFFFFF',
              lineHeight: 1.4
            }}
          >
            {title}
          </div>
          <div
            style={{
              left: 42,
              top: 480,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              fontSize: 32
            }}
          >
            {description}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'LexendDeca',
            data: fontData,
            style: 'normal'
          }
        ]
      }
    )
  } catch (e: any) {
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}
