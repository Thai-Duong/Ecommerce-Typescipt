interface Props {
  errorMessage?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function InputNumber({ errorMessage, onChange }: Props) {
  return (
    <>
      <input
        className='h-8 w-14 items-center justify-center border-b border-t border-gray-300 text-center text-gray-500'
        onChange={onChange}
      />
      <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
    </>
  )
}
