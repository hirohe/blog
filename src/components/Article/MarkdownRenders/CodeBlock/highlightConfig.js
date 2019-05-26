import 'highlight.js/styles/monokai-sublime.css';

export const dynamicLanguageImportMap = {
  'javascript': () => import(/* webpackChunkName: 'hljs/javascript' */ 'highlight.js/lib/languages/javascript'),
  'typescript': () => import(/* webpackChunkName: 'hljs/typescript' */ 'highlight.js/lib/languages/typescript'),
  'css':        () => import(/* webpackChunkName: 'hljs/css' */ 'highlight.js/lib/languages/css'),
  'java':       () => import(/* webpackChunkName: 'hljs/java' */ 'highlight.js/lib/languages/java'),
  'kotlin':     () => import(/* webpackChunkName: 'hljs/kotlin' */ 'highlight.js/lib/languages/kotlin'),
  'python':     () => import(/* webpackChunkName: 'hljs/python' */ 'highlight.js/lib/languages/python'),
  'ruby':       () => import(/* webpackChunkName: 'hljs/ruby' */ 'highlight.js/lib/languages/ruby'),
  'rust':       () => import(/* webpackChunkName: 'hljs/rust' */ 'highlight.js/lib/languages/rust'),
  'cpp':        () => import(/* webpackChunkName: 'hljs/cpp' */ 'highlight.js/lib/languages/cpp'),
  'objectivec': () => import(/* webpackChunkName: 'hljs/objectivec' */ 'highlight.js/lib/languages/objectivec'),
  'swift':      () => import(/* webpackChunkName: 'hljs/swift' */ 'highlight.js/lib/languages/swift'),
  'go':         () => import(/* webpackChunkName: 'hljs/go' */ 'highlight.js/lib/languages/go'),
  'bash':       () => import(/* webpackChunkName: 'hljs/bash' */ 'highlight.js/lib/languages/bash'),
  'dart':       () => import(/* webpackChunkName: 'hljs/dart' */ 'highlight.js/lib/languages/dart'),
  'json':       () => import(/* webpackChunkName: 'hljs/json' */ 'highlight.js/lib/languages/json'),
  'xml':        () => import(/* webpackChunkName: 'hljs/xml' */ 'highlight.js/lib/languages/xml'),
  'yaml':       () => import(/* webpackChunkName: 'hljs/yaml' */ 'highlight.js/lib/languages/yaml'),
  'sql':        () => import(/* webpackChunkName: 'hljs/sql' */ 'highlight.js/lib/languages/sql'),
  'dockerfile': () => import(/* webpackChunkName: 'hljs/dockerfile' */ 'highlight.js/lib/languages/dockerfile'),
};

export async function registerLanguage(language, hljs) {
  if (hljs.listLanguages().indexOf(language) === -1) {
    const importer = dynamicLanguageImportMap[language];
    if (importer) {
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
