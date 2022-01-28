import React, { ReactElement } from 'react'
import { Tweet } from 'react-twitter-widgets'

const tweetIdRegex = /^tweet:(\d+)/
const biliIdRegex = /^bilibili:(\d+):?(\d+)?/

export interface BlockQuoteProps {
  children: React.ReactNode | React.ReactNodeArray
}

const BlockQuote: React.FC<BlockQuoteProps> = (props) => {
  const { children } = props

  if (children) {
    return (
      <div>
        {(children as React.ReactNodeArray).map((child, i) => {
          if (child) {
            const text = (child as ReactElement).props?.children[0]
            if (text) {
              //render for twitter '> tweet:842211276147179520'
              if (tweetIdRegex.test(text)) {
                const result = tweetIdRegex.exec(text)
                if (result) {
                  const tweetId = result[1]
                  return <Tweet tweetId={tweetId} key={i} />
                }
              }

              //render for bilibili '> bilibili:123:123'
              if (biliIdRegex.test(text)) {
                const result = biliIdRegex.exec(text)
                if (result) {
                  return (
                    <iframe
                      title={'bilibili-player'}
                      key={i}
                      height="200px"
                      src={`//player.bilibili.com/player.html?aid=${result[1]}&cid=${result[2]}`}
                      allowFullScreen={true}
                      frameBorder={0}
                    />
                  )
                }
              }
            }
            return <blockquote key={i}>{child}</blockquote>
          }

          return null
        })}
      </div>
    )
  } else {
    return null
  }
}

export default BlockQuote
