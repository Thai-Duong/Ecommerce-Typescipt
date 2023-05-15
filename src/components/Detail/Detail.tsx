import DOMPurify from 'dompurify'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import productApi from 'src/api/product.api'
import { Product } from 'src/types/product.type'
import { formatCurrency, formatNumbertoSocial, rateSale } from 'src/utils/utils'
import Quantity from '../Quantity'
import purchaseApi from 'src/api/purchase.api'
import { queryClient } from 'src/main'
import { purchasesStatus } from 'src/utils/purchase'
import { toast } from 'react-toastify'

export default function Detail() {
  const { id } = useParams()
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [buyCount, setBuyCount] = useState(1)
  const [activeImage, setActiveImage] = useState('')
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string)
  })
  const product = data?.data.data
  const currentImage = product?.images.slice(...currentIndexImage)
  const addProductMutation = useMutation(purchaseApi.addToCart)
  useEffect(() => {
    if (product && product.images.length > 0) setActiveImage(product?.images[0])
  }, [product])
  const chooseActive = (img: string) => {
    setActiveImage(img)
  }
  const next = () => {
    if (currentIndexImage[1] < (product as Product).images.length) {
      setCurrentIndexImage((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const prev = () => {
    if (currentIndexImage[0] > 0) {
      setCurrentIndexImage((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const addToCart = () =>
    addProductMutation.mutate(
      { buy_count: buyCount, product_id: product?._id as string },
      {
        onSuccess: (data) => {
          toast.success(data.data.message)
          queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
        }
      }
    )
  if (!product) return null
  return (
    <div className=' bg-[#f5f5fa]'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5 '>
              <div className='relative w-full cursor-zoom-in overflow-hidden pt-[100%]'>
                <img
                  className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
                  src={activeImage}
                  alt=''
                />
              </div>
              <div className='relative mt-4 grid grid-cols-5 gap-1'>
                <button
                  onClick={prev}
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImage?.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img className='absolute left-0 top-0 h-full w-full bg-white object-cover' src={img} alt='' />
                      {isActive && <div className='absolute inset-0 border-2 border-gray-500'></div>}
                    </div>
                  )
                })}
                <button
                  onClick={next}
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <div className='flex items-center'>
                  <span className='border-b-orange text-orange mr-1 border'>{product.rating}</span>
                  <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                  <div className=''>
                    <span className='mr-3'>Đã Bán</span>
                    <span>{formatNumbertoSocial(product.sold)}</span>
                  </div>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='mr-3 text-4xl font-bold text-red-500'>{formatCurrency(product.price)}₫</div>
                <div className='text-gray-500 line-through'>{formatCurrency(product.price_before_discount)}₫</div>
                <div className='ml-2 rounded-sm px-4 py-3 text-sm font-semibold uppercase text-red-500 '>
                  {rateSale(product.price_before_discount, product.price)} GIẢm
                </div>
              </div>
              <div className='mt-7 flex items-center'>
                <div className='mr-3 capitalize text-gray-500'>Số lượng</div>
                <Quantity max={product.quantity} buyCount={buyCount} setBuyCount={setBuyCount} />
                <div className='text-gray- ml-6 text-sm'>Còn {product.quantity} sản phẩm</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  onClick={addToCart}
                  className='flex h-12 items-center justify-center rounded-lg border border-red-500 bg-red-600 px-10 capitalize text-white hover:bg-red-300'
                >
                  Chọn Mua
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='mt-8 bg-white p-4 shadow-sm'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô Tả Sản Phẩm</div>
            <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container mx-auto max-w-7xl px-4'>
          <div className='uppercase text-gray-400'>có thể bạn cũng thích</div>
          <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {/* {productsData &&
              productsData.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))} */}
          </div>
        </div>
      </div>
    </div>
  )
}
