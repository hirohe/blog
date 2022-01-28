import React from 'react'
import Avatar from '@mui/material/Avatar'
import Identicon from 'identicon.js'

export interface IdenticonAvatarProps {
  name: string
  hash: string
}

const IdenticonAvatar: React.FC<IdenticonAvatarProps> = ({ name, hash }) => {
  return (
    <Avatar
      alt={name || ''}
      src={'data:image/png;base64,' + new Identicon(hash, 200).toString()}
    />
  )
}

export default IdenticonAvatar
