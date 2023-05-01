import {
  Box,
  useColorModeValue,
  Divider,
  SimpleGrid,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  InputLeftElement,
  Button,
  Spinner,
} from "@chakra-ui/react"

import useSWRMutation from "swr/mutation"
import ClearHTML from "./ClearHTML"
import Badges from "./Badges"

import { useState } from "react"
import { SearchIcon } from "@chakra-ui/icons"
import DiaryDate from "./DiaryDate"

//const fetcher = (...args) => fetch(...args).then((res) => res.json())
const searchDiary = (url, { arg }) => {
  return fetch(url + "?" + new URLSearchParams(arg)).then((res) => res.json())
}

const SearchResults = ({ data }) => {
  return (
    <SimpleGrid columns={[1, null, 4]} spacing={5}>
      {data.map((item) => (
        <Box
          fontSize={"md"}
          color={"gray.400"}
          backgroundColor={useColorModeValue("gray.50", "gray.600")}
          p={5}
          rounded={"md"}
          key={item.id}
        >
          <DiaryDate date={item.transDate} page={"search"} />
          <Divider py={2} />
          <Heading
            mt={3}
            as="h4"
            fontSize={["sm", null, "lg"]}
            fontFamily={"Inter"}
            textTransform={"capitalize"}
          >
            <ClearHTML details={item.title} />
          </Heading>
          <Box fontSize={["sm", null, "md"]}>
            <ClearHTML details={item.details} />
          </Box>
          <Divider my={5} />
          <SimpleGrid columns={[2, null, 3]} spacing={1}>
            <Badges data={item.amount} type={"amount"} />
            <Badges data={item.people} type={"people"} />
            <Badges data={item.places} type={"places"} />
            <Badges data={item.tags} type={"tags"} />
          </SimpleGrid>
        </Box>
      ))}
    </SimpleGrid>
  )
}

const Search = () => {
  const [searchKey, setSearchKey] = useState()

  const { trigger, data, error, isMutating } = useSWRMutation(`api/diary/`, searchDiary, {
    revalidate: false,
  })

  if (error) {
    return <Box>{error.message}</Box>
  }

  return (
    <>
      <InputGroup mt={20} mb={10}>
        <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.200" />} />
        <Input
          type="text"
          onChange={(e) => {
            setSearchKey(e.target.value)
          }}
        />

        <InputRightElement width="4.5rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={async () => {
              try {
                const result = await trigger({ type: "search", searchkey: searchKey })
              } catch (e) {
                console.log("🚀 ~ file: Search.js:43 ~ ", e)
              }
            }}
          >
            Search
          </Button>
        </InputRightElement>
      </InputGroup>
      {isMutating && (
        <Box>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="purple.200"
            color="purple.500"
            size="xl"
          />
        </Box>
      )}
      {data && <SearchResults data={data} />}
    </>
  )
}

export default Search
