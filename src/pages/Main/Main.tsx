import { useQuery } from 'react-query'
import categoryApi from 'src/api/categories'
import productApi from 'src/api/product.api'
import AsiderFiter from 'src/components/AsiderFiter'
import Pagination from 'src/components/Pagination'
import Product from 'src/components/Product'
import useQueryConfig from 'src/hooks/useQueryConfig'
import { ProductListConfig } from 'src/types/product.type'
export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function Main() {
  const queryConfig = useQueryConfig()
  const { data: productData } = useQuery({
    queryKey: ['product', queryConfig],
    queryFn: () => {
      return productApi.getProducts(queryConfig as ProductListConfig)
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
      <div className='px-4 mx-auto max-w-7xl'>
        {productData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              <AsiderFiter categorites={categoryData?.data.data || []} />
            </div>
            <div className='col-span-9'>
              {/* <SortProductList queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} /> */}
              <div className='grid grid-cols-2 gap-3 mt-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productData?.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
