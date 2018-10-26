import React from 'react'
import GoBackPage from 'components/shared/gobackpage/GoBackPage'
import PostView from 'components/desktop/postview/PostView'

const ProfilePage = () => <GoBackPage children={ <PostView /> } />

export default ProfilePage
