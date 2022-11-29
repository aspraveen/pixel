import { authOptions } from "/pages/api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth"
import { prisma } from "../../util/db"
const handler = async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (req.method === "POST") {
    if (!session) {
      res.status(401).json({ msg: "Not Authenticated" })
    } else {
      const { userId } = session
      const reqPayLoad = req.body
      const { transDate, inputFields } = reqPayLoad
      let newData = []
      const data = inputFields.map((data, index) => {
        data["transDate"] = new Date(transDate).toISOString()
        data["userId"] = userId
        newData.push(data)
      })
      console.log("🚀 ~ file: diary.js ~ line 15 ~ handler ~ newData", newData)
      //add data to prisma
      try {
        const addRecords = await prisma.diary.createMany({
          data: newData,
        })
        res.status(200).json({ msg: "ok" })
      } catch (err) {
        console.log(err)
        res.status(400).json({ msg: err })
      }
    }
  } else if (req.method === "GET") {
    if (!session) {
      res.status(401).json({ msg: "Not Authenticated" })
    } else {
      const transDate =
        new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate()
      //const formattedDate = `${transDate}T00:00:00.000Z`
      const formattedDate = `2016-11-01T00:00:00.000Z`
      /*const data =
        await prisma.$queryRaw`SELECT * FROM pixel."Diary" where "transDate"='2022-11-26'`*/
      const data = await prisma.diary.findMany({
        where: {
          transDate: formattedDate,
        },
      })
      //console.log(data)
      res.status(200).json(data)
    }
  }
}
export default handler
