import 'highlight.js/styles/monokai-sublime.css'

export const dynamicLanguageImportMap = {
  javascript: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/javascript' */ 'highlight.js/lib/languages/javascript'
    ),
  typescript: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/typescript' */ 'highlight.js/lib/languages/typescript'
    ),
  css: () =>
    // @ts-ignore
    import(/* webpackChunkName: 'hljs/css' */ 'highlight.js/lib/languages/css'),
  java: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/java' */ 'highlight.js/lib/languages/java'
    ),
  kotlin: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/kotlin' */ 'highlight.js/lib/languages/kotlin'
    ),
  python: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/python' */ 'highlight.js/lib/languages/python'
    ),
  ruby: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/ruby' */ 'highlight.js/lib/languages/ruby'
    ),
  rust: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/rust' */ 'highlight.js/lib/languages/rust'
    ),
  cpp: () =>
    // @ts-ignore
    import(/* webpackChunkName: 'hljs/cpp' */ 'highlight.js/lib/languages/cpp'),
  objectivec: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/objectivec' */ 'highlight.js/lib/languages/objectivec'
    ),
  swift: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/swift' */ 'highlight.js/lib/languages/swift'
    ),
  go: () =>
    // @ts-ignore
    import(/* webpackChunkName: 'hljs/go' */ 'highlight.js/lib/languages/go'),
  bash: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/bash' */ 'highlight.js/lib/languages/bash'
    ),
  dart: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/dart' */ 'highlight.js/lib/languages/dart'
    ),
  json: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/json' */ 'highlight.js/lib/languages/json'
    ),
  xml: () =>
    // @ts-ignore
    import(/* webpackChunkName: 'hljs/xml' */ 'highlight.js/lib/languages/xml'),
  yaml: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/yaml' */ 'highlight.js/lib/languages/yaml'
    ),
  sql: () =>
    // @ts-ignore
    import(/* webpackChunkName: 'hljs/sql' */ 'highlight.js/lib/languages/sql'),
  dockerfile: () =>
    import(
      // @ts-ignore
      /* webpackChunkName: 'hljs/dockerfile' */ 'highlight.js/lib/languages/dockerfile'
    ),
}

// @ts-ignore
export async function registerLanguage(language: string, hljs) {
  if (hljs.listLanguages().indexOf(language) === -1) {
    // @ts-ignore
    const importer = dynamicLanguageImportMap[language]
    if (importer) {
      // @ts-ignore
      return importer().then((result) => {
        hljs.registerLanguage(language, result.default)
        return true
      })
    }

    return false
  } else {
    return true
  }
}
