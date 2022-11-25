import Head from "next/head"

const Seo = ({
  title = "Welcome to PixelDigit.com",
  description = "I'm Praveen and I work as a software engineer as well as a technical consultant. Over the last 18 years, I have worked on several projects focusing on business improvements, customer service and value delivery. I want to share my thoughts and ideas through this blog.",
  keywords = "Fullstack developer, Oracle Certified, AWS Certified, Google Cloud Certified, React, Next Js, oracle apex, movies bahrain, movie lover",
}) => {
  return (
    <Head>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest"></link>
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" sizes="any" />
      <link rel="mask-icon" href="/favicon.svg" color="#000000" />
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="praveen" />
    </Head>
  )
}
export default Seo
