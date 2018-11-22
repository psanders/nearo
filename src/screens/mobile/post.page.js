import React from 'react'
import GoBackPage from 'components/shared/gobackpage/GoBackPage'
import PostView from 'components/mobile/postview/PostView'
const PostPage = () => <GoBackPage children={ <PostView /> } dense/>
export default PostPage
