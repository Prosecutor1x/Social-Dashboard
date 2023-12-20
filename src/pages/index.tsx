import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center ${inter.className}`}
    >
      <div>
        <h1 className='font-monsterrat typewriter h1 ' >Welcome to the Dashboard</h1>
      </div>
    </main>
  )
}
