import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  return (
    <>
      <Head>
        <title>Nextjs template</title>
        <meta
          name='description'
          content='Template of next.js with tailwindcss'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <h1>Hello! Next.js</h1>
        <Image
          src='/vercel.svg'
          alt='Vercel Logo'
          className='mx-auto'
          width={100}
          height={24}
          priority
        />
        <h3>with tailwindcss</h3>
      </main>
    </>
  )
}
