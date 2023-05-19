import { UseFormRegister } from 'react-hook-form'
interface Props {
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
  errorMessage?: string
  name: string
  className: string
  //   classNameError?: string
  register: UseFormRegister<any>
  //   rules?: RegisterOptions
}
export default function Input({ register, errorMessage, name, type, placeholder, className }: Props) {
  return (
    <div>
      <input type={type} placeholder={placeholder} {...register(name)} className={className} />
      <div className='mt-2 text-sm text-red-500'>{errorMessage}</div>
    </div>
  )
}
