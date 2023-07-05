import { Box } from "@chakra-ui/react"

const RightDesign = ({ categories, title, content, height }) => {
  //const randomPosition = Math.round(Math.random() * (2100 - 1200) + 5200)
  return (
    <Box
      width="25%"
      display={{
        base: "none",
        md: "block",
      }}
      boxShadow={"xs"}
    >
      {title}
      {content}
    </Box>
  )
}
export default RightDesign
