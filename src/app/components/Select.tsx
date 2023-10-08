import React from 'react'
import CreatableSelect from 'react-select/creatable'

import options from '../utils/Database'

type Props = {
  isLoading: boolean
  setDatabase: (value: string) => void
  database: any
}

function Select({ isLoading, database, setDatabase }: Props) {
  return (
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
          color: 'white', // Cor do placeholder
        }),

        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: 'white', // Cor do valorz selecionado
        }),
        input: (baseStyles, state) => ({
          ...baseStyles,
          color: 'white', // Cor do texto da caixa de entrada de pesquisa
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
  )
}

export default Select
