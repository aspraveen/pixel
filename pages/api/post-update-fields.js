import { prisma } from "../../util/db"

const handler = async (req, res) => {
  const postId = parseInt(req.query.postId)
  const field = req.query.fieldType
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress
  const hourInMilliseconds = 60 * 60 * 1000

  const TimeToOmit = new Date(Date.now() - hourInMilliseconds)
  if (field == "view") {
    //check if recently recorded
    try {
      const checkIfViewed = await prisma.tracker.count({
        where: {
          AND: [
            {
              postId: {
                equals: postId,
              },
              activity: {
                equals: "view",
              },
              createdAt: {
                gt: TimeToOmit,
              },
            },
          ],
        },
      })
      //if record not available then add count
      if (checkIfViewed == 0) {
        //update view
        try {
          const updateCount = await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              views: { increment: 1 },
            },
          })
          //track it
          try {
            const trackIt = await prisma.tracker.create({
              data: {
                postId: postId,
                activity: "view",
                ipAddress: ip,
              },
            })
          } catch (err) {
            console.log(err)
          }
          res.status(200).json({ msg: "view incremented" })
        } catch (err) {
          console.log(err)
          res.status(500).json({ err: err })
        }
      } else {
        res.status(200).json({ msg: "already viewed" })
      }
    } catch (err) {
      console.log(err)
    }
  } else if (field == "like") {
    //check if recently recorded
    try {
      const checkIfLiked = await prisma.tracker.count({
        where: {
          AND: [
            {
              postId: {
                equals: postId,
              },
              activity: {
                equals: "like",
              },
              createdAt: {
                gt: TimeToOmit,
              },
            },
          ],
        },
      })
      //if record not available then add count
      if (checkIfLiked == 0) {
        //update view
        try {
          const updateCount = await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              likes: { increment: 1 },
            },
          })
          //track it
          try {
            const trackIt = await prisma.tracker.create({
              data: {
                postId: postId,
                activity: "like",
                ipAddress: ip,
              },
            })
          } catch (err) {
            console.log(err)
          }
          res.status(200).json({ msg: "like incremented" })
        } catch (err) {
          console.log(err)
          res.status(500).json({ err: err })
        }
      } else {
        res.status(200).json({ msg: "already liked" })
      }
    } catch (err) {
      console.log(err)
    }
  }
}
export default handler
