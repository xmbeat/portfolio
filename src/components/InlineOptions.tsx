import { ReactNode, useId } from "react"
import {motion} from 'framer-motion'
interface InlineOptionsProps{
  className?: string
  options: ReactNode[],
  selected:number,
  onChange?: (index:number)=>void
}
export default function InlineOptions(props: InlineOptionsProps) {
  const layoutId = useId()
  return <div className={`${props.className} flex bg-light-navbar dark:bg-dark-menu-item-hover rounded-md overflow-hidden shadow-inner-custom`}>
    {props.options.map((item, index)=>
      <div key={index} className={`cursor-pointer px-4 relative py-1`} onClick={()=>{if (props.onChange){
        props.onChange(index)
      }}}> 
        {index === props.selected?<motion.div className="inset-0 absolute shadow-xl bg-light-button dark:bg-dark-button rounded-md" layoutId={layoutId}></motion.div>:null}
        <div className={`relative ${index === props.selected?'text-light-button-text dark:text-light-button-text':''}`}>
          {item}
        </div>
      </div>)}
  </div>
}