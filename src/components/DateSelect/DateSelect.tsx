import { range } from 'lodash'
import { useState } from 'react'
interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}
export default function DateSelect({ onChange, value, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: 1,
    month: 0,
    year: 1990
  })
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value, name } = e.target
    const newDate = {
      ...date,
      [name]: value
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }
  return (
    <div className='pl-5 sm:w-[80%]'>
      <div className='flex justify-between'>
        <select
          onChange={handleChange}
          name='date'
          value={value?.getDate() || date.date}
          className='px- hover:border-orange h-10 w-[32%] cursor-pointer rounded-sm border border-black'
        >
          <option disabled>Ngày</option>
          {range(1, 32).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          onChange={handleChange}
          name='month'
          value={value?.getMonth() || date.month}
          className='hover:border-orange h-10 w-[32%] cursor-pointer rounded-sm border border-black px-3'
        >
          <option disabled>Tháng</option>
          {range(0, 12).map((item) => (
            <option value={item} key={item}>
              {item + 1}
            </option>
          ))}
        </select>{' '}
        <select
          name='year'
          value={value?.getFullYear() || date.year}
          onChange={handleChange}
          className='hover:border-orange h-10 w-[32%] cursor-pointer rounded-sm border border-black px-3'
        >
          <option disabled>Năm</option>
          {range(1990, 2024).map((item) => (
            <option value={item} key={item}>
              {item}
            </option>
          ))}
        </select>
        <div className='mt-1 min-h-[25px] text-xl text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}
