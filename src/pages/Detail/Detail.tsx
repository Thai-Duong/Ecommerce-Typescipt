import DOMPurify from 'dompurify'
import { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import productApi from 'src/api/product.api'
import { Product } from 'src/types/product.type'
import { formatCurrency, formatNumbertoSocial, rateSale } from 'src/utils/utils'
import Quantity from '../../components/Quantity'
import purchaseApi from 'src/api/purchase.api'
import { purchasesStatus } from 'src/utils/purchase'
import { toast } from 'react-toastify'
import { AppContext } from 'src/context/app.context'
import { Helmet } from 'react-helmet'

export default function Detail() {
  const { isAuthentication } = useContext(AppContext)
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { id } = useParams()
  const [currentIndexImage, setCurrentIndexImage] = useState([0, 5])
  const [activeImage, setActiveImage] = useState('')
  const { data } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductDetail(id as string),
    enabled: isAuthentication
  })
  const product = data?.data.data
  const currentImage = product?.images.slice(...currentIndexImage)
  const addProductMutation = useMutation(purchaseApi.addToCart)
  useEffect(() => {
    if (product && product.images.length > 0) setActiveImage(product?.images[0])
  }, [product])
  const [buyCount, setBuyCount] = useState(1)
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
  const addToCart = () => {
    isAuthentication
      ? addProductMutation.mutate(
          { buy_count: buyCount, product_id: product?._id as string },
          {
            onSuccess: (data) => {
              toast.success(data.data.message)
              queryClient.invalidateQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
            }
          }
        )
      : navigate('/login')
  }

  if (!product) return null
  return (
    <div className=' bg-[#f5f5fa]'>
      <Helmet>
        <title>{product.name}</title>
        <meta name='description' content='Trang chi tiết sản phẩm của shop' />
      </Helmet>
      <div className='px-4 mx-auto max-w-7xl'>
        <div className='p-4 bg-white shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5 '>
              <div className='relative w-full cursor-zoom-in overflow-hidden pt-[100%]'>
                <img
                  className='absolute top-0 left-0 object-cover w-full h-full bg-white pointer-events-none'
                  src={activeImage}
                  alt=''
                />
              </div>
              <div className='relative grid grid-cols-5 gap-1 mt-4'>
                <button
                  onClick={prev}
                  className='absolute left-0 z-10 w-5 text-white -translate-y-1/2 top-1/2 h-9 bg-black/20'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImage?.map((img) => {
                  const isActive = img === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={img} onMouseEnter={() => chooseActive(img)}>
                      <img className='absolute top-0 left-0 object-cover w-full h-full bg-white' src={img} alt='' />
                      {isActive && <div className='absolute inset-0 border-2 border-gray-500'></div>}
                    </div>
                  )
                })}
                <button
                  onClick={next}
                  className='absolute right-0 z-10 w-5 text-white -translate-y-1/2 top-1/2 h-9 bg-black/20'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    className='w-5 h-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='flex items-center mt-8'>
                <div className='flex items-center'>
                  <span className='mr-1 border border-b-orange text-orange'>{product.rating}</span>
                  <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                  <div className=''>
                    <span className='mr-3'>Đã Bán</span>
                    <span>{formatNumbertoSocial(product.sold)}</span>
                  </div>
                </div>
              </div>
              <div className='flex items-center px-5 py-4 mt-8 bg-gray-50'>
                <div className='mr-3 text-4xl font-bold text-red-500'>{formatCurrency(product.price)}₫</div>
                <div className='text-gray-500 line-through'>{formatCurrency(product.price_before_discount)}₫</div>
                <div className='px-4 py-3 ml-2 text-sm font-semibold text-red-500 uppercase rounded-sm '>
                  {rateSale(product.price_before_discount, product.price)} GIẢm
                </div>
              </div>
              <div className='flex items-center mt-7'>
                <div className='mr-3 text-gray-500 capitalize'>Số lượng</div>
                <Quantity max={product.quantity} buyCount={buyCount} setBuyCount={setBuyCount} />
                <div className='ml-6 text-sm text-gray-'>Còn {product.quantity} sản phẩm</div>
              </div>
              <div className='flex items-center mt-8'>
                <button
                  onClick={addToCart}
                  className='flex items-center justify-center h-12 px-10 text-white capitalize bg-red-600 border border-red-500 rounded-lg hover:bg-red-300'
                >
                  Chọn Mua
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8'>
        <div className='container px-4 mx-auto max-w-7xl'>
          <div className='p-4 mt-8 bg-white shadow-sm'>
            <div className='p-4 text-lg capitalize rounded bg-gray-50 text-slate-700'>Mô Tả Sản Phẩm</div>
            <div className='mx-4 mt-12 mb-4 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='mt-8'>
        <div className='container px-4 mx-auto max-w-7xl'>
          <div className='text-gray-400 uppercase'>có thể bạn cũng thích</div>
          <div className='grid grid-cols-2 gap-3 mt-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {products &&
              products.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
          </div>
        </div>
      </div> */}
    </div>
  )
}
