import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { signOut } from 'next-auth/react';
import { navigationData } from '@/data';


type Props = {}
interface INavigation {
    name: string;
    href: string;
    current: boolean;
}
const navigation: INavigation[] = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
]
function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}
const NavBarComponent = (props: Props) => {
    const [gNavigation, setNavigation] = React.useState<INavigation[]>(navigation);
    const handleClick = (item: INavigation) => {

        setNavigation(prve => {
            return prve.map(navigate => {
                if (navigate.name === item.name) {
                    navigate.current = true
                } else {
                    navigate.current = false;
                }
                return navigate
            })
        })
    }
    return (
        <nav className=''>
           <ul className='flex gap-x-8'>
            {navigationData.map(item => (
                <li key={item.name}>
                    <a href={item.href}>
                        {item.name}
                    </a>
                </li>
            ))}
           </ul>
        </nav>
        // <Disclosure as="nav" className="bg-gray-800">
        //     {({ open }) => {
        //         return (
        //             <>
        //                 <div className="mx-auto max-w-7x1 px-2 sm:px-6 lg:px-8">
        //                     <div className="relative flex h-16 items-center justify-between">
        //                         <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
        //                             {/* Mobile menu button */}
        //                             <Disclosure.Button className={'inline-flex intems-center justify-content rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'}>
        //                                 <span className="sr-only">Open Main menu</span>
        //                                 {open ? (
        //                                     <XMarkIcon className='block h-6 w-6' aria-hidden="true" />
        //                                 ) : (<Bars3Icon className='block h-6 w-6' aria-hidden="true" />)}
        //                             </Disclosure.Button>
        //                         </div>
        //                         <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        //                             <div className="flex flex-shrink-0 items-center">
        //                                 <img src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        //                                     alt="Your Company" className="block h-8 w-auto lg:hidden" />
        //                                 <img
        //                                     className="hidden h-8 w-auto lg:block"
        //                                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
        //                                     alt="Your Company"
        //                                 />
        //                             </div>
        //                             <div className="hidden sm:ml-6 sm:block">
        //                                 <div className="flex space-x-4">
        //                                     {gNavigation.map(item => (
        //                                         <a href={item.href} key={item.name}
        //                                             onClick={() => handleClick(item)}
        //                                             className={classNames(
        //                                                 item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 over:text-white', 'rounded-md px-3 py-2 text-sm font-medium'
        //                                             )} aria-current={item.current ? 'page' : undefined}>{item.name}</a>
        //                                     ))}
        //                                 </div>
        //                             </div>
        //                         </div>
        //                         <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        //                             <button
        //                                 type='button'
        //                                 className="rounded bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        //                                 <span className="sr-only">View notifications</span>
        //                                 <BellIcon className="h-6 w-6" aria-hidden="true" />
        //                             </button>

        //                             {/* Profile fropdown */}
        //                             <Menu as="div" className="relative ml-3">
        //                                 <div>
        //                                     <Menu.Button className={"flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus-ring-white focus:ring-offset-2 focus:ring-offset-gray-800"}>
        //                                         <span className="sr-only">Open user menu</span>
        //                                         <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        //                                             alt="" className="h-8 w-8 rounded-full" />
        //                                     </Menu.Button>
        //                                 </div>
        //                                 <Transition as={Fragment}
        //                                     enter="transition ease-out dutaion-100"
        //                                     enterFrom="transform opacity-0 scale-95"
        //                                     enterTo="transform opacity-100 scale-100"
        //                                     leave="transition ease-in duration-75"
        //                                     leaveFrom="transform opacity-100 scale-100"
        //                                     leaveTo="transform opacity-0 scale-95">
        //                                     <Menu.Items className={"absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"}>
        //                                         <Menu.Item>
        //                                             {({ active }) => (
        //                                                 <a href="#"
        //                                                     className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
        //                                                 >
        //                                                     Your Profile
        //                                                 </a>
        //                                             )}
        //                                         </Menu.Item>
        //                                         <Menu.Item>
        //                                             {({ active }) => (
        //                                                 <a href="#"
        //                                                     className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
        //                                                 >
        //                                                     Settings
        //                                                 </a>
        //                                             )}
        //                                         </Menu.Item>
        //                                         <Menu.Item>
        //                                             {({ active }) => (
        //                                                 <a href="#"
        //                                                     onClick={() => {
        //                                                         signOut({
        //                                                             callbackUrl:"/auth/signin",
        //                                                             redirect: true
        //                                                         })
        //                                                     }}
        //                                                     className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
        //                                                 >
        //                                                     Sign Out
        //                                                 </a>
        //                                             )}
        //                                         </Menu.Item>
        //                                     </Menu.Items>
        //                                 </Transition>
        //                             </Menu>
        //                         </div>
        //                     </div>
        //                 </div>

        //                 <Disclosure.Panel>
        //                     <div className="space-y-1 px-2 pb-4 pt-2">
        //                         {gNavigation.map(item => (
        //                             <Disclosure.Button
        //                                 key={item.name}
        //                                 as='a'
        //                                 href={item.href}
        //                                 onClick={() => handleClick(item)}
        //                                 className={classNames(
        //                                     item.current ? 'bg-gray-9-- text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
        //                                     'block rounded-md px-3 py-2 text-base font-medium'
        //                                 )}
        //                                 aria-current={item.current ? 'page' : undefined}
        //                             >
        //                                 {item.name}
        //                             </Disclosure.Button>
        //                         ))}
        //                     </div>
        //                 </Disclosure.Panel>
        //             </>
        //         )
        //     }}
        // </Disclosure>
    )
}

export default NavBarComponent