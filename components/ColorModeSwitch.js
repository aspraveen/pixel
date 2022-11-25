import { useColorMode, useColorModeValue, IconButton, IconButtonProps } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons"
const ColorModeSwitch = (props) => {
  const { toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon)
  const bgColor = useColorModeValue("gray.50", "gray.700")
  return (
    <IconButton
      onClick={toggleColorMode}
      bgColor={bgColor}
      border="20px"
      aria-label={`Switch color mode`}
      icon={<SwitchIcon />}
      {...props}
      isRound={true}
      size="xs"
    />
  )
}
export default ColorModeSwitch
