
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Hero from '@/components/sections/Hero'

export async function getStaticProps({locale}:{ locale:any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
    },
  }
}
export default function Home() {
  return <Hero/>
}
