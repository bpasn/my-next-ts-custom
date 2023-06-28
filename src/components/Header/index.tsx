import React from 'react'
import { NavBarComponent, NavMobileComponent } from '@/components'
import { FaBars } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
type Props = {}

const HeaderComponent: React.FunctionComponent<Props> = (props: Props) => {

    const [navMobile, setNavMobile] = React.useState<boolean>(false);

    return (
        <header className='mb-12 lg:mb-0 z-20 relative px-4 lg:px-0'
        data-aos="fade-down" data-aos-delay='1200' data-aos-duration='1000'
        >
            <div className='container mx-auto'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-x-[120px]'>
                        {/* Logo */}
                        <a href="#">
                            <img width={"40"} height={"40"} src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2048px-Tailwind_CSS_Logo.svg.png" alt="logo" />
                        </a>

                        {/* nav initially hidden - Only show on large screen */}

                        <div className="hidden lg:flex ">
                            <NavBarComponent />
                        </div>
                    </div>

                    {/* mobile nav initially hidden - Only show on large screen*/}
                    <div className={`${navMobile ? 'max-h-52' : 'max-h-0'} lg:hidden absolute top-24 bg-accent-tertiary w-full left-0 right-0 font-bold rounded transition-all overflow-hidden`}>
                        <NavMobileComponent />
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