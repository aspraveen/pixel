import { Text } from "@chakra-ui/react"
import { Fragment } from "react"
import useSWR from "swr"

const PostStatistics = ({ postId }) => {

    return (
        <Fragment>
         <Text>Views {PostCount(postId)}</Text>
            <Text> Likes 0</Text>
        </Fragment>
        )


}
const getPostCount = async () => {
    const res = await fetch('/api/posts')
    if (!res.ok) {
        throw new Error("error")
    }
    return res.json()
}
const PostCount = (postId) => {
    let cnt = 0
    const { data, error } = useSWR('/api/posts', getPostCount)
    if (error) return <div> failed to load</div>
    if (!data) return <div>loading..</div>
    //console.log(data.data.posts)
    data.forEach((d) => {
        console.log(d.id,'-',postId)
        if(d.id == postId){
            cnt = d.viewCount
        }

    })
    return cnt
}
export default PostStatistics
