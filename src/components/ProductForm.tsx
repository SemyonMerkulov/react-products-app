import { useForm } from "react-hook-form";

export const ProductForm= ({ defaultValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });


  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title" className="block text-gray-700">Название:</label>
        <input
          id="title"
          {...register('title', { required: 'Это поле обязательно' })}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        {/* {errors.title && <p className="text-red-500">{errors.title.message}</p>} */}
      </div>      
    </form>
  )
}