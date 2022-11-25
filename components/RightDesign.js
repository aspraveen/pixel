import { Box } from "@chakra-ui/react"

const RightDesign = ({ categories, title, content, height }) => {
  const randomPosition = Math.round(Math.random() * (2100 - 1200) + 1200)
  return (
    <Box
      width="25%"
      display={{
        base: "none",
        md: "block",
      }}
      backgroundImage={"url('/assets/vvvortex.svg')"}
      backgroundSize={randomPosition}
      height={height ? height : "vh"}
      rounded="lg"
      backgroundPosition={(50, -100)}
    >
      {title}
      {content}
    </Box>
  )
}
export default RightDesign

export async function getStaticProps() {
  let topCategories = await prisma.category.findMany()
  let topCategories_data = JSON.parse(JSON.stringify(topCategories))
  return {
    props: {
      categories: topCategories_data,
    },
  }
}
