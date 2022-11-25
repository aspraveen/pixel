import {
  Heading,
  Code,
  Image,
  chakra,
  OrderedList,
  UnorderedList,
  ListItem,
  Text,
} from "@chakra-ui/react"

const BlockquoteStyle = {
  margin: "1.5em 10px",
  padding: "0.5em 10px",
}

const RenderContents = ({ details }) => {
  return details.map((item, key) => {
    //console.log(JSON.stringify(item))
    switch (item.type) {
      case "image":
        return <Image src={item.url} />
      case "list-item":
        return <ListItem> {item.children[0].text}</ListItem>
      case "numbered-list":
        return <OrderedList> {item.children[0].text}</OrderedList>
      case "bulleted-list":
        return <UnorderedList> {item.children[0].text}</UnorderedList>
      case "heading-one":
        return (
          <Heading as="h1" size="3xl" key={key}>
            {item.children[0].text}
          </Heading>
        )
      case "heading-two":
        return (
          <Heading as="h2" size="2xl" key={key}>
            {item.children[0].text}
          </Heading>
        )
      case "block-quote":
        return (
          <chakra.blockquote
            style={BlockquoteStyle}
            borderLeftWidth={"10px"}
            borderLeftColor={"gray.200"}
            key={key}
          >
            {item.children[0].text}
          </chakra.blockquote>
        )
      case "paragraph":
        //console.log(item.children[0].code)
        if (item.children[0].code) {
          return (
            <Code colorScheme="orange" key={key}>
              {item.children[0].text}
            </Code>
          )
        } else {
          if (item.children[0].text === "") {
            return <p key={key}>&nbsp;</p>
          } else {
            if (item.children[0].bold) {
              return (
                <p key={key}>
                  <strong>{item.children[0].text}</strong>
                </p>
              )
            } else {
              return <p key={key}> {item.children[0].text}</p>
            }
          }
        }

      default:
        return <p key={key}> {item.type}</p>
    }
  })
}
export default RenderContents
