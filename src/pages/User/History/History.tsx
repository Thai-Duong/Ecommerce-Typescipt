import classNames from 'classnames'
import { useQuery } from 'react-query'
import { Link, createSearchParams } from 'react-router-dom'
import purchaseApi from 'src/api/purchase.api'
import useQueryParam from 'src/hooks/useQueryParam'
import { PurchaseListStatus } from 'src/types/purchase.type'
import { purchasesStatus } from 'src/utils/purchase'
import { formatCurrency } from 'src/utils/utils'
const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' },
  { status: purchasesStatus.delivered, name: 'Đã giao hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' }
]
export default function History() {
  const queryParams = useQueryParam()
  const status = Number(queryParams.status) || purchasesStatus.all
  const { data: cart } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchases({ status: status as PurchaseListStatus })
  })
  const purchasesInCart = cart?.data.data
  return (
    <div>
      <div className='sticky top-0 flex rounded-t-sm shadow-'>
        {purchaseTabs.map((tab) => (
          <Link
            key={tab.status}
            to={{
              pathname: '/history',
              search: createSearchParams({
                status: String(tab.status)
              }).toString()
            }}
            className={classNames('flex flex-1 items-center justify-center bg-white py-4 text-center', {
              'border-b-2 border-b-[#258efd] text-[#258efd]': status === tab.status
            })}
          >
            {tab.name}
          </Link>
        ))}
      </div>
      <div className=''>
        {purchasesInCart?.map((purchase) => (
          <div className='p-6 mt-4 bg-white rounded-sm' key={purchase._id}>
            <Link to='/' className='flex'>
              <div className='flex-shrink-0'>
                <img className='object-cover w-20 h-20' src={purchase.product.image} alt='' />
              </div>
              <div className='flex-grow ml-3 overflow-hidden'>
                <div className='truncate'>{purchase.product.name}</div>
                <div className='mt-3'>Số lượng: {purchase.buy_count}</div>
              </div>
              <div className='flex-shrink-0'>
                <span className=''>{formatCurrency(purchase.product.price)}</span>
              </div>
            </Link>
            <div className='flex justify-end text-lg'>
              <div>
                <span>Tổng : </span>
                <span className=''>{formatCurrency(purchase.product.price * purchase.buy_count)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
