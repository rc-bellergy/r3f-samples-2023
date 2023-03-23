import { Inter } from 'next/font/google'
import PageHead from '../components/PageHead.js'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  return (
    <>
      <PageHead 
        title='Home' 
        description='Home page of React Three Fiber (R3F) Samples'
      />
      <main className={styles.main}>
        <h1>Template of nextjs 13</h1>
        <h3>with tailwindcss 3.2</h3>
      </main>
    </>
  )
}
