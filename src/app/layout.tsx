import './globals.css'
import type { Metadata } from 'next'
import { Inter, Ubuntu_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const ubuntuMono = Ubuntu_Mono({ subsets: ['latin'], weight: '400', variable: '--font-ubuntu' })

export const metadata: Metadata = {
  title: 'ASK SQL',
  description:
    'Já pensou em ter as queries necessárias em um instante? Então chegou o momento, usando a inteligência artificial do GPT 3.5 turbo você pode obter a solução do seu problema em apenas alguns instates, não deixe de conferir, e use com moderação!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" className={`${inter.variable} ${ubuntuMono.variable}`}>
      <head>
        <link rel="icon" href="./favicon.ico" />
      </head>
      <body className="bg-blueberry-900 min-h-screen">{children}</body>
    </html>
  )
}
