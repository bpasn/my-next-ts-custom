import { aboutData } from '@/data'
import React from 'react'

type Props = {}

const About: React.FunctionComponent<Props> = (props: Props) => {
    const { title, subtitle, image } = aboutData
    return (
        <section className='my-[30px] xl:mt-[1--px]' data-aos="fade-up"
            data-aos-offset='350'
        >
            <div className="container mx-auto">
                <div className='rounded min-h-[560px] px-12 pb-12 flex flex-col text-center xl:flex-row xl:items-center xl:text-left xl:gap-x-[60px] xl:pb-0'>
                    <div className='flex-1' data-aos='zoom-in-left'>
                        <img src={image} alt="about" />
                    </div>

                    {/* Text */}

                    <div className='flex-1 xl:pr-12'>
                        <h2 className='h2 mb-12'
                            data-aos="fade-up"
                            data-aos-delay='300'
                        >{title}</h2>
                        <p data-aos="fade-up"
                            data-aos-delay='300'
                            className='max-w-[474px] mx-auto xl:mx-0'>{subtitle}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About