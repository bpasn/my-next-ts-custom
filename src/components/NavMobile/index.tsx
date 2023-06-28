import React from 'react'
import { INavigator, navigationData } from '@/data'
type Props = {}

const NavMobileComponent = (props: Props) => {
  return (
    <ul className='flex flex-col px-6 py-8 gap-y-4'>
      {navigationData.map((item: INavigator, ind: number) => {
        return (
          <li key={item.name} >
            <a href={item.href} className='text-white'>
              {item.name}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default NavMobileComponent