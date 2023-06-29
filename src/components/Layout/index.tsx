'use client';
import React from 'react';
import * as Component from '@/components'
import Aos from 'aos';
import "aos/dist/aos.css";
import { signOut, useSession } from 'next-auth/react';
import useAxioshook from '@/hook/axiosHook';

type LayoutProps = {
    children: React.ReactNode
}

const RootLayout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    const session = useSession();
    const axiosHook = useAxioshook()
    React.useEffect(() => {
        Aos.init({
            duration: 1800,
            offset: 0
        })
    }, [Aos])
    return (
        <div className="overflow-hiden py-12">
            {session?.data?.error && <Component.TailwindDialog show title={session.status} messageBody={session.data.error}
                callback={() => signOut({
                    redirect: true
                })}
            />}
            <Component.Header />

            <div className="h-[100vh]">
                {children}
            </div>

            <Component.FooterComponent />
            {/*<Component.HeroComponent />
            <Component.AboutComponent />
            <Component.FeaturesComponent />
            <Component.TestimonailsComponent /> */}
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