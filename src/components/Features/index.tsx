import { featureData } from '@/data'
import React from 'react'
import Image from 'next/image'
import { BsArrowRight } from 'react-icons/bs'
type Props = {}

const FeaturesComponent: React.FC<Props> = (props: Props) => {
  const { title, subtitle, list } = featureData;
  return (
    <section className='my-[70px] xl:my-[150px]'>
      <div className="container mx-auto">
        {/* Text */}
        <div className='text-center'>
          <h2
            data-aos='flad-down'
            data-aos-delay='200'
            className='h2 mb-6 xl:mb-12'>{title}</h2>
          <p className='lead max-w-[585px] mx-auto mb-16 xl:mb-24'>{subtitle}</p>
        </div>

        {/* feature lists */}
        <div className='grid grid-cols-1 gap-[50px] xl:grid-cols-2'>
          {list?.map((feature, idx) => {
            const { image, bgImage, title, description, linkText, delay } = feature
            return (
              <div key={idx}
                data-aos='zoom-in'
                data-aos-offset='100'
                data-aos-delay={delay}
                className='w-full max-w-[530px] h-[360px] relative flex flex-col items-center justify-center xl:flex-row xl:justify-start mx-auto'>
                {/* Background Image */}
                <div className='xl:flex absolute top-0 right-0 -z-10'>
                  <div className={`${bgImage} min-w-[410px] min-h-[360px] rounded-r-[70px] rounded-tr-[70px] rounded-tl-[210px] rounded-bl-[70px] rounded-br-[70px]`}></div>
                </div>

                {/* imageIcon */}
                <div 
                data-aos='zoom-in-right'
                data-aos-delay={delay}
                className='max-w-[120px] xl:mr-7 xl:max-w-[230px]'>
                  <Image src={image} alt={'image' + idx} />
                </div>

                {/* text */}
                <div className='max-w-[200px]'>
                  <h3 className='h3 mb-4'>{title}</h3>
                  <p className='font-light italic gap-x-2 group'>{description}</p>
                  <div className='flex items-center gap-x-2 group'>
                    <a href="#" className='text-primary font-bold'>{linkText}</a>
                    <BsArrowRight className='text-xl text-accent-primary group-hover:ml-[5px] transition-all' />
                  </div>
                </div>
              </div>
            )
          })}
        </div>


      </div>
    </section>
  )
}

export default FeaturesComponent