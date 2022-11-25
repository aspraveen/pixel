import { Container } from "@chakra-ui/react"
import Header from "../../../components/Header"
import { prisma } from "../../../util/db"
import { RichTextBlock } from "../../../components/manageit/RichTextBlock"
import { Input, Button, Textarea, RadioGroup, Radio, Stack, Select } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
const editContent = ({ post, categories }) => {
  const router = useRouter()
  const [id, setId] = useState()
  const [title, setTitle] = useState()
  const [slug, setSlug] = useState()
  const [details, setDetails] = useState()
  const [intro, setIntro] = useState()
  const [status, setStatus] = useState(2)
  const [publishedAt, setPublishedAt] = useState()
  const [category, setCategory] = useState()
  let newDate = new Date(publishedAt)

  useEffect(() => {
    setId(post.id)
    setTitle(post.title)
    setSlug(post.slug)
    setPublishedAt(post.publishedAt)
    setIntro(post.intro)
    setCategory(post.categoryId)
    let string1 = JSON.stringify(post.details)
    localStorage.setItem("content", string1)
  }, [])
  const updatePost = async () => {
    //useEffect(() => {
    const contents = localStorage.getItem("content")
    //console.log("🚀 ~ file: [slug].js ~ line 24 ~ //useEffect ~ contents", contents)
    const initialValue = JSON.parse(contents)
    //setDetails(contents)
    console.log("🚀 ~ file: [slug].js ~ line 27 ~ //useEffect ~ details", initialValue)

    // })

    //send to api
    try {
      const postPayLoad = {
        id,
        title,
        slug,
        intro,
        publishedAt,
        details: initialValue,
        status,
        category,
      }

      //JSON.stringify(postPayLoad)
      const url = "/api/manageit/post"
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify(postPayLoad),
      })
      const result = await response.json()
      if (result.msg == "done") {
        router.push("/manageit/list-contents")
      }
    } catch (err) {
      console.log(err)
    }
  }
  //delete post
  const deletePost = async () => {
    const postPayLoad = { id }
    const url = "/api/manageit/post"
    const response = await fetch(url, {
      method: "DELETE",
      body: JSON.stringify(postPayLoad),
    })
    const result = await response.json()
    //  if (result.msg == "done") {
    router.push("/manageit/list-contents")
    //  }
  }
  return (
    <Container maxW="container.xl">
      <Header />
      <h2>Contents</h2>
      <Select placeholder="select category" onChange={({ target }) => setCategory(target?.value)}>
        {categories.map((item) => (
          <option value={item.id} selected={item.id === category ? "selected" : "false"}>
            {item.name}
          </option>
        ))}
      </Select>
      <Input
        placeholder="Enter Title"
        mt={2}
        onChange={({ target }) => setTitle(target?.value)}
        value={title}
      />
      <Input
        placeholder="Enter Slug"
        mt={2}
        mb={2}
        onChange={({ target }) => setSlug(target?.value)}
        value={slug}
      />
      <Textarea mt={2} mb={2} onChange={({ target }) => setIntro(target?.value)} value={intro} />
      <Input
        type="date"
        value={newDate.toLocaleDateString("en-CA")}
        mt={2}
        mb={2}
        onChange={({ target }) => setPublishedAt(target?.value)}
      />
      <RichTextBlock />
      <RadioGroup>
        <Stack direction="row">
          <Radio value="1" onChange={() => setStatus(1)}>
            Published
          </Radio>
          <Radio value="2" onChange={() => setStatus(2)} defaultChecked="true">
            Draft
          </Radio>
        </Stack>
      </RadioGroup>
      <Button
        name="Save"
        variant="outline"
        backgroundColor="gray.300"
        onClick={() => updatePost()}
        mt={2}
      >
        Save
      </Button>
      <Button
        name="Delete"
        variant="outline"
        backgroundColor="gray.400"
        onClick={() => deletePost()}
        mt={2}
      >
        Delete
      </Button>
    </Container>
  )
}
export async function getServerSideProps({ params }) {
  const post = await prisma.post.findFirst({
    where: {
      slug: params.slug,
    },
  })
  const data = JSON.parse(JSON.stringify(post))

  const categories = await prisma.category.findMany()
  const categories_data = JSON.parse(JSON.stringify(categories))
  console.log(categories_data)
  return {
    props: {
      post: data,
      categories: categories_data,
    },
  }
}
export default editContent
