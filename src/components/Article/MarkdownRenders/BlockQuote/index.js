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
            const text = child.props.children[0];
            if (text) {

              //render for twitter '> tweet:842211276147179520'
              if (text.startsWith('tweet')) {
                const result = tweetIdRegex.exec(text);
                if (result) {
                  const tweetId = result[1];
                  return <Tweet tweetId={tweetId} key={i}/>
                }
              }

              //render for bilibili '> bilibili:123:123'
              if (text.startsWith('bilibili')) {
                const result = biliIdRegex.exec(text);
                if (result) {
                  return <iframe
                    title="bili"
                    key={i}
                    height="200px"
                    src={`https://www.bilibili.com/blackboard/html5player.html?cid=21005778&aid=12777370`}
                    scrolling="no" frameBorder="no" width="100%"
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
