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
  try {
    //const reqPayLoad = JSON.parse(req.body)
    const reqPayLoad = req.body
    const { name, mob, email, message, token } = reqPayLoad
    //validation
    if (name.length > 4 && email.length >= 6) {
      //verify token
      const verifiedToken = await verifyCaptchaToken(token)
      if (verifiedToken.success && verifiedToken.score >= 0.6) {
        //send email
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
                name: name,
                mob: mob,
                email: email,
                message: message,
                recaptcha: verifiedToken.success + " - " + verifiedToken.score,
              },
            },
          ],
          template_id: "d-75f3e4246cea42829e16c170e028e2c8",
        }
        try {
          await sg.send(emailMessage)
          res.status(200).json({ msg: "Thank you! details has been sent" })
        } catch (err) {
          res.status(400).json({ msg: "We failed to send message through sendgrid" })
        }
        console.log(sendStatus.Response["statusCode"])
      } else {
        res.status(400).json({
          msg: `We failed to submit the message as score [${verifiedToken.score}] is low for Recaptcha`,
        })
      }
    } else {
      res.status(400).json({ msg: "Name or email not in proper format" })
    }
  } catch (error) {
    console.log(error)
  }
}
export default handler
