'use client'
//* Essenciais
import { useState, useEffect, useRef } from 'react'
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
  const [error, setError] = useState<string>('')
  const [database, setDatabase] = useState<any>([{}])
  const [showResult, setShowResult] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const formRef = useRef(null)
  const underMaintenance = true

  const options = [
    { value: 'Firebird', label: 'Firebird' },
    { value: 'MySQL', label: 'MySQL' },
    { value: 'MariaDB', label: 'MariaDB' },
    { value: 'Oracle', label: 'Oracle' },
    { value: 'SQL Server', label: 'SQL Server' },
    { value: 'PostgreSQL', label: 'PostgreSQL' },
    { value: 'SQLite', label: 'SQLite' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Cassandra', label: 'Cassandra' },
    { value: 'Redis', label: 'Redis' },
    { value: 'DB2', label: 'IBM DB2' },
    { value: 'Sybase', label: 'Sybase' },
    { value: 'Informix', label: 'IBM Informix' },
    { value: 'Teradata', label: 'Teradata' },
    { value: 'InfluxDB', label: 'InfluxDB' },
  ]

  const { completion, handleSubmit, input, handleInputChange } = useCompletion({
    api: './api/completion',
    body: {
      schema,
      database,
    },
  })

  const clearFields = () => {
    setSchema('')
    setError('')
    setDatabase({ value: '', label: '' })
    setShowResult(false)
    const clearEvent = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>
    handleInputChange(clearEvent)
  }

  const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')

    if (schema.length <= 0) {
      setError('Você precisa precisa informar sua schema')
      return
    }

    if (input.length <= 0) {
      setError('Você precisa precisa fazer uma pergunta')
      return
    }

    if (database?.length <= 1) {
      setError('Você precisa precisa selecionar o tipo do seu SGBD')
      return
    }

    try {
      setIsLoading(true)
      await handleSubmit(e)
    } catch (error: any | unknown) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }, [])

  useEffect(() => {
    completion != '' && setShowResult(true)
  }, [completion])

  return (
    <>
      {!underMaintenance && (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className="max-w-[430px] min-h-max px-4 mx-auto pt-12 pb-8">
            <GlobalStyles
              styles={{
                '*::-webkit-scrollbar': {
                  width: '.4em',
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
                <Trash2
                  onClick={clearFields}
                  className="h-12 w-12 rounded-md py-2 px-2 text-white  hover:bg-gray-800 hover:text-red-500 transition-all ease-in-out duration-300"
                  strokeWidth={0.8}
                />
              </button>
            </header>

            <form ref={formRef} id="form" name="form" onSubmit={enviarFormulario} className="py-8 w-full flex flex-col text-foam">
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
                  className="my-4 h-full max-w-full bg-blueberry-600 border border-blueberry-300 rounded-md px-4 py-3 transition-all duration-300"
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
                  className="my-4 resize-none bg-blueberry-600 border border-blueberry-300 rounded-md px-4 h-40 max-h-40 py-5 outline-none transition-all duration-300"
                  name="question"
                  id="question"
                  value={input}
                  onChange={handleInputChange}
                />
              )}
              <span className="text-lg font-light">Qual o seu sistema SGBD?</span>
              <CreatableSelect
                className="my-4"
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
                onChange={(prevValue) => setDatabase(prevValue?.value)}
                value={database?.label}
                maxMenuHeight={150}
              />

              {isLoading ? (
                <Skeleton className="h-14" />
              ) : (
                <button
                  type="submit"
                  className="mt-4 disabled:opacity-30 disabled:hover:bg-blueberry-900 disabled:cursor-not-allowed text-pistachio flex items-center justify-center rounded-lg border border-pistachio h-14 gap-2  hover:border-lime-200 hover:bg-blueberry-300 transition-colors duration-500">
                  <Stars className="w-6 h-6" />
                  Perguntar a inteligência artificial
                </button>
              )}
              {error && <p className="text-center mt-2 text-red-600 font-bold">{error}</p>}
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
      )}
      {underMaintenance && (
        <>
          <div className="flex flex-col justify-center items-center h-screen">
            <h2 className="text-2xl mt-5 font-light text-red-500 text-center">Ops, site indisponível no momento!</h2>
            <p className="text-white text-center mt-2 w-[80vw]">
              Estamos passando por uma fase de manutenção em nosso site ASK SQL, que inclui a integração com o CHATGPT.
              Infelizmente, não temos uma previsão exata para a conclusão dos trabalhos. Agradecemos a sua compreensão e paciência
              neste momento
            </p>
          </div>
        </>
      )}
    </>
  )
}
