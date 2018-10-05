import React from 'react'
import ContentLoader from 'react-content-loader'

export const placeHolder = () => {
  return <ContentLoader height={345}
    preserveAspectRatio={"xMidYMid meet"}>
    <rect x="0" y="0" rx="0" ry="0" width="400" height="230" />
    <rect x="0" y="240" rx="0" ry="0" width="100" height="10" />
    <rect x="0" y="260" rx="0" ry="0" width="380" height="6.4" />
    <rect x="0" y="270" rx="0" ry="0" width="350" height="6.4" />
    <rect x="0" y="280" rx="0" ry="0" width="360" height="6.4" />
    <rect x="0" y="290" rx="0" ry="0" width="350" height="6.4" />
    <rect x="0" y="300" rx="0" ry="0" width="370" height="6.4" />
  </ContentLoader>
}
