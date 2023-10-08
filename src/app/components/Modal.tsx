import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

function Modal({ isOpen, setIsOpen }: Props) {
  return (
    <>
      {isOpen && (
        <AnimatePresence>
          <motion.div
            onClick={() => setIsOpen(false)}
            initial={{
              top: '-100%',
              opacity: 0,
            }}
            animate={{ top: 0, dur: 1, opacity: 1 }}
            className="absolute z-10 top-0 left-0  bottom-0 h-screen w-screen bg-slate-950 bg-opacity-75  flex 
                     justify-center items-center">
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-zinc-200 flex flex-col gap-4 py-2 px-4 rounded w-[600px] smallTablet:max-w-sm">
              <nav className="relative py-2 after:w-full after:h-[2px] after:bg-gray-700 after:absolute after:bottom-0 flex items-center">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-black absolute right-0 h-12 w-fit rounded-full flex items-center justify-center 
                         hover:text-red-600 duration-300 transition-colors">
                  <X />
                </button>
                <h3 className="text-black">O que há de novo?</h3>
              </nav>
              <details open className="text-black">
                <summary className="font-bold cursor-pointer">
                  Feature #01
                  <span className="font-normal text-xs">
                    <sup> (08/10/2023)</sup>
                  </span>
                </summary>
                <ul className="list-disc ml-8 flex flex-col gap-2 mt-6 pb-6">
                  <h6 className="font-bold italic">Novos recursos:</h6>
                  <li>Nova integração com o GPT-4 (paga 😢)</li>
                  <li>Adicionado novo botão para copiar a resposta</li>
                  <li>Adicionado alguns Tooltips descritivos</li>
                  <li>Definido timeout de 20s para cada pergunta</li>
                  <li>Adicionado mais 9 tipos de bancos de dados</li>
                  <li>Incluso os créditos e direcionamentos para o portfólio e github</li>

                  <br />

                  <h6 className="font-bold italic">Correções:</h6>
                  <li>Ajustes para mostrar loading da resposta</li>
                  <li>Ajustado a cor do texto do input "Selecione seu SGBD"</li>
                </ul>
              </details>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      {!isOpen && <></>}
    </>
  )
}

export default Modal
