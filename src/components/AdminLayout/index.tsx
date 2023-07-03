import React, { ReactNode } from 'react'
import * as Component from '@/components';
import { Inter } from 'next/font/google';
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';
import { PiSignInBold, PiSignOutBold } from 'react-icons/pi';
import { BsFillHandbagFill } from 'react-icons/bs';
import { IconType } from 'react-icons/lib';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
const inter = Inter({
    subsets: ["latin"]
})
type LayoutProps = {
    children: ReactNode
}

interface LinkMenu {
    name: string;
    href: string;
    icon: IconType
}
const linkMenu: LinkMenu[] = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: AiOutlineDashboard
    },
    {
        name: "Users",
        href: "/admin/user-profile",
        icon: AiOutlineUser
    },
    {
        name: "Products",
        href: "/admin/products",
        icon: BsFillHandbagFill
    },
    {
        name: "Sign Out",
        href: "/auth/signin",
        icon: PiSignOutBold
    },

]
const AdminLayout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    const route = useRouter()
    const [active, setActive] = React.useState<LinkMenu>(linkMenu.find(item => item.href === route.pathname)!)

    return (
        <div className={inter.className}>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" aria-hidden="true" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {linkMenu.map((item: LinkMenu, idx: number) => {
                            return (
                                <li key={item.name} onClick={() => {
                                    if (item.name.replace(/\s/g,"").toLowerCase() === 'signout') {
                                        return signOut({ redirect: true })
                                    }
                                    setActive(item)
                                }}>
                                    <Link href={item.href} className={`${item === active ? 'bg-gray-200 text-violet-500' : ''} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}>
                                        <item.icon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                        <span className="ml-3">{item.name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <div className="p-12 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {children}
                </div>
            </div>

        </div>
    )
}

export default AdminLayout