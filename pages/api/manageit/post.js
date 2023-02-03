import { authOptions } from "/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { prisma } from "../../../util/db"

const post = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)
  if (session) {
    const { userId } = session
    const reqPayLoad = JSON.parse(req.body)
    const { id, title, slug, details, intro, publishedAt, status, category } = reqPayLoad
    if (req.method === "POST") {
      //insert to prisma
      try {
        const addPost = await prisma.post.create({
          data: {
            title: title,
            slug: slug,
            intro: intro,
            details: details,
            userId: userId,
            status: status,
            publishedAt: new Date(publishedAt),
            categoryId: category,
          },
        })
        res.status(200).json({ msg: "done" })
      } catch (err) {
        console.log(err)
        res.status(500).send(err)
      }
    } else if (req.method === "PUT") {
      try {
        const editPost = await prisma.post.update({
          where: {
            id: id,
          },
          data: {
            title: title,
            slug: slug,
            intro: intro,
            details: details,
            status: status,
            publishedAt: new Date(publishedAt),
            categoryId: category,
          },
        })
        res.status(200).json({ msg: "done" })
      } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
      }
    } else if (req.method === "DELETE") {
      try {
        const deletePost = await prisma.post.delete({
          where: {
            id: id,
          },
        })
        res.status(200).json({ msg: "done" })
      } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
      }
    }
  } else {
    res.status(401).json({ msg: "Not Authenticated" })
  }
}
export default post
