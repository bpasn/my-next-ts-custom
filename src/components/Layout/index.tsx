import React from 'react';
import * as Component from '@/components'
import Aos from 'aos';
import "aos/dist/aos.css";

type LayoutProps = {
    children: React.ReactNode
}

const RootLayout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    React.useEffect(() => {
        Aos.init({
            duration: 1800,
            offset: 0
        })
    }, [Aos])
    return (
        <div className="overflow-hidden">
            <Component.HeroComponent />
            <Component.AboutComponent />
            <Component.FeaturesComponent />
        </div>

    )
}

export default RootLayout

{/*<div className="text-center flex flex-col text-color-gray" style={{
            minHeight: "100vh",
            color: "#000133"
        }}>
             <HeaderComponent />
            <div className="flex flex-1">
                <div className='p-5 w-screen'>
                    {children}
                </div>
            </div>
            <FooterComponent /> 
        </div>*/}