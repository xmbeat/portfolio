
import { useCallback, useEffect, useRef, useState } from "react";
import Cursor from "../Cursor";
import { Inter, Poppins } from 'next/font/google'
import Link from "next/link";
import { FaHome, FaUser, FaBriefcase, FaEnvelopeOpen, FaBox, FaGlobe} from "react-icons/fa";
import {RiSettings4Fill} from 'react-icons/ri'
import { useRouter } from "next/router";
import CircularProgressBar from '../CircularProgress';
import { useTranslation } from "next-i18next";
import Popup from '../Popup'; 
import InlineOptions from "../InlineOptions";
import { useTheme } from "next-themes";

const poppins = Poppins({ weight: ['400', '500', '700', '900'], style: ['italic', 'normal'],preload: true, subsets:['latin']})

export type MainLayoutProps = {
  children: any;
};

const navList = [{
  icon: <FaHome/>,
  title: 'home',
  href: '/'
}, {
  icon: <FaUser/>,
  title: 'about',
  href: '/about'

}, {
  icon: <FaBriefcase/>,
  title: 'portfolio',
  href: '/portfolio'
}, {
  icon: <FaEnvelopeOpen/>,
  title: 'contact',
  href: '/contact'
}, {
  icon: <FaBox/>,
  title: 'extra',
  href: '/extra'
}]
export default function MainLayout(props: MainLayoutProps) {
  const router = useRouter()
  const [scrollProgress, setScrollProgress] = useState(0);
  const {t, i18n} = useTranslation('common')
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const themes = useTheme()
  const languages = [{
    code:'en',
    name: 'English'
  }, {
    code: 'es',
    name: 'Spanish'
  }]

  
  useEffect(()=>{
  }, [router.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0){
        setScrollProgress(scrollPosition / maxScroll)
      }
      else{
        setScrollProgress(1)
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll()
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavbarClick = useCallback((item:any, event:React.MouseEvent<HTMLAnchorElement>)=>{
    if (item.href === router.pathname){
      event.preventDefault()
      window.scrollTo({top: 0})
    }
  }, [router.pathname])

  const handleLanguageChange= (index:number)=>{
    router.push(router.asPath, router.asPath, {
      locale: languages[index].code,
      scroll: false
    })
  }

  return (
    <section className={`${poppins.className} text-light-text dark:text-dark-text tracking-wider`}>
      <Cursor/>
      <div className="pb-12 md:pb-0 overflow-hidden bg-light-page dark:bg-dark-page">
        {props.children}
      </div>
      <div className="bottom-0 fixed left-0 w-full h-12 bg-light-navbar dark:bg-dark-navbar md:bg-transparent md:shadow-none shadow-card md:h-fit md:w-fit md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:-translate-y-1/2">
        <ul className="flex items-center h-full justify-center md:flex-col md:gap-4">
          {navList.map((item)=>(<li className="w-full flex items-center justify-center md:justify-end" key={item.href}>
            <Link onClick={(event)=>handleNavbarClick(item, event)}
              className={`
                relative flex rounded-full items-center group`} 
              href={item.href}>
              <div className='absolute tracking-wide rounded-l-full right-5 uppercase translate-x-5 whitespace-nowrap h-full hidden px-8 opacity-0 transition-all duration-300
                md:flex md:items-center 
                dark:group-hover:text-dark-button-text 
                dark:group-hover:bg-dark-accent
                group-hover:opacity-100 
                group-hover:bg-light-accent 
                group-hover:text-light-button-text
                group-hover:translate-x-0'>
                {t(item.title)}
              </div>
              <div className={`w-10 h-10 ${router.pathname === item.href?'bg-light-button dark:bg-dark-button text-light-button-text dark:text-dark-button-text':'bg-light-navbar-item dark:bg-dark-navbar-item'} 
                flex items-center justify-center relative group-hover:text-light-button-text group-hover:bg-light-button dark:group-hover:bg-dark-button rounded-full transition-all duration-300`}>
                {item.icon}
              </div>
              {router.pathname === item.href && <div className='absolute inset-0 group-hover:opacity-0 transition-opacity duration-300 '>
                <CircularProgressBar progress={scrollProgress}></CircularProgressBar>
              </div>}
            </Link>
          </li>))}
        </ul>
      </div>
      <div className={`fixed right-4 top-4`}>
        <div onClick={()=>setIsMenuVisible(!isMenuVisible)} 
          className={`flex items-center justify-center rounded-full duration-300 transition-all right-4 top-4 w-10 h-10 shadow-lg
            bg-light-navbar-item hover:bg-light-navbar-item-hover 
            dark:bg-dark-navbar-item dark:hover:bg-dark-navbar-item-hover
              ${isMenuVisible?'rotate-90':''}`}>
          <RiSettings4Fill/>
        </div>
        <Popup isOpen={isMenuVisible} onClose={()=>setIsMenuVisible(false)} desiredWidth="fit-content" margin="0.5em">
          <div className="w-full text-sm bg-light-menu-item dark:bg-dark-menu-item shadow-card rounded-xl overflow-hidden py-2">
            <div className="hover:bg-light-menu-item-hover transition-background duration-300
            dark:hover:bg-dark-menu-item-hover
            h-10 flex items-center px-4 gap-4 overflow-hidden whitespace-nowrap">
              <span className="w-full">{t('language')}</span>
              <InlineOptions
                className="min-w-fit"
                options={languages.map(lang=>lang.code)} 
                selected={languages.findIndex((lang, index)=>{
                  return lang.code === i18n.language
                })} 
                onChange={(index)=>handleLanguageChange(index)} />
            </div>
            <div className="hover:bg-light-menu-item-hover 
            dark:hover:bg-dark-menu-item-hover
            h-10 flex items-center px-4 gap-4 overflow-hidden whitespace-nowrap"> 
              <span className="w-full">{t('theme')}</span>
              <InlineOptions
                className="min-w-fit"
                options={themes.themes} 
                selected={themes.themes.findIndex(theme=>theme === themes.theme)} 
                onChange={(index)=>themes.setTheme(themes.themes[index]) } />
            </div>
          </div>
        </Popup>
      </div>
   
    </section>
  );
}
