import { UseFormRegister } from 'react-hook-form'
interface Props {
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  errorMessage?: string
  name: string
  //   classNameInput?: string
  //   classNameError?: string
  register: UseFormRegister<any>
  //   rules?: RegisterOptions
}
export default function Input({ register, errorMessage, name, type, placeholder }: Props) {
  return (
    <div className='mt-8'>
      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className='w-full p-3 border border-gray-500 rounded-md focus:border-blue-500'
      />
      <div className='mt-2 text-sm text-red-500'>{errorMessage}</div>
    </div>
  )
}
