import { Link } from 'react-router-dom'
import { Product as ProductType } from 'src/types/product.type'
import { formatCurrency, formatNumbertoSocial } from 'src/utils/utils'
interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    <Link to={`${'/'}${product._id}`}>
      <div className='rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.0625rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img className='absolute top-0 left-0 object-cover w-full h-full bg-white' src={product.image} alt='' />
        </div>
        <div className='p-2 overflow-hiden '>
          <div className='line-clamp-2 min-h-[1.75rem] text-sm'>{product.name}</div>
          <div className='flex items-center mt-2'>
            <div className='max-w-[50%] text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orangw'>
              <span className='text-xs'>₫</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='flex items-center justify-end mt-3'>
            {/* <ProductRating rating={product.rating} /> */}
            <div className='ml-2 text-sm'>
              <span>{formatNumbertoSocial(product.sold)}</span>
              <span className='ml-1'>Đã Bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
