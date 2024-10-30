import { ProductForm } from "../components/ProductForm"

export const CreateProduct = () => {
  return (
    <div className="container mx-auto p-4">
      <h3 className="text-lg mb-4">Добавить товар</h3>
      <ProductForm />
    </div>  
  )
}