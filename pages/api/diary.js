import { authOptions } from "/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { prisma } from "../../util/db"
const handler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)
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
    const { type, selectedDate, note } = req.query
    if (!session) {
      res.status(401).json({ msg: "Not Authenticated" })
    } else {
      let { userId } = session
      let data = []
      if (type == "display") {
        const transDate =
          new Date(selectedDate).getFullYear() +
          "-" +
          (new Date(selectedDate).getMonth() + 1) +
          "-" +
          new Date(selectedDate).getDate()
        const formattedDate = `${selectedDate}T00:00:00.000Z`

        console.log("🚀 ~ file: diary.js:46 ~ handler ~ transDate", transDate)
        //const formattedDate = `2016-11-01T00:00:00.000Z`
        /*const data =
        await prisma.$queryRaw`SELECT * FROM pixel."Diary" where "transDate"='2022-11-26'`*/
        data = await prisma.diary.findMany({
          where: {
            transDate: formattedDate,
            userId,
          },
        })
      } else if (type == "edit") {
        data = await prisma.diary.findFirst({
          where: { id: parseInt(note), userId },
        })
        //data = { msg: "ok" }
      }
      //console.log(data)
      res.status(200).json(data)
    }
  } else if (req.method == "PUT") {
    if (!session) {
      res.status(401).json({ msg: "Not Authenticated" })
    } else {
      const reqPayLoad = req.body
      const { inputField: selectedNote } = reqPayLoad //destructuring inputField as selectedNote to simplify
      //update data on prisma
      try {
        const editNote = await prisma.diary.update({
          where: { id: selectedNote.id },
          data: {
            transDate: selectedNote.transDate,
            title: selectedNote.title,
            details: selectedNote.details,
            amount: selectedNote.amount,
            tags: selectedNote.tags,
            places: selectedNote.places,
            people: selectedNote.people,
            category: selectedNote.category,
            currency: selectedNote.currency,
            paymentMethod: selectedNote.paymentMethod,
          },
        })
        res.status(200).json({ msg: "ok" })
      } catch (err) {
        console.log(err)
        res.status(400).json({ msg: err })
      }
    }
  } else if (req.method == "DELETE") {
    if (!session) {
      res.status(401).json({ msg: "Not Authenticated" })
    } else {
      let { userId } = session
      const reqPayLoad = req.body
      const { id } = reqPayLoad
      //delete data on prisma
      try {
        const deleteNote = await prisma.diary.deleteMany({
          where: { id, userId },
        })
        res.status(200).json({ msg: "ok" })
      } catch (err) {
        console.log(err)
        res.status(400).json({ msg: err })
      }
    }
  }
}
export default handler
