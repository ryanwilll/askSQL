
# ASK SQL

O objetivo principal deste projeto é simplesmente possibilitar a interação de um usuário com uma IA em linguagem natural.

Basta apenas informar o Schema da sua tabela / banco de dados e após isso ele poderá realizar as perguntas.

Vale destacar que a aplicação utiliza uma API da OpenIA gratuita, o que pode gerar algumas lentidões.

## Rodando os testes

Para rodar os testes, faça o seguinte:

- Clone ou baixe o repositório em sua máquina
- Entre na pasta raiz do projeto e instale as dependências com `npm install`
- Crie uma arquivo chamado `.env.local` e neste arquivo configure o parâmetro `OPENAI_API_KEY` com a sua KEY gerada no site da [OpenIA](https://platform.openai.com/account/api-keys)
- Após realizar a configuração da KEY, basta rodar o projeto com `npm run dev | yarn dev | pnpm dev`

## Documentação da API
```http
  GET /api/completion
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `schema` | `string` | **Obrigatório**. Schema do banco de dados/tabela |
| `input` | `string` | **Obrigatório**. Pergunta para a IA |

## Aprendizados

Com este projeto, foi possível aprender muitas coisas, principalmente no que diz a respeito da IA, pois no mundo em que vivemos, cada dia é mais comum essa inteligência fazer parte do nosso cotidiano.

## Demonstração

- [Visualizar o projeto](https://ask-sql.vercel.app/)

![Imagem do Projeto](https://cdn.discordapp.com/attachments/970795622531760170/1142904825323987094/Projeto.png)
![Imagem do Projeto versão desktop](https://cdn.discordapp.com/attachments/1036034786046775297/1148394989555023872/image.png)

## Stack utilizada

- [TailwindCSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/icons/)
- [React Ace](https://www.npmjs.com/package/react-ace)
- [React Loading Skeleton](https://www.npmjs.com/package/react-loading-skeleton)
- [MUI](https://mui.com/)
## Etiquetas

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)

