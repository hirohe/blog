import React, { useEffect, useRef } from 'react'
// @ts-ignore
import hljs from 'highlight.js/lib/highlight'
import { registerLanguage } from './highlightConfig'

export interface CodeBlockProps {
  language: string
  value: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const codeEl = useRef(null)

  const initHighlight = async (language: string) => {
    return registerLanguage(language, hljs)
  }

  const highlightCode = () => {
    initHighlight(language).then(() => {
      hljs.highlightBlock(codeEl.current)
    })
  }

  useEffect(() => {
    highlightCode()
  })

  return (
    <pre>
      <code ref={codeEl} className={language}>
        {value}
      </code>
    </pre>
  )
}

export default CodeBlock
