// import images
// import AboutImg from '../src/access/img/about.png'
import Image1 from '@/assets/img/Image1.png'
import Image2 from '@/assets/img/Image2.png'
import Image3 from '@/assets/img/image3.png'
import Image4 from '@/assets/img/image4.png'

import Image5 from '@/assets/img/social-removebg-preview.png'
import Image6 from '@/assets/img/members-removebg-preview.png'
import Image7 from '@/assets/img/moon-removebg-preview.png'
import Image8 from '@/assets/img/money-removebg-preview.png'
import Image9 from '@/assets/img/groups-removebg-preview.png'
import Image10 from '@/assets/img/link-removebg-preview (1).png'
import { StaticImageData } from 'next/image';
export interface IData {
    title: string;
    subtitle: string;
    btnText?: string;
    image?: string;
    list?: IListData[]
}

export interface IListData {
    image: StaticImageData;
    bgImage: string;
    title: string;
    description: string;
    linkText: string;
    delay: string;
}
export interface INavigator {
    name: string;
    href: string;
}
export const heroData: IData = {
    title: `Order Products Faster Easier`,
    subtitle: `Order your favorite foods at any time and we will deliver them right to where you are.`,
    btnText: 'Get Started',
    image: 'https://deltasalesapp.com/assets/images/deltaSalesApp/Solutions/Slider/Tour%20Plans.png'
}

export const aboutData: IData = {
    image: "https://static.vecteezy.com/system/resources/previews/003/659/493/non_2x/gps-navigation-map-and-compass-on-location-search-application-shows-the-position-or-route-you-are-going-background-illustration-vector.jpg",
    title: "Lorem, ipsum dolor sit ",
    subtitle: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum commodi dolorem molestiae deleniti minus magni, odio veniam impedit esse. Obcaecati!"
}

export const featureData: IData = {
    title: '',
    subtitle: "",
    list: [
        {
            image: Image4,
            bgImage: "bg-blue-100",
            title: "Find Your Product",
            description: "We offer sal of products through the Internet..",
            linkText: "Learn more",
            delay: '400'
        },
        {
            image: Image2,
            bgImage: "bg-lime-100",
            title: "Payment Done",
            description: "Pay with a Visa or PayPal card and without mush ado",
            linkText: "Learn more",
            delay: '700'
        },
        {
            image: Image1,
            bgImage: "bg-orange-100",
            title: "Print Out",
            description: "Pay with a Visa or PayPal card and without mush ado",
            linkText: "Learn more",
            delay: '1000'
        },
        {
            image: Image3,
            bgImage: "bg-red-100",
            title: "Product Received",
            description: "Pay with a Visa or PayPal card and without mush ado",
            linkText: "Learn more",
            delay: '1300'
        }
    ]
}

export const navigationData = [
    {
        name: 'Deliver',
        href: '#'
    },
    {
        name: 'About',
        href: '#'
    },
    {
        name: 'Features',
        href: '#'
    },
    {
        name: 'Signup',
        href: '#'
    },

]