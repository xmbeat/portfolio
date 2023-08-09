import { useCallback, useEffect, useRef, useState } from "react";


export default function Cursor() {
  const mousePointer = useRef<HTMLDivElement>(null);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [mouseOut, setMouseOut] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false);
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (mousePointer.current){
      setTargetPosition({ x: event.clientX , y: event.clientY });
    }
  }, []);
  const handleMouseEnter = useCallback(()=>{
    setMouseOut(false)
  }, [])
  const handleMouseOut = useCallback((event:MouseEvent)=>{
    const toElement = (event as any).toElement
    if (toElement == null){
      setMouseOut(true)
    }
  }, [])
  const handleMouseDown = useCallback((event:MouseEvent) => {
  
    setIsMouseDown(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);
  useEffect(() => {
    document.body.style.cursor = "none"; // Ocultar el cursor por defecto
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener('mouseout', handleMouseOut)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.body.style.cursor = "auto";
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener('mouseout', handleMouseOut)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseOut, handleMouseEnter, handleMouseDown, handleMouseUp]);

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
		
      setCurrentPosition((prevPosition) => {
        const distanceX = targetPosition.x - prevPosition.x;
        const distanceY = targetPosition.y - prevPosition.y;
        const stepX = distanceX / 8;
        const stepY = distanceY / 8;

        const nextX = prevPosition.x + stepX;
        const nextY = prevPosition.y + stepY;

        return { x: nextX, y: nextY };
      });

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPosition]);

  return (
    <>
      <div
        ref={mousePointer}
        className={`${mouseOut?'opacity-0':''} z-50
									transition-opacity duration-500 fixed pointer-events-none cursor-none -translate-x-1/2 -translate-y-1/2 w-10 h-10 `}
        style={{ left: currentPosition.x, top: currentPosition.y }}
      >
        <div className={`${isMouseDown?'scale-0 opacity-100':'opacity-50'} rounded-full transition-scale duration-1000 w-full h-full bg-light-accent dark:bg-dark-accent`}></div>
      </div>
      <div className={`${mouseOut?'opacity-0':''} z-50 rounded-full fixed pointer-events-none cursor-none bg-light-text dark:bg-dark-text w-2 h-2 -translate-x-1/2 -translate-y-1/2`} style={{left: targetPosition.x, top: targetPosition.y}}>
      </div>
    </>
  );
}
