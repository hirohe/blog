import 'highlight.js/styles/monokai-sublime.css';

export const dynamicLanguageImportMap = {
  // @ts-ignore
  'javascript': () => import(/* webpackChunkName: 'hljs/javascript' */ 'highlight.js/lib/languages/javascript'),
  // @ts-ignore
  'typescript': () => import(/* webpackChunkName: 'hljs/typescript' */ 'highlight.js/lib/languages/typescript'),
  // @ts-ignore
  'css':        () => import(/* webpackChunkName: 'hljs/css' */ 'highlight.js/lib/languages/css'),
  // @ts-ignore
  'java':       () => import(/* webpackChunkName: 'hljs/java' */ 'highlight.js/lib/languages/java'),
  // @ts-ignore
  'kotlin':     () => import(/* webpackChunkName: 'hljs/kotlin' */ 'highlight.js/lib/languages/kotlin'),
  // @ts-ignore
  'python':     () => import(/* webpackChunkName: 'hljs/python' */ 'highlight.js/lib/languages/python'),
  // @ts-ignore
  'ruby':       () => import(/* webpackChunkName: 'hljs/ruby' */ 'highlight.js/lib/languages/ruby'),
  // @ts-ignore
  'rust':       () => import(/* webpackChunkName: 'hljs/rust' */ 'highlight.js/lib/languages/rust'),
  // @ts-ignore
  'cpp':        () => import(/* webpackChunkName: 'hljs/cpp' */ 'highlight.js/lib/languages/cpp'),
  // @ts-ignore
  'objectivec': () => import(/* webpackChunkName: 'hljs/objectivec' */ 'highlight.js/lib/languages/objectivec'),
  // @ts-ignore
  'swift':      () => import(/* webpackChunkName: 'hljs/swift' */ 'highlight.js/lib/languages/swift'),
  // @ts-ignore
  'go':         () => import(/* webpackChunkName: 'hljs/go' */ 'highlight.js/lib/languages/go'),
  // @ts-ignore
  'bash':       () => import(/* webpackChunkName: 'hljs/bash' */ 'highlight.js/lib/languages/bash'),
  // @ts-ignore
  'dart':       () => import(/* webpackChunkName: 'hljs/dart' */ 'highlight.js/lib/languages/dart'),
  // @ts-ignore
  'json':       () => import(/* webpackChunkName: 'hljs/json' */ 'highlight.js/lib/languages/json'),
  // @ts-ignore
  'xml':        () => import(/* webpackChunkName: 'hljs/xml' */ 'highlight.js/lib/languages/xml'),
  // @ts-ignore
  'yaml':       () => import(/* webpackChunkName: 'hljs/yaml' */ 'highlight.js/lib/languages/yaml'),
  // @ts-ignore
  'sql':        () => import(/* webpackChunkName: 'hljs/sql' */ 'highlight.js/lib/languages/sql'),
  // @ts-ignore
  'dockerfile': () => import(/* webpackChunkName: 'hljs/dockerfile' */ 'highlight.js/lib/languages/dockerfile'),
};

// @ts-ignore
export async function registerLanguage(language: string, hljs) {
  if (hljs.listLanguages().indexOf(language) === -1) {
    // @ts-ignore
    const importer = dynamicLanguageImportMap[language];
    if (importer) {
      // @ts-ignore
      return importer().then(result => {
        hljs.registerLanguage(language, result.default);
        return true;
      });
    }

    return false;
  } else {
    return true;
  }
}
