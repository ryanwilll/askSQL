'use client'
//* Essenciais
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useCompletion } from 'ai/react'
import CreatableSelect from 'react-select/creatable'

//* React Ace -> Textarea em código
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-sql'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/ext-language_tools'

//* Estilização
import GlobalStyles from '@mui/material/GlobalStyles'
import logoImage from '../assets/logo.svg'
import { Trash2, Stars } from 'lucide-react'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Home() {
  const [schema, setSchema] = useState<string>('')
  const [database, setDatabase] = useState<string | undefined>('')
  const [showResult, setShowResult] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const options = [
    { value: 'Firebir', label: 'Firebird' },
    { value: 'MySQL', label: 'MySQL' },
    { value: 'MariaDB', label: 'MariaDB' },
    { value: 'Oracle', label: 'Oracle' },
    { value: 'SQL Server', label: 'SQL Server' },
  ]

  const { completion, handleSubmit, input, handleInputChange } = useCompletion({
    api: './api/completion',
    body: {
      schema,
    },
  })

  const clearFields = () => {
    console.log(database)
    setSchema('')
    setDatabase(undefined)
    setShowResult(false)
    const clearEvent = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>
    handleInputChange(clearEvent)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }, [])

  useEffect(() => {
    console.log(completion)
    completion != '' && setShowResult(true)
  }, [completion])

  return (
    <>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="max-w-[430px] px-4 mx-auto pt-12 pb-4">
          <GlobalStyles
            styles={{
              '*::-webkit-scrollbar': {
                width: '.2em',
              },
              '*::-webkit-scrollbar-track': {
                '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
              },
              '*::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                outline: '1px solid slategrey',
              },
            }}
          />
          <header className="flex items-center justify-between">
            <Image src={logoImage} alt="Logotipo ask sql" />
            <button type="button">
              <Trash2 onClick={clearFields} className="h-8 w-8 text-white" strokeWidth={0.8} />
            </button>
          </header>

          <form onSubmit={handleSubmit} className="py-8 w-full flex flex-col text-foam">
            <label className="text-lg font-light" htmlFor="schema">
              Cole a schema da sua tabela / Banco de dados SQL aqui:
            </label>
            {isLoading ? (
              <Skeleton height={150} className="my-4 h-full max-w-full" />
            ) : (
              <AceEditor
                mode="sql"
                theme="dracula"
                fontSize={15}
                name="schema"
                height="150px"
                className=" my-4 h-full max-w-full bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 transition-all duration-300"
                showPrintMargin={true}
                wrapEnabled={true}
                showGutter={true}
                onChange={(schema) => setSchema(schema)}
                highlightActiveLine={false}
                value={schema}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                }}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
            )}
            <label className="text-lg font-light" htmlFor="question">
              Faça uma pergunta sobre o código:
            </label>

            {isLoading ? (
              <Skeleton height={160} className="my-4 rounded-md px-4 h-40 max-h-40 py-5 " />
            ) : (
              <textarea
                className="my-4 resize-none bg-blueberry-600 border border-blueberry-300 rounded-md px-4 h-40 max-h-40 py-5 outline-none transition-all duration-300 focus:border-[#2684FF] focus:border-2"
                name="question"
                id="question"
                value={input}
                onChange={handleInputChange}
              />
            )}
            <CreatableSelect
              className="mb-4"
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  background: '#151A2A',
                  border: '1px solid #323842',
                  color: 'white',
                }),
                placeholder: (baseStyles, state) => ({
                  ...baseStyles,
                  color: 'gray', // Cor do placeholder
                }),
                singleValue: (baseStyles, state) => ({
                  ...baseStyles,
                  color: 'white', // Cor do valorz selecionado
                }),
              }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  neutral0: '#151A2A',
                  primary25: '#323842',
                  primary50: '#323852',
                },
              })}
              isClearable
              isDisabled={isLoading}
              isLoading={isLoading}
              options={options}
              defaultInputValue={database}
              onChange={(prevValue) => setDatabase(prevValue?.value)}
            />

            {isLoading ? (
              <Skeleton className="h-14" />
            ) : (
              <button
                type="submit"
                className="text-pistachio flex items-center justify-center rounded-lg border border-pistachio h-14 gap-2  hover:border-lime-200 hover:bg-blueberry-300 hover:text- transition-colors duration-500">
                <Stars className="w-6 h-6" />
                Perguntar a inteligência artificial
              </button>
            )}
          </form>

          {showResult && (
            <>
              <div>
                <span className="text-lg font-light text-foam">Resposta:</span>
                <AceEditor
                  readOnly
                  mode="sql"
                  theme="dracula"
                  name="schema"
                  fontSize={15}
                  height="100px"
                  className=" my-4 h-full max-w-full font-mono bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 transition-all duration-300"
                  showPrintMargin={true}
                  wrapEnabled={true}
                  showGutter={true}
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                  }}
                  onChange={(schema) => setSchema(schema)}
                  highlightActiveLine={false}
                  value={completion}
                  setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </SkeletonTheme>
    </>
  )
}
