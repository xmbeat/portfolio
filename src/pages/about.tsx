
import StarBackground from '@/components/backgrounds/StarBackground'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({locale}:{ locale:any }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common'
      ])),
    },
  }
}
export default function About() {
  return <div className='w-full h-screen'>
    <StarBackground 
      arms={3} 
      count={10000} 
      spiral={3} 
      coreXDistance={10} 
      coreYDistance={10} 
      outerCoreXDistance={20}
      outerCoreYDistance={20}
      thickness={5}
      armXDistance={50}
      armYDistance={25}
      armXMean={100}
      armYMean={50}
    />
  </div>
}
