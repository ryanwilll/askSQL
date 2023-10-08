import React from 'react'
import { Github, GalleryVerticalEnd, BellPlus } from 'lucide-react'
import { Tooltip } from 'react-tooltip'

type Props = {
  openModal: () => void
}

function Navbar({ openModal }: Props) {
  return (
    <aside
      className="flex flex-col justify-center gap-4 w-fit h-full fixed top-0 left-2 
                          smallTablet:flex-row smallTablet:absolute smallTablet:h-fit 
                          smallTablet:w-full smallTablet:gap-24">
      <span
        className="absolute top-4 smallTablet:top-0 text-red-500 cursor-pointer hover:bg-gray-800 py-2 px-2 rounded-md"
        onClick={openModal}
        data-tooltip-id="news"
        data-tooltip-variant="dark">
        <Tooltip id="news" content="Ver Novidades" place="right-start" />
        <BellPlus />
      </span>
      <a
        href="https://github.com/ryanwilll/"
        target="_blank"
        className="flex gap-1 text-white hover:bg-gray-800 py-2 px-2 rounded-md"
        data-tooltip-id="Github"
        data-tooltip-content="Github">
        <Github />
        <Tooltip id="Github" place="right-start" />
      </a>
      <a
        href="https://ryanwill.vercel.app"
        target="_blank"
        className="flex gap-1 text-white hover:bg-gray-800 py-2 px-2 rounded-md"
        data-tooltip-id="Portfolio"
        data-tooltip-content="Portfólio">
        <GalleryVerticalEnd />
        <Tooltip id="Portfolio" place="right-start" />
      </a>
    </aside>
  )
}

export default Navbar
