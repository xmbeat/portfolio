import MainLayout from '@/components/layouts/MainLayout'
import '@/styles/globals.css'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

const app = function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider attribute='class'>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </ThemeProvider>
}

export default appWithTranslation(app)