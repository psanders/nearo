import React from 'react'
import Paper from '@material-ui/core/Paper'
import GoBackPage from 'components/shared/gobackpage/GoBackPage'
import Profile from 'components/shared/profile/Profile'
const style = { minHeight: 'calc(100vh - 55px)' }
const ProfilePage = () => <GoBackPage children={ <Paper style={style}><Profile /></Paper> } />
export default ProfilePage
