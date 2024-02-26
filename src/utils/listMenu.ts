import { signOut } from 'next-auth/react'

export const listadomenu = [
  {
    key: 'home',
    label: 'Inicio',
    href: '/home'
  },
  {
    key: 'addproduct',
    label: 'Productos',
    href: '/producto'
  },
  {
    key: 'addcategory',
    label: 'Categorías',
    href: '/categoria'
  },
  // {
  //   key: 'addcategory',
  //   label: 'Subcategorías',
  //   href: '/subcategoria'
  // },
  // {
  //   key: 'addlist',
  //   label: 'Listados',
  //   href: '/listado'
  // },
  // {
  //   key: 'addprice',
  //   label: 'Precios',
  //   href: '/precio'
  // },
  // {
  //   key: 'addasesor',
  //   label: 'Asesor',
  //   href: '/asesor'
  // },
  {
    key: 'ayuda',
    label: 'Como funciona',
    href: '/funcionamiento',
    icon: `<svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    viewBox='0 0 24 24'
  >
    <path
      fill='currentColor'
      d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m-1-5h2v2h-2zm2-1.645V14h-2v-1.5a1 1 0 0 1 1-1a1.5 1.5 0 1 0-1.471-1.794l-1.962-.393A3.501 3.501 0 1 1 13 13.355'
    />
  </svg>`
  }
]

export const dropdownItems = [
  {
    key: 'configurations',
    ariaLabel: 'configuraciones',
    href: '/settings',
    color: 'default',
    className: 'text-sm',
    label: 'Configuraciones'
  },
  {
    key: 'funcionamiento',
    ariaLabel: 'funcionamiento',
    href: '/funcionamiento',
    color: 'default',
    className: 'text-sm',
    label: 'Ayuda & Feedback'
  },
  {
    key: 'logout',
    ariaLabel: 'cerrar sesion',
    href: '/',
    color: 'danger',
    className: 'text-danger',
    label: 'Cerrar sesión',
    onPress: () => signOut({ callbackUrl: '/' })
  }
]

export const listadomenuPUBLIC = [
  {
    key: 'ayuda',
    label: 'Ayuda & Feedback',
    href: '/ayuda'
  },
  {
    key: 'contacto',
    label: 'Contactar con HarkaySoft',
    href: '/contacto'
  }
]
