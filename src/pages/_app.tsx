import { ChakraProvider } from '@chakra-ui/react'
import { Open_Sans } from '@next/font/google'
import type { AppProps } from 'next/app'
import theme from '@/styles'

const font = Open_Sans({ subsets: ['latin'], weight: ["500", "700"], style: ['normal'] })

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <style jsx global>{`
      @font-face {
        font-family: ${font.style.fontFamily};
        font-weight: ${font.style.fontWeight};
      }
    `}</style>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </>
}
