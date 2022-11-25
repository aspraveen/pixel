import { DeleteObjectCommand, S3 } from "@aws-sdk/client-s3"
import { createPresignedPost } from "@aws-sdk/s3-presigned-post"
import { prisma } from "../../../util/db"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    const { userId } = session
    if (req.query.action == "upload") {
      const client = new S3({
        region: process.env.MY_AWS_REGION,
        signatureVersion: "v4",
        credentials: {
          accessKeyId: process.env.MY_AWS_ACCESS_KEY,
          secretAccessKey: process.env.MY_AWS_SECRET_KEY,
        },
      })

      try {
        const post = await createPresignedPost(client, {
          Bucket: process.env.MY_AWS_BUCKET_NAME,
          Conditions: [["content-length-range", 100, 5242880]],
          Fields: {
            success_action_status: "201",
          },
          Key: req.query.file,
          Expires: 60, // seconds
        })
        //console.log(post)
        const {
          url,
          fields: { key: fileName },
        } = post //object destructuring
        //add to database
        try {
          const data = await prisma.media.create({
            data: {
              name: req.query.attname,
              fileName: fileName,
              uri: url + "/" + fileName,
              userId: userId,
            },
          })
          res.status(200).json(post)
        } catch (err) {
          console.log(err)
          res.status(500).json({ msg: err })
        }
      } catch (err) {
        console.log(err)
        res.status(500).json({ msg: err })
      }
    } else if (req.query.action == "getFiles") {
      try {
        const data = await prisma.media.findMany()
        res.status(200).json(data)
      } catch (err) {
        res.status(500).json({ msg: err })
      }
    } else if (req.query.action == "deleteFile") {
      //first find the image name from database
      try {
        const data = await prisma.media.findUnique({
          where: {
            id: parseInt(req.query.todeleteid),
          },
          select: {
            fileName: true,
          },
        })
        const { fileName: imageToDeleteName } = data
        console.log(imageToDeleteName)
        //delete from s3
        const fileParams = { Bucket: process.env.MY_AWS_BUCKET_NAME, Key: imageToDeleteName }
        const client = new S3({
          region: process.env.MY_AWS_REGION,
          signatureVersion: "v4",
          credentials: {
            accessKeyId: process.env.MY_AWS_ACCESS_KEY,
            secretAccessKey: process.env.MY_AWS_SECRET_KEY,
          },
        })
        try {
          const deleteImage = await client.send(new DeleteObjectCommand(fileParams))
          // if deleted from s3 then delete form database
          //delete from database
          try {
            const doDelete = await prisma.media.delete({
              where: {
                id: parseInt(req.query.todeleteid),
              },
            })
            const data = await prisma.media.findMany()
            res.status(200).json(data)
          } catch (err) {
            console.log(err)
            res.status(500).json({ msg: err })
          }
        } catch (err) {
          console.log(err)
          res.status(500).json({ msg: err })
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      res.status(200).json({ msg: "not valid action" })
    }
  } else {
    res.status(401).json({ msg: "Not Authenticated" })
  }
}
export default handler
