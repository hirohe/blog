import React, { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import { registerLanguage } from './highlightConfig'

export interface CodeBlockProps {
  language: string
  value: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, value }) => {
  const codeEl = useRef<HTMLElement>(null)

  const initHighlight = async (language: string) => {
    return registerLanguage(language, hljs)
  }

  const highlightCode = () => {
    initHighlight(language).then(() => {
      if (codeEl.current) {
        hljs.highlightBlock(codeEl.current)
      }
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
