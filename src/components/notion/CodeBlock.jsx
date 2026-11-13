import { useEffect, useRef, useState } from 'react';
import { Highlight, Prism, themes } from 'prism-react-renderer';
import { Check, Copy } from 'lucide-react';

// prism-react-renderer ships a core set of languages; add the ones the blog uses.
globalThis.Prism = Prism;
require('prismjs/components/prism-java');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-docker');

// Notion language names -> Prism grammar names
const LANGUAGE_ALIASES = {
  'plain text': 'plain',
  shell: 'bash',
  'c++': 'cpp',
  'c#': 'csharp',
  html: 'markup',
  xml: 'markup',
  dockerfile: 'docker',
};

const LANGUAGE_LABELS = {
  plain: 'Text',
  bash: 'Shell',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  json: 'JSON',
  yaml: 'YAML',
  sql: 'SQL',
  markup: 'HTML',
  docker: 'Dockerfile',
  go: 'Go',
  cpp: 'C++',
};

const resolveLanguage = (notionLanguage = 'plain text') => {
  const name = LANGUAGE_ALIASES[notionLanguage] ?? notionLanguage;
  return Prism.languages[name] ? name : 'plain';
};

const labelFor = (language, notionLanguage) =>
  LANGUAGE_LABELS[language] ??
  notionLanguage.charAt(0).toUpperCase() + notionLanguage.slice(1);

const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition hover:bg-white/10 hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400"
      aria-label={copied ? 'Copied to clipboard' : 'Copy code'}
    >
      {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
};

/** Syntax-highlighted code with a language label and copy button. */
const CodeBlock = ({ code, language: notionLanguage = 'plain text', caption }) => {
  const language = resolveLanguage(notionLanguage);
  const trimmed = code.replace(/\n+$/, '');

  return (
    <figure className="not-prose my-8 overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-900/10">
      <div className="flex items-center justify-between border-b border-white/10 py-1.5 pl-5 pr-2">
        <span className="text-xs font-medium text-zinc-400">
          {labelFor(language, notionLanguage)}
        </span>
        <CopyButton code={trimmed} />
      </div>
      <Highlight theme={themes.oneDark} code={trimmed} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-x-auto px-5 py-4 text-[0.8125rem] leading-6 text-zinc-100">
            <code>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
      {caption && (
        <figcaption className="border-t border-white/10 px-5 py-2 text-xs text-zinc-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

export default CodeBlock;
