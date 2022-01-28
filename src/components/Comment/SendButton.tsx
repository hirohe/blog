import React, { useState } from 'react'
import Slide from '@mui/material/Slide'
import Fab from '@mui/material/Fab'
import SendIcon from '@mui/icons-material/Send'
import { animated, useSpring } from 'react-spring'

export interface SendButtonProps {
  sending: boolean
  onSend: () => Promise<boolean>
}

const SendButton: React.FC<SendButtonProps> = ({ sending, onSend }) => {
  const [state, toggle] = useState(true)
  const { x } = useSpring({
    from: { x: 0 },
    x: state ? 1 : 0,
    config: { duration: 500 },
  })

  return (
    <Slide
      in={!sending}
      direction={sending ? 'left' : 'right'}
      timeout={sending ? 200 : 1000}
    >
      <animated.div
        style={{
          float: 'right',
          transform: x
            .interpolate({
              range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
              output: [1, 1.5, 1.1, 0.95, 1, 1.4, 1.1, 1],
            })
            .interpolate((x) => `scale(${x})`),
        }}
      >
        <Fab
          color="primary"
          size="small"
          onClick={async () => {
            const canSend = await onSend()
            !canSend && toggle(!state)
          }}
        >
          <SendIcon />
        </Fab>
      </animated.div>
    </Slide>
  )
}

export default SendButton
