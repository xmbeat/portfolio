import Link from "next/link";

export default function MainButton({children, icon, href}:{children:any, icon:any, href:string | null}) {
  const inner = <div className="shadow-md backdrop-blur-sm overflow-hidden group inline-flex font-bold text-sm border rounded-full relative border-light-button dark:border-dark-button text-light-text dark:text-dark-text items-center">
    <div className="absolute right-0 bg-light-button dark:bg-dark-button h-10 rounded-full w-10 group-hover:w-full transition-width duration-200">
    </div>
    <div className="relative uppercase px-4 ml-4 dark:group-hover:text-dark-button-text group-hover:text-light-button-text transition-color duration-300">
      {children}
    </div>
    <div className="text-light-button-text dark:text-dark-button-text relative w-10 h-10 rounded-full bg-light-button dark:bg-dark-button flex items-center justify-center">
      {icon}
    </div>
  </div>
  return href?<Link href={href}>{inner}</Link>:<button>{inner}</button>
}