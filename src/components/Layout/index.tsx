import styled from 'styled-components'
import React from 'react';
import { HeaderComponent, FooterComponent } from '@/components'
type LayoutProps = {
    children: React.ReactNode
}

export const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: #000133;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
`;

export const PageContainer = styled.div`
  padding: 20px;
  width: 100vw;
`;

const RootLayout: React.FunctionComponent<LayoutProps> = ({ children }) => {
    return (
        <div className="text-center flex flex-col text-color-gray" style={{
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
        </div>
    )
}

export default RootLayout