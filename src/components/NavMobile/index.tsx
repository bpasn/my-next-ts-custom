import React from 'react'
import { INavigator, navigationData } from '@/data'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'
type Props = {
  session: Session
}

const NavMobileComponent: React.FunctionComponent<Props> = (props) => {
  return (
    <ul className='flex flex-col px-6 py-8 gap-y-4 z-500'>
      {navigationData.map((item: INavigator, ind: number) => {
        if (props.session && Object.keys(props.session).length) {
          if (item.name !== "Signin" && item.name !== "Signup") {
            return (
              <li key={item.name} onClick={() => {
                if (item.name === "Signout") {
                  signOut({ redirect: true })
                }
              }}>
                <a href={item.href} className='text-white'>
                  {item.name}
                </a>
              </li>
            )
          }
        } else {
          if (item.name !== 'Signout') {
            return (
              <li key={item.name} onClick={() => {
                if (item.name === "Signout") {
                  signOut({ redirect: true })
                }
              }}>
                <a href={item.href} className='text-white'>
                  {item.name}
                </a>
              </li>
            )
          }
        }
      })}
    </ul>
  )
}

export default NavMobileComponent