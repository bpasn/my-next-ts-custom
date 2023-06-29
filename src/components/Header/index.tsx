import React, { useEffect } from 'react'
import { NavBarComponent, NavMobileComponent } from '@/components'
import { FaBars } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
type Props = {}

const HeaderComponent: React.FunctionComponent<Props> = (props: Props) => {
    const session = useSession();
    const [scrollY, setScrollY] = React.useState(0);
    const [opacity,setOpacity] = React.useState(0.0);
    const maxOpacity = 0.01;
    const offset = 0.0
    const [navMobile, setNavMobile] = React.useState<boolean>(false);
    useEffect(() => {
        const handleScrool = () => {
            
            if(scrollY >= offset && scrollY > 145 ){
                setOpacity(Number((opacity + maxOpacity).toFixed(2)))
                if(opacity >= 0.12){
                    setOpacity(1)
                }
            }else if(scrollY < 145){
                setOpacity(Number((opacity - maxOpacity).toFixed(2)))
                if(opacity <= 1.0){
                    setOpacity(0.0)
                }
            }
            setScrollY(window.scrollY)
        }

        // just trigger this so that the initial state
        // is updated as soon as the component is mounted
        handleScrool()
        window.addEventListener("scroll", handleScrool)
        return () => {
            window.removeEventListener("scroll", handleScrool)
        }
    }, [])
    return (
        // relative sticky top-0
        <header
            data-te-navbar-ref

            className='flex-no-wrap relative flex w-full items-center justify-between lg:flex-wrap lg:justify-start mb-12 lg:mb-0 z-20 px-4 lg:px-0'
            data-aos="fade-down" data-aos-delay='1200' data-aos-duration='1000'
        >
            <div className='container mx-auto '>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-[120px]'>
                        {/* Logo */}
                        <a href="#">
                            <img width={"40"} height={"40"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png" alt="logo" />
                        </a>

                        {/* nav initially hidden - Only show on large screen */}

                        <div className="hidden lg:flex ">
                            <NavBarComponent session={session.data as Session}/>
                        </div>
                    </div>

                    {/* mobile nav initially hidden - Only show on large screen*/}
                    <div className={`${navMobile ? 'max-h-52' : 'max-h-0'} lg:hidden absolute top-24 bg-accent-tertiary w-full left-0 right-0 font-bold rounded transition-all overflow-hidden`}>
                        <NavMobileComponent session={session.data as Session}/>
                    </div>

                    {/* Button */}
                    <button className='btn btn-quaternary flex items-center gap-x-[20px] group ' >
                        Request Demo<BsArrowRight className="text-1xl text-accent-primary group-hover:text-white transition" />
                    </button>

                    {/* Nav Trigger Button - Onlu shoes on mobile views */}
                    <div className="lg:hidden text-2xl text-primary cursor-pointer" onClick={() => setNavMobile(!navMobile)}>
                        <FaBars />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderComponent