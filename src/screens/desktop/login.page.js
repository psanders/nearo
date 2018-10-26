import React from 'react'
import GoBackPage from 'components/shared/gobackpage/GoBackPage'
import Login from 'components/shared/login/Login'
const ProfilePage = () => <GoBackPage children={ <Login /> } />
export default ProfilePage
