import { Spinner } from '@nextui-org/spinner'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className='min-w-screen min-h-screen'>
      <div className='flex flex-col justify-center items-center h-screen  bg-light-surface dark:bg-dark-surface'>
        <section className='w-fit h-14 justify-start items-center gap-[5px] inline-flex'>
          <div>
            <span className='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'>
              Harkay
              <span className='text-2xl text-[0.8em] font-normal'>
                {' '}
                S O F T
              </span>
            </span>
          </div>
        </section>
        <div className='container flex flex-col items-center'>
          <Spinner color='default' />
          <p className='text-light-onBackground dark:text-dark-onBackground mt-4'>
            Cargando página...
          </p>
        </div>
      </div>
    </main>
  )
}
