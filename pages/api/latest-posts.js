import { prisma } from "../../util/db"
const handler = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: 1,
      },
      select: {
        publishedAt: true,
        title: true,
        intro: true,
        views: true,
        likes: true,
        slug: true,
        id: true,
        user: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        publishedAt: "desc",
      },
      take: 3,
    })
    res.status(200).json(posts)
  } catch (err) {
    res.status(400).json({ msg: `Unknown Error Occurred.` })
  }
}
export default handler
