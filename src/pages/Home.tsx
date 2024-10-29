import { ChangeEvent, useEffect, useState } from "react"
import { getProducts } from "../api"
import { ProductTable } from "../components";
import { Pagination } from "../ui";
import { debounce } from "../utils";

export const Home = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [sort, setSort] = useState('');
  const size = 10;

  const fetchData = async () => {
    try {
      const { products, totalPages }= await getProducts({ sort, title, page: currentPage, size })
      setData(products)
      setTotal(totalPages)
    } catch (error) {
      alert('Ошибка загрузки данных');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData()
  }, [currentPage, title, sort])

  const handleNextPage = () => {
    if (currentPage < total) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setCurrentPage(0)
  }, 500);

  const handlePriceSort = (order: 'asc' | 'desc') => {
    order === 'asc' ? setSort('sell_price') : setSort('-sell_price')
    setCurrentPage(0)
  }

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-lg mb-4">Список товаров</h3>
      <div className="flex justify-between my-4">
        <div className="flex flex-1">
          <input 
            onChange={handleSearch}
            placeholder={"Искать по названию"}
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>  
        <div className="flex flex-1 justify-end">
          <button onClick={() => handlePriceSort('asc')} className="text-sm p-4">Сначала дешевые</button>
          <button onClick={() => handlePriceSort('desc')} className="text-sm p-4">Сначала дорогие</button>
        </div>  
      </div>
      <ProductTable loading={isLoading} products={data}/>
      <div className="flex justify-between my-4">
        <Pagination
          onClickNext={handleNextPage}
          onClickPrev={handlePrevPage}
          currentPage={currentPage + 1}
          totalPages={total}
        />
        Всего страниц: {total}
      </div>
    </div>
  )
}