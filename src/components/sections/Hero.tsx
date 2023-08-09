import Image from "next/image";
import { motion} from 'framer-motion'
import MainButton from "../MainButton";
import { FaArrowRight} from 'react-icons/fa';
import { useTranslation } from 'next-i18next'
import { Typewriter } from "react-simple-typewriter";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Hero() { 
  const {t} = useTranslation('common')
  const [height, setHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    if (containerRef.current){
      const resizeObserver = new ResizeObserver((entries) => {
        const observedHeight = entries[0].contentRect.height
        setHeight(observedHeight)
      })
      const h = containerRef.current.clientHeight
      setHeight(h)

      resizeObserver.observe(containerRef.current)

      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [])
  return <motion.section
    initial={{height: 0}} 
    whileInView={{height}}
    transition={{ ease:'anticipate', duration: 1.2}}
    className="w-full relative overflow-hidden">
    <motion.div 
      ref={containerRef}
      transition={{ ease:'anticipate', duration: 1.2}}
      initial={{y: 100, opacity: 0.8}}
      animate={{y: 0, opacity: 1}}
      className="relative w-full lg:h-screen">
      <div className="bg-light-accent dark:bg-dark-accent transition-all duration-300  absolute
        -top-1/2 h-[60%] w-[200%] -rotate-[20deg] -translate-x-1/2 left-1/2
        lg:h-[200vh] lg:w-[50vw] lg:-top/2 lg:-rotate-12 lg:left-0 lg:-translate-x-1/2
        ">
      </div>
      <div className="flex flex-col gap-8 items-center lg:flex-row h-full relative p-10">
        <div className="w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] lg:w-[40%] lg:h-full lg:max-w-none lg:pb-0
          rounded-full overflow-hidden lg:rounded-none border-4 lg:border-none border-light-navbar-item  dark:border-dark-navbar-item">
          <div className="w-full h-full shadow-card relative bg-light-page dark:bg-dark-page overflow-hidden rounded-2xl">
            <Image src={'/dark.jpg'} alt="Dev image" style={{objectFit:'cover'}} 
              priority fill={true} 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"></Image>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center grow">
          <div className="w-full max-w-lg lg:p-10 text-center lg:text-left">
            <h1 className="text-4xl uppercase font-bold tracking-wider ">
              <span className="block text-light-accent dark:text-dark-accent mix-blend-multiply">Juan Hebert Chable</span> 
              <Typewriter typeSpeed={200} delaySpeed={1000} cursorBlinking={true} cursor={true} loop={1} words={['Frontend', 'Backend', 'Devops', 'Fullstack']} /></h1>
            <p className="my-4 leading-8 mix-blend-color-burn dark:mix-blend-normal">
              {t('introduction')}
            </p>
            <MainButton icon={<FaArrowRight/>} href='/about'>{t('more-about-me')}</MainButton>
          </div>
        </div>
      </div>
    </motion.div>
   
  </motion.section>
}