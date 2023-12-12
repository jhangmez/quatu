'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Filledbutton from '@Buttons/Filled'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'

export default function Form({ type }: { type: 'login' | 'register' }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setLoading(true)
        if (type === 'login') {
          signIn('credentials', {
            redirect: false,
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
            // @ts-ignore
          }).then(({ error }) => {
            if (error) {
              setLoading(false)
              toast.error(error)
            } else {
              router.refresh()
              router.push('/home')
            }
          })
        } else {
          fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: e.currentTarget.email.value,
              password: e.currentTarget.password.value
            })
          }).then(async (res) => {
            setLoading(false)
            if (res.status === 200) {
              toast.success(
                '¡Cuenta creada! Redirigiendo para iniciar sesión...'
              )
              setTimeout(() => {
                router.push('/login')
              }, 2000)
            } else {
              const { error } = await res.json()
              toast.error(error)
            }
          })
        }
      }}
      className='flex flex-col space-y-4 px-4 py-8 sm:px-16 bg-light-surface dark:bg-dark-surface'
    >
      <div>
        <label
          htmlFor='email'
          className='block text-xs text-light-onSurface dark:text-dark-onSurface uppercase'
        >
          Correo electrónico
        </label>
        <input
          id='email'
          name='email'
          type='email'
          placeholder='mail@email.com'
          autoComplete='email'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block text-xs text-light-onSurface dark:text-dark-onSurface uppercase'
        >
          Contraseña
        </label>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='*********'
          required
          className='mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm'
        />
      </div>

      {type === 'register' && (
        <div className='flex items-start mb-6'>
          <div className='flex items-center h-5'>
            <input
              id='remember'
              type='checkbox'
              value=''
              className='w-[18px] h-[18px] border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-light-primary dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800'
              required
            />
          </div>
          <label
            htmlFor='remember'
            className='ml-2 text-sm font-medium text-light-onSurface dark:text-dark-onSurface'
          >
            Estoy de acuerdo con los {''}
            <Link
              href='/'
              className='text-light-primary dark:text-dark-primary hover:underline '
            >
              términos y condiciones
            </Link>
            .
          </label>
        </div>
      )}

      <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />

      <div className='w-fill flex-col justify-center gap-5 items-center inline-flex'>
        <button
          disabled={loading}
          className={`${
            loading
              ? 'cursor-not-allowed border-light-outline border'
              : 'w-fit border-light-outline text-light-onPrimary hover:bg-dark-primary hover:text-dark-onPrimary'
          } min-w-[197px] w-fit h-10 bg-light-primary rounded-[100px] shadow flex-col justify-center items-center inline-flex`}
        >
          {loading ? (
            <Icon
              icon='eos-icons:bubble-loading'
              height={18}
              width={18}
              color='#86C6FF'
            />
          ) : (
            <div className='self-stretch grow  shrink basis-0 pl-4 pr-6 py-2.5 justify-center items-center  inline-flex'>
              {type === 'login' ? 'Ingresar' : 'Crear cuenta'}
            </div>
          )}
        </button>

        <button
          className={`${
            loading
              ? 'cursor-not-allowed border-light-outlineVariant dark:border-dark-outlineVariant'
              : 'w-fit border-light-outlineVariant dark:border-dark-outlineVariant bg-light-surface text-light-primary hover:bg-dark-surfaceVariant hover:text-dark-primary'
          } min-w-[197px] w-fit h-10 bg-light-surface hover:bg-light-surfaceVariant hover:text-dark-primary rounded-[100px] shadow flex-col justify-center items-center gap-2 inline-flex`}
        >
          {loading ? (
            <Icon
              icon='eos-icons:bubble-loading'
              height={18}
              width={18}
              color='#41484f'
            />
          ) : (
            <div className='self-stretch grow shrink basis-0 pl-4 pr-6 py-2.5 justify-center items-center gap-2 inline-flex'>
              <Icon icon='logos:google-icon' height={18} width={18} />
              <div className='text-center text-sm font-medium leading-tight tracking-tight'>
                {type === 'login'
                  ? 'Ingresar con Google'
                  : 'Crear cuenta con Google'}
              </div>
            </div>
          )}
        </button>
        {/* <Filledbutton label='Ingresar' /> */}
      </div>

      {type === 'login' ? (
        <p className='text-center text-sm text-light-onSurface dark:text-dark-onSurface'>
          No tienes cuenta? {''}
          <Link
            href='/register'
            className='font-semibold text-light-primary dark:text-dark-primary'
          >
            Crear una cuenta
          </Link>{' '}
          gratis.
        </p>
      ) : (
        <p className='text-center text-sm text-light-onSurface dark:text-dark-onSurface'>
          Ya tienes una cuenta?{' '}
          <Link
            href='/login'
            className='font-semibold text-light-primary dark:text-dark-primary'
          >
            Ingresar
          </Link>
        </p>
      )}
    </form>
  )
}
