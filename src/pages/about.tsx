
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
  return <>Hola mundo</>
}
