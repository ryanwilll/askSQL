import React from 'react'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/ext-language_tools'

type Props = {
  readonly?: boolean
  name: string
  value?: string
  resposta?: string
  setSchema: (e: any) => void
}

function EditorCode({ readonly, name, value, setSchema, resposta }: Props) {
  return (
    <>
      {!readonly && (
        <AceEditor
          mode="sql"
          theme="dracula"
          name={name}
          fontSize={15}
          height="150px"
          className="my-4 h-full max-w-full font-mono bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 transition-all duration-300"
          showPrintMargin={true}
          wrapEnabled={true}
          showGutter={true}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
          }}
          onChange={(e) => setSchema(e)}
          highlightActiveLine={false}
          value={value}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      )}
      {readonly && (
        <AceEditor
          readOnly
          mode="sql"
          theme="dracula"
          name={name}
          fontSize={15}
          height="150px"
          className="my-4 h-full max-w-full font-mono bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 transition-all duration-300"
          showPrintMargin={true}
          wrapEnabled={true}
          showGutter={true}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
          }}
          highlightActiveLine={false}
          value={resposta}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      )}
    </>
  )
}

export default EditorCode
