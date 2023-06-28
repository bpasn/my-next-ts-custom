import React from 'react'
import { TestimonailSliderComponent } from '@/components'
type Props = {}

const TestimonailsComponent: React.FunctionComponent<Props> = (props: Props) => {
  return (
    <section>
      <div className="container-fluid mx-auto">
        <div className='bg-accent-primary min-h-[600px]'>
          <div className='flex flex-col justify-center px-2 xl:px-0 h-[800px]'>
            <h2 className='h2 text-white text-center mb-[80px]'>Testimo</h2>
            <TestimonailSliderComponent/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonailsComponent