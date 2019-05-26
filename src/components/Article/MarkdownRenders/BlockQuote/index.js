import React from 'react';
import { Tweet } from 'react-twitter-widgets';

const tweetIdRegex = /^tweet:(\d+)/;
const biliIdRegex = /^bilibili:(\d+):?(\d+)?/;

class BlockQuote extends React.Component {

  render() {

    const { children } = this.props;

    return (
      <div>
        {
          children.map((child, i) => {
            const textComponent = child.props.children[0];
            const text = textComponent.props.children;
            if (text) {

              //render for twitter '> tweet:842211276147179520'
              if (tweetIdRegex.test(text)) {
                const result = tweetIdRegex.exec(text);
                if (result) {
                  const tweetId = result[1];
                  return <Tweet tweetId={tweetId} key={i}/>
                }
              }

              //render for bilibili '> bilibili:123:123'
              if (biliIdRegex.test(text)) {
                const result = biliIdRegex.exec(text);
                if (result) {
                  return <iframe
                    key={i}
                    height="200px"
                    src={`//player.bilibili.com/player.html?aid=${result[1]}&cid=${result[2]}`}
                    allowFullScreen={true}
                    frameBorder={0}
                  />
                }
              }

            }
            return <blockquote key={i}>{child}</blockquote>
          })
        }
      </div>
    )

  }

}

export default BlockQuote;
