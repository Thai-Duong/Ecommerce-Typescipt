import { useQuery } from 'react-query'
import categoryApi from 'src/api/categories'
import productApi from 'src/api/product.api'
import AsiderFiter from 'src/components/AsiderFiter'
import Product from 'src/components/Product'
import SortProductList from 'src/components/SortProductList'
import useQueryParam from 'src/hooks/useQueryParam'

export default function Main() {
  const queryParams = useQueryParam()
  const { data: productData } = useQuery({
    queryKey: ['product', queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000
  })
  const { data: categoryData } = useQuery({
    queryKey: ['categorites'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  return (
    <div className='bg-[#f5f5fa] py-6 '>
      <div className='mx-auto max-w-7xl px-4'>
        {/* {productData && ( */}
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsiderFiter categorites={categoryData?.data.data || []} />
          </div>
          <div className='col-span-9'>
            <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              {productData?.data.data.products.map((product) => (
                <div className='col-span-1' key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  )
}
