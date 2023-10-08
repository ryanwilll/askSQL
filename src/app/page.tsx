'use client'
//* Essenciais
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useCompletion } from 'ai/react'

//* Componentes
import Modal from './components/Modal'
import Navbar from './components/Navbar'
import Select from './components/Select'
import EditorCode from './components/EditorCode'

//* Estilização
import GlobalStyles from '@mui/material/GlobalStyles'
import logoImage from '../assets/logo.svg'
import { Trash2, Stars, Copy } from 'lucide-react'

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Tooltip } from 'react-tooltip'

export default function Home() {
  const [schema, setSchema] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [database, setDatabase] = useState<any>('')
  const [showResult, setShowResult] = useState<boolean>(false)
  const [tooltipText, setTooltipText] = useState('Copiar resposta')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isTimeout, setIsTimeout] = useState<boolean>(false)
  const [resIsLoading, setResIsLoading] = useState<boolean>(false)

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)

  const formRef = useRef(null)
  const underMaintenance = false

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
    setDatabase({ label: '' })
    setShowResult(false)
    const clearEvent = { target: { value: '' } } as React.ChangeEvent<HTMLInputElement>
    handleInputChange(clearEvent)
  }

  const enviarFormulario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')

    if (underMaintenance) {
      return
    }

    if (schema.length <= 0) {
      setError('Você precisa precisa informar sua schema')
      return
    }

    if (input.length <= 0) {
      setError('Você precisa precisa fazer uma pergunta')
      return
    }

    if (!database || database.length <= 0 || !database[0]) {
      setError('Você precisa selecionar o tipo do seu SGBD')
      return
    }

    try {
      setIsLoading(true)
      setResIsLoading(true)
      handleSubmit(e)
    } catch (error: any | unknown) {
      setError(error.message)
    }

    setIsLoading(false)
    setIsTimeout(true)

    setTimeout(() => {
      setIsTimeout(false)
    }, 20000)
  }

  const copyResult = () => {
    setTooltipText('✅ Copiado!')
    navigator.clipboard.writeText(completion)

    setTimeout(() => {
      setTooltipText('Copiar resposta')
    }, 4000)
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 200)
  }, [])

  useEffect(() => {
    setResIsLoading(false)
    completion != '' && setShowResult(true)
  }, [completion])

  return (
    <>
      <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen} />

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
            <button type="button" data-tooltip-id="clear" data-tooltip-content="Limpar campos">
              <Trash2
                onClick={clearFields}
                className="h-12 w-12 rounded-md py-2 px-2 text-white hover:bg-gray-800 hover:text-red-500 
                           transition-all ease-in-out duration-300"
                strokeWidth={0.8}
              />
              <Tooltip id="clear" place="right-start" />
            </button>
          </header>

          <Navbar openModal={openModal} />

          <form ref={formRef} id="form" name="form" onSubmit={enviarFormulario} className="py-8 w-full flex flex-col text-foam">
            <label className="text-lg font-light" htmlFor="schema">
              Cole a schema da(s) sua(s) tabela(s) aqui:
            </label>
            {isLoading ? (
              <Skeleton height={150} className="my-4 h-full max-w-full" />
            ) : (
              <EditorCode name="schema" value={schema} setSchema={setSchema} />
            )}
            <label className="text-lg font-light" htmlFor="question">
              Faça uma pergunta sobre a sua schema:
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

            <label className="text-lg font-light">Qual o seu sistema SGBD?</label>
            <Select isLoading={isLoading} database={database} setDatabase={setDatabase} />

            {isLoading ? (
              <Skeleton className="h-14" />
            ) : (
              <>
                <button
                  disabled={underMaintenance || isTimeout}
                  type="submit"
                  className="mt-4 disabled:opacity-30 disabled:hover:bg-blueberry-900 disabled:cursor-not-allowed 
                  text-pistachio flex items-center justify-center rounded-lg border border-pistachio h-14 gap-2  
                  hover:border-lime-200 hover:bg-blueberry-300 transition-colors duration-500">
                  <Stars className="w-6 h-6" />
                  Perguntar a inteligência artificial
                </button>
                {isTimeout && <p className="text-center mt-2 text-white">Aguarde alguns segundos para perguntar novamente.</p>}
                {underMaintenance && <p className="text-center mt-2 text-red-600">Estamos em manutenção, por favor aguarde.</p>}
              </>
            )}

            {error && <p className="text-center mt-2 text-red-600 font-bold">{error}</p>}
          </form>

          {resIsLoading && <Skeleton height={150} className="my-4 h-full max-w-full" />}

          {showResult && (
            <>
              <div>
                <span className="text-lg font-light text-foam relative">
                  Resposta:
                  <button
                    onClick={copyResult}
                    className="text-white absolute top-0 left-24"
                    data-tooltip-id="copy"
                    data-tooltip-variant={tooltipText.includes('Copiar') ? 'dark' : 'success'}
                    data-tooltip-content={tooltipText}>
                    <Copy />
                  </button>
                  <Tooltip id="copy" place="right-end" />
                </span>
                <EditorCode name="result" readonly resposta={completion} setSchema={setSchema} />
              </div>
            </>
          )}
        </div>

        <p className="text-center text-yellow-50 pb-4">
          Desenvolvido por {''}
          <a
            href="https://ryanwill.vercel.app"
            target="_blank"
            className="underline hover:text-green-400 transition-colors duration-300">
            Ryan Will Darós
          </a>
        </p>
      </SkeletonTheme>
    </>
  )
}
