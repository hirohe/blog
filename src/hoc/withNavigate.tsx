import React from 'react'
import { useNavigate } from 'react-router-dom'

export interface WithNavigate {
  navigate: ReturnType<typeof useNavigate>
}

export default function <P extends WithNavigate>(
  Component: React.ComponentType<P>
) {
  return function WrappedComponent(props: any) {
    const navigate = useNavigate()
    return <Component {...props} navigate={navigate} />
  }
}
