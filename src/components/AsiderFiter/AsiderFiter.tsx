import { Link, createSearchParams } from 'react-router-dom'
import { Category } from 'src/types/categories.type'
interface Props {
  categorites: Category[]
}
export default function AsiderFiter({ categorites }: Props) {
  return (
    <div className='rounded-lg bg-white p-4'>
      <Link to='' className='flex items-center font-bold '>
        Danh Mục Sản Phẩm
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <ul>
        {categorites.map((categoryItem) => {
          // const isActive = category === categoryItem._id
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: '/',
                  search: createSearchParams({
                    category: categoryItem._id
                  }).toString()
                }}
              >
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
