import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TProduct } from "../types";
import { API_DOMAIN, createProduct, updateProduct, uploadImage } from "../api";

type ProductFormProps = {
  defaultValues?: TProduct;
  // onSubmit: (...args: any) => Promise<any>;
}

const requiredStr = "Это поле обязательно"

const schema = yup.object().shape({
  title: yup.string().required(requiredStr),
  description: yup.string(),
  sell_price: yup.number().required(requiredStr),
  discount_price: yup.number(),
  part_number: yup.string().required(requiredStr),
  image_url: yup.string().nullable(),
});

export const ProductForm = ({ defaultValues }: ProductFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({ 
    defaultValues,
    resolver: yupResolver(schema),
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    selectedFile ? setFile(selectedFile) : setFile(null)

    e.target.value = '';  
  };

  useEffect(() => {
    handleFileUpload()
  }, [file])

  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('filedata', file);

    try {
      const fileName = await uploadImage(formData);
      setValue('image_url', `${API_DOMAIN}/images/${fileName}`)
    } catch (error) {
      alert('Ошибка загрузки файла')
    }
  };


  const onFormSubmit = (data: any) => {
   if (defaultValues?.id) {
    updateProduct(defaultValues.id, data)
      .then(() => alert('Данные обновлены'))
      .catch((_) => alert('Ошибка редактирования'))
   } else {
    createProduct(data)
      .then(() => alert('Товар добавлен'))
      .catch((_) => alert('Ошибка добавления'))
   }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div>
          <label htmlFor="title" className="block text-gray-700">Название:</label>
          <input
            id="title"
            {...register('title')}
            className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          <label htmlFor="desc" className="block text-gray-700">Описание:</label>
          <input
            id="desc"
            {...register('description')}
            className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="part_number" className="block text-gray-700">Артикул:</label>
          <input
            id="part_number"
            {...register('part_number')}
            className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.part_number && <p className="text-red-500">{errors.part_number.message}</p>}
          <label htmlFor="sell_price" className="block text-gray-700">Цена:</label>
          <input
            id="sell_price"
            {...register('sell_price')}
            className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          {errors.sell_price && <p className="text-red-500">{errors.sell_price.message}</p>}
          <label htmlFor="discount_price" className="block text-gray-700">Цена со скидкой:</label>
          <input
            id="discount_price"
            {...register('discount_price')}
            className="w-full mb-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-center w-64 h-12 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition">
            <span>{file?.name || "Добавьте новый файл"}</span>
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          {file && <p>Выбран файл: {file.name}</p>}
        </div>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          Отправить
        </button>      
      </form>
    </>
  )
}