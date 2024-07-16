import { Poppins, Raleway } from 'next/font/google'

export const poppins = Poppins({
  display: 'swap',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})
export const raleway = Raleway({
  display: 'swap',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-raleway',
})
