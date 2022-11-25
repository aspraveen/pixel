import { prisma } from "../../util/db"

const handler = async (req, res) => {
  const postId = parseInt(req.query.postId)

  if (req.method === "GET") {
    if (Number.isInteger(postId)) {
      //fetch count
      try {
        const post = await prisma.post.findUnique({
          where: {
            id: postId,
          },
          include: {
            user: true,
            category: true,
          },
        })
        res.status(200).json(post)
      } catch (err) {
        console.log(err)
        res.status(500).send(err)
      }
    } else {
      res.status(500).json({ error: "invalid post id" })
    }
  }
}
export default handler
