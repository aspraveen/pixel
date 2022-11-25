import {
    extendTheme,
    theme as base,
} from "@chakra-ui/react"
import { mode } from "@chakra-ui/theme-tools"
  const theme = extendTheme({
    initialColorMode: "system",
    useSystemColorMode: true,
    fonts: {
      heading: `Inter, ${base.fonts?.heading}`,
      body: `Open Sans, ${base.fonts?.body}`,
    }
  });
  export default theme;
