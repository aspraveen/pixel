import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/inter/700.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/open-sans/400.css"
import theme from "../theme"
import { SessionProvider } from "next-auth/react"
import "../styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
import Seo from "../components/Seo"

function MyApp({ Component, pageProps, router }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Seo />
        <Component {...pageProps} />
        <Analytics />
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
