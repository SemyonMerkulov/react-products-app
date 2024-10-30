import { Link } from "react-router-dom";
import { TProduct } from "../types"
import { Loader } from "../ui"

type ProductTableProps = {
  loading: boolean;
  products: TProduct[];
}

export const ProductTable = ({ products, loading }: ProductTableProps) => {
  if (loading) return <Loader />
  return (
    <div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 border">
      <thead className="text-xs text-gray-700 uppercase bg-gray-200">
        <tr>
          <th scope="col" className="px-6 py-3">
            Название
          </th>
          <th scope="col" className="px-6 py-3">
            Артикул
          </th>
          <th scope="col" className="px-6 py-3">
            Цена
          </th>
          <th scope="col" className="px-6 py-3">
            Цена со скидкой
          </th>
          <th scope="col" className="px-6 py-3">
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => {
          return (
            <tr className="bg-white border-b" key={item.id}>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                {item.title}
              </th>
              <td className="px-6 py-4">
                {item.part_number}
              </td>
              <td className="px-6 py-4">
                {item.sell_price}
              </td>
              <td className="px-6 py-4">
                {item.discount_price}
              </td>
              <td className="px-6 py-4">
                <Link to={`/products/${item.id}`}>Посмотреть</Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
</div>

  )
}