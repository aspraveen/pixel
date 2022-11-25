import { Heading, Input, Box, Alert, AlertIcon, useBreakpointValue, Button } from "@chakra-ui/react"
import { useState } from "react"

const UploadImage = (props) => {
  const [CanUpload, setCanUpload] = useState(1)
  const [errorMessage, setErrorMessage] = useState()
  const variant = useBreakpointValue({ base: "md", md: "lg" })

  const uploadPhoto = async (e) => {
    setErrorMessage(null)
    const file = e.target.files[0]
    const attname = document.getElementsByName("attachment_name")[0].value
    const filename = encodeURIComponent(file.name)
    const res = await fetch(
      `/api/manageit/manage-s3?action=upload&file=${filename}&attname=${attname}`,
    )
    const { url, fields } = await res.json()
    const formData = new FormData()

    Object.entries({ ...fields, file }).forEach(([key, value]) => {
      formData.append(key, value)
    })
    /*for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]);
         }*/
    const upload = await fetch(url, {
      method: "POST",
      body: formData,
    })
    if (upload.ok) {
      setCanUpload(0)
      props.updatelistimagestate()
    } else {
      console.log("failed to upload")
      setErrorMessage("Failed to upload the image" + upload.errorMessage)
    }
  }
  return (
    <>
      <Box visibility={CanUpload ? "visible" : "hidden"}>
        <Heading as="h4" size={variant} mt={10} pb={10}>
          Upload Media
        </Heading>

        <Input name="attachment_name" placeholder="Name of attachment" mb={5} />
        <Input onChange={uploadPhoto} type="file" />
      </Box>

      <Alert status="success" visibility={CanUpload ? "hidden" : "visible"}>
        <AlertIcon />
        Image is uploaded
      </Alert>

      <Button
        mt={5}
        visibility={CanUpload ? "hidden" : "visible"}
        onClick={() => {
          setCanUpload(1)
        }}
      >
        Upload Another Image
      </Button>

      <Alert status="error" visibility={errorMessage != null ? "visible" : "hidden"}>
        <AlertIcon />
        Failed to upload the image
      </Alert>
    </>
  )
}
export default UploadImage
