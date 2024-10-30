import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../api";
import { ProductForm } from "../components/ProductForm";

export const UpdateProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState(null)

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
  }, [id])

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-lg mb-4">Редактировать товар</h3>
      {data && <ProductForm defaultValues={data}/>}
    </div>  
  )
}