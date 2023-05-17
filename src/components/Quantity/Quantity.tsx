interface Props {
  max: number
  buyCount: number
  setBuyCount: React.Dispatch<React.SetStateAction<number>>
}
export default function Quantity({ max, buyCount, setBuyCount }: Props) {
  const increase = () => {
    let _value = Number(buyCount) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    setBuyCount(_value)
  }
  const descrease = () => {
    let _value = buyCount - 1
    if (_value < 1) {
      _value = 1
    }
    setBuyCount(_value)
  }
  return (
    <div className='flex items-center '>
      <button
        onClick={descrease}
        className='flex items-center justify-center w-8 h-8 text-gray-500 border border-gray-300'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-5 h-5'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <input
        className='items-center justify-center w-10 h-8 text-center text-gray-500 border-t border-b border-gray-300'
        value={buyCount || ''}
      />
      <button
        onClick={increase}
        className='flex items-center justify-center w-8 h-8 text-gray-500 border border-gray-300'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
