import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/inter/700.css"
import "@fontsource/montserrat/400.css"
import "@fontsource/open-sans/400.css"
import theme from "../theme"
import { SessionProvider } from "next-auth/react"
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"
import "../styles/globals.css"
import { Analytics } from "@vercel/analytics/react"
import Seo from "../components/Seo"

function MyApp({ Component, pageProps, router }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <GoogleReCaptchaProvider
          reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY}
          scriptProps={{
            async: false, // optional, default to false,
            defer: true, // optional, default to false
            appendTo: "body", // optional, default to "head", can be "head" or "body",
            nonce: undefined,
          }}
        >
          <Seo />
          <Component {...pageProps} />
          <Analytics />
        </GoogleReCaptchaProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
