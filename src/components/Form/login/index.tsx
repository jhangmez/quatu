'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import { Input } from '@nextui-org/input'
import Link from 'next/link'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  return (
    <form
      className='flex flex-col space-y-4 px-2 py-8 sm:px-2'
      onSubmit={(e) => {
        e.preventDefault()
        setLoading(true)
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
      }}
    >
      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 flex-col'>
        <label
          htmlFor='email'
          className='block text-xs text-light-onSurface dark:text-dark-onSurface uppercase'
        >
          Correo electrónico
        </label>
        <Input
          id='email'
          name='email'
          size='sm'
          isRequired
          type='email'
          autoComplete='email'
          placeholder='correo@ejemplo.com'
          endContent={
            <Icon
              icon='mdi:email'
              width='28'
              height='28'
              className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
            />
          }
        />
      </div>
      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-2 flex-col'>
        <label
          htmlFor='password'
          className='block text-xs text-light-onSurface dark:text-dark-onSurface uppercase'
        >
          Contraseña
        </label>
        <Input
          id='password'
          name='password'
          size='sm'
          required
          placeholder='Escribe tu contraseña'
          // errorMessage='Escriba su contraseña'
          endContent={
            <button
              className='focus:outline-none'
              type='button'
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <Icon
                  icon='mdi:eye'
                  width='28'
                  height='28'
                  className='text-2xl text-default-400 pointer-events-none'
                />
              ) : (
                <Icon
                  icon='mdi:eye-closed'
                  width='28'
                  height='28'
                  className='text-2xl text-default-400 pointer-events-none'
                />
              )}
            </button>
          }
          type={isVisible ? 'text' : 'password'}
        />
      </div>
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
              color='#41484f'
            />
          ) : (
            <div className='self-stretch grow  shrink basis-0 pl-4 pr-6 py-2.5 justify-center items-center  inline-flex'>
              Ingresar
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
                Ingresar con Google
              </div>
            </div>
          )}
        </button>
      </div>
    </form>
  )
}
