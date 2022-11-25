import { authOptions } from "/pages/api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"
import { prisma } from "../../util/db"
import sg from "@sendgrid/mail"
const verifyCaptchaToken = async (token) => {
  let result
  const secretKey = process.env.RECAPTCHA_SITE_SECRET
  let verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
  const response = await fetch(verificationUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
  })
  try {
    result = await response.json()
  } catch (err) {
    result = { msg: err }
  }

  return result
}
const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress
  if (req.method === "POST") {
    if (!session) {
      res.status(401).json({ msg: "Not Authenticated" })
    } else {
      const { userId } = session
      const reqPayLoad = req.body
      const { message, token } = reqPayLoad
      //verify token
      const verifiedToken = await verifyCaptchaToken(token)
      let score = 0
      if (verifiedToken.success) {
        score = verifiedToken.score.toString()
      }
      try {
        //add entry to guest book
        const addComment = await prisma.guestBook.create({
          data: { comment: message, userId: userId, captchaScore: score, ip },
        })
        //find signed user details
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        })
        const { name: username, email } = user
        //notify by email
        sg.setApiKey(process.env.SEND_GRID_KEY)
        const emailMessage = {
          from: {
            email: "site@pixeldigit.com",
          },
          personalizations: [
            {
              to: [
                {
                  email: "praveen@pixeldigit.com",
                  name: "Praveen",
                },
              ],
              dynamic_template_data: {
                name: username,
                email: email,
                message: message,
                recaptcha: score,
              },
            },
          ],
          template_id: "d-0d574f6137304a76b286d18e2a1d8dff",
        }
        try {
          await sg.send(emailMessage)
        } catch (error) {
          console.log(error)
        }
        res.status(200).json({ msg: "ok" })
      } catch (err) {
        res.status(400).json({
          msg: `Sorry an unexpected error occurred ${err}`,
        })
      }
    }
  } else if (req.method === "PUT") {
    if (!session) {
      res.status(401).json({ msg: "not authenticated" })
    } else {
      const { userId } = session
      const reqPayLoad = req.body
      const { id } = reqPayLoad

      //check if the entry belongs to user or not
      const checkOwner = await prisma.guestBook.findUnique({ where: { id } })
      if (checkOwner.userId == userId) {
        const unpublish = await prisma.guestBook.update({
          where: { id: id },
          data: { status: false, ip },
        })
        res.status(200).json({ msg: "done" })
      } else {
        res.status(403).json({ msg: "permission denied" })
      }
    }
  } else if (req.method === "DELETE") {
  } else if (req.method === "GET") {
    const getComments = await prisma.guestBook.findMany({
      where: {
        status: true,
      },
      include: {
        user: true,
      },
    })
    res.status(200).json(getComments)
  }
}
export default handler
