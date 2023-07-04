import React, { ReactNode } from 'react'
import * as Component from '@/components';
import { Inter } from 'next/font/google';
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai';
import { PiSignInBold, PiSignOutBold } from 'react-icons/pi';
import { BsFillHandbagFill, BsFillCartCheckFill } from 'react-icons/bs';
import { IoBagAdd } from 'react-icons/io5';
import { IconType } from 'react-icons/lib';
import { BiCategory, BiSolidCategory } from 'react-icons/bi'
import { FaProductHunt } from 'react-icons/fa'
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
    icon: IconType;
    subMenu?: LinkMenu[]
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
        name: "E-Commerce",
        href: "/admin/products",
        icon: BsFillCartCheckFill,
        subMenu: [
            {
                name: "Products",
                href: "/admin/products",
                icon: FaProductHunt,
                subMenu: [
                    {
                        name: "Products",
                        href: "/admin/products",
                        icon: BsFillHandbagFill
                    },
                    {
                        name: "Add / Edit Products",
                        href: "/admin/products/add-product",
                        icon: IoBagAdd
                    }
                ]
            },
            {
                name: "Cagegories",
                href: "/admin/categories",
                icon: BiCategory,
                subMenu: [
                    {
                        name: "Categories",
                        href: "/admin/categories",
                        icon: BiSolidCategory
                    },
                    {
                        name: "Add / Edit Categories",
                        href: "/admin/categories/add-categories",
                        icon: IoBagAdd
                    }
                ]
            }
        ]
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
    const handleClick = (item: LinkMenu) => {
        setActive(item)
    }
    return (
        <div className={inter.className}>
            <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="default-sidebar" aria-label="Sidebar" aria-hidden="true" className="w-72 fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 text-sm/[1px]">
                    <ul className="space-y-2 font-medium">
                        {linkMenu.map((item: LinkMenu, idx: number) => {
                            if (item.subMenu) {
                                return <li key={item.name} >
                                    <button type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls={item.name} data-collapse-toggle={item.name} >
                                        <item.icon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                        <span className="flex-1 ml-3 text-left whitespace-nowrap" >{item.name}</span>
                                        <svg className={`w-6 h-6 `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                    </button>
                                    <ul id={item.name} className="hidden py-2 space-y-2 ml-5">
                                        {item.subMenu.map(major => {
                                            if (major.subMenu) {
                                                return (
                                                    <li key={major.name} >
                                                        <button type="button" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls={major.name} data-collapse-toggle={major.name} >
                                                            <major.icon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                                            <span className="flex-1 ml-3 text-left whitespace-nowrap" >{major.name}</span>
                                                            <svg className={`w-6 h-6 `} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                                        </button>
                                                        <ul id={major.name} className="hidden py-2 space-y-2 ml-5">
                                                            {major.subMenu.map(minor => {
                                                                return (
                                                                    <li key={minor.name} onClick={() => handleClick(minor)}>
                                                                        <Link as={minor.href} href={minor.href} className={`${minor === active ? 'bg-gray-200 text-violet-500' : ''} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}>
                                                                            <minor.icon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                                                            <span className="ml-2">{minor.name}</span>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </li>)
                                            }
                                            return (
                                                <li key={major.name} onClick={() => handleClick(major)}>
                                                    <major.icon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                                    <span className="ml-2">{major.name}</span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </li>
                            }
                            return (
                                <li key={item.name} onClick={() => {
                                    if (item.name.replace(/\s/g, "").toLowerCase() === 'signout') {
                                        return signOut({ redirect: true })
                                    }
                                    setActive(item)
                                }}>
                                    <Link as={item.href} href={item.href} className={`${item === active ? 'bg-gray-200 text-violet-500' : ''} flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700`}>
                                        <item.icon className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white' />
                                        <span className="ml-3">{item.name}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-72">
                <div className="p-12 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                    {children}
                </div>
            </div>

        </div>
    )
}

export default AdminLayout