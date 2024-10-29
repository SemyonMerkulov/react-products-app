type PaginationProps = {
  onClickPrev: () => void,
  onClickNext: () => void,
  currentPage: number,
  totalPages: number,
}

export const Pagination = ({ onClickPrev, onClickNext, currentPage, totalPages }: PaginationProps) => {
  return (
    <nav>
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button onClick={onClickPrev} disabled={currentPage === 1} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">Назад</button>
        </li>
        <li>
          <span className="flex items-center justify-center px-3 h-8 border border-gray-300">{currentPage}</span>
        </li>
        <li>
          <button onClick={onClickNext} disabled={currentPage === totalPages} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">Вперед</button>
        </li>
      </ul>
    </nav>
  )
}