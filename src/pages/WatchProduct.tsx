import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteProduct, getProductById } from "../api";
import { TProduct } from "../types";
import { ConfirmModal } from "../components";

export const WatchProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState<TProduct | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await getProductById(id as string)
      setData(response)
    } catch (error) {
      alert('Ошибка загрузки данных');
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const confirmDelete = () => {
    deleteProduct(id as string)
    .then(() => {
      alert("Товар удален")
    })
    .catch(() => {
      alert("Не удалось удалить товар")
    })
    .finally(() => {
      setIsModalOpen(false);
    })
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

  if (!data) return null

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex mb-4">
          <div className="w-1/2 px-4">
            <img src={data.image_url} alt={data.title}/>
          </div>
          <div className="w-1/2 px-4">
            <h3 className="text-lg mb-4">{data.title}</h3>
            <p>Артикул: {data.part_number}</p>
            <br/>
            <p>{data.description}</p>
            <br/>
            <p>Цена: <strong>{data.sell_price}</strong></p>
            {data.discount_price && <p>Со скидкой: <strong>{data.discount_price}</strong></p>}
            <br/>
            <div>
              <Link to={`/products/${data.id}/edit`}>Редактировать</Link>
              <button className="text-red-500 mx-4" onClick={() => setIsModalOpen(true)}>Удалить</button>
            </div>
          </div>
        </div>  
      </div>
      {isModalOpen && (
        <ConfirmModal
          message="Вы уверены, что хотите удалить этот элемент?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>  
  )
}