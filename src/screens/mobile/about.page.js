import React from 'react'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import GoBackPage from 'components/shared/gobackpage/GoBackPage'
import  ReactMarkdown from 'react-markdown'

import { privacyContent } from 'privacy_policy'
import { terms } from 'terms_and_conditions'

const style = {
  minHeight: '100vh',
  padding: 10,
}

const AboutPage = () => <GoBackPage children={
  <Paper elevation={0} style={style} square>
    <Typography>
      <ReactMarkdown source={terms} />
      <ReactMarkdown source={privacyContent} />
    </Typography>
  </Paper>
} dense />

export default AboutPage
