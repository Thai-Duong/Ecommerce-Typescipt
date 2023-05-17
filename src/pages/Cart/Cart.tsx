import { produce } from 'immer'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import purchaseApi from 'src/api/purchase.api'
import Quantity from 'src/components/Quantity'
import { Purchase } from 'src/types/purchase.type'
import { purchasesStatus } from 'src/utils/purchase'
import { formatCurrency } from 'src/utils/utils'
interface ExtendedPurchase extends Purchase {
  // disable: boolean
  checked: boolean
}
export default function Cart() {
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>([])
  const { data: cart, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
  })
  const buyProductMutation = useMutation({
    mutationFn: purchaseApi.buyProduct,
    onSuccess: () => {
      refetch()
    }
  })
  const deleteProductMutation = useMutation({
    mutationFn: purchaseApi.deletePurchase,
    onSuccess: () => {
      refetch()
      toast.success('Mua hàng thành công')
    }
  })
  // const updateProductMutation = useMutation({
  //   mutationFn: purchaseApi.updatePurchase,
  //   onSuccess: () => {
  //     refetch()
  //   }
  // })
  const purchasesInCart = cart?.data.data
  const isAllChecked = extendedPurchase.every((purchase) => purchase.checked)
  useEffect(() => {
    setExtendedPurchase(
      purchasesInCart?.map((purchase) => ({
        ...purchase,
        checked: false
      })) || []
    )
  }, [purchasesInCart])
  const handleChecked = (productIndex: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchase(
      produce((draft) => {
        draft[productIndex].checked = e.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchase((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  const handleCount = () => {
    return null
  }
  const handleDelete = (purchaseIndex: number) => () => {
    const purchaseId = extendedPurchase[purchaseIndex]._id
    deleteProductMutation.mutate([purchaseId])
  }
  const checkedPurchases = extendedPurchase.filter((purchase) => purchase.checked)

  const totalCheckedPurchasePrice = checkedPurchases.reduce((result, current) => {
    return result + current.product.price * current.buy_count
  }, 0)
  const handleBuyPurchases = () => {
    if (checkedPurchases.length > 0) {
      const body = checkedPurchases.map((purchase: any) => ({
        product_id: purchase.product._id,
        buy_count: purchase.buy_count
      }))
      buyProductMutation.mutate(body)
    }
  }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container mx-auto max-w-7xl px-4'>
        {extendedPurchase && extendedPurchase.length > 0 ? (
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-9 overflow-auto'>
              <div className='min-w-[800px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          onChange={handleCheckAll}
                          type='checkbox'
                          checked={isAllChecked}
                          className='accent-orange h-5 w-5'
                        />
                      </div>
                      <div className='flex-grow text-black'>{extendedPurchase.length} Sản phẩm</div>
                    </div>
                  </div>
                  <div className='col-span-6'>
                    <div className='grid grid-cols-5 text-center'>
                      <div className='col-span-2'>Đơn giá</div>
                      <div className='col-span-1'>Số lượng</div>
                      <div className='col-span-1'>Số tiền</div>
                      <div className='col-span-1 ml-8'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='h-6 w-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                {extendedPurchase.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendedPurchase &&
                      extendedPurchase.map((purchase, index) => (
                        <div
                          key={purchase._id}
                          className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                        >
                          <div className='col-span-6'>
                            <div className='flex'>
                              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                <input
                                  checked={purchase.checked}
                                  onChange={handleChecked(index)}
                                  type='checkbox'
                                  className='accent-orange h-5 w-5'
                                />
                              </div>
                              <div className='flex-grow'>
                                <div className='flex'>
                                  <Link
                                    to=''
                                    className='h-20 w-20 flex-shrink-0'
                                    // to={`${path.home}${generateNameId({
                                    //   name: purchase.product.name,
                                    //   id: purchase.product._id
                                    // })}`}
                                  >
                                    <img alt={purchase.product.name} src={purchase.product.image} />
                                  </Link>

                                  <div className='flex-grow px-2 pb-2 pt-1'>
                                    {/* <Link
                                      to={`${path.home}${generateNameId({
                                        name: purchase.product.name,
                                        id: purchase.product._id
                                      })}`}
                                      className='text-left line-clamp-2'
                                    ></Link> */}
                                    {purchase.product.name}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className='col-span-6'>
                            <div className='grid grid-cols-5 items-center'>
                              <div className='col-span-2'>
                                <div className='flex items-center justify-center'>
                                  <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                                </div>
                              </div>
                              <div className='col-span-1'>
                                <Quantity
                                  setBuyCount={handleCount}
                                  buyCount={purchase.buy_count}
                                  max={purchase.product.quantity}
                                ></Quantity>
                                {/* <QuantityController
                                  max={purchase.product.quantity}
                                  value={purchase.buy_count}
                                  classNameWrapper='flex items-center'
                                  onIncrease={(value) =>
                                    handleQuantity(index, value, value <= purchase.product.quantity)
                                  }
                                  onDescrease={(value) => handleQuantity(index, value, value >= 1)}
                                  onType={handleTypeQuantity(index)}
                                  onFocusOut={(value) =>
                                    handleQuantity(
                                      index,
                                      value,
                                      value >= 1 &&
                                        value <= purchase.product.quantity &&
                                        value !== (purchasesInCart as Purchase[])[index].buy_count
                                    )
                                  }
                                  disabled={purchase.disabled}
                                /> */}
                              </div>
                              <div className='col-span-1'>
                                <span className='text-orange'>
                                  ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                                </span>
                              </div>
                              <button className='col-span-1 ml-8' onClick={handleDelete(index)}>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  strokeWidth='1.5'
                                  stroke='currentColor'
                                  className='h-6 w-6'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10 col-span-3 sm:flex-row sm:items-center'>
              <div className='flex h-auto w-full justify-between bg-white p-5'>
                <div>Thành tiền:</div>
                <div className='text-orange ml-2 text-2xl'>₫{formatCurrency(totalCheckedPurchasePrice)}</div>
              </div>

              <button
                onClick={handleBuyPurchases}
                disabled={buyProductMutation.isLoading}
                className='mt-2 h-10 w-full rounded-lg border border-gray-400 bg-red-500 text-sm uppercase text-white hover:bg-red-600 '
              >
                Mua hàng
              </button>
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
            <div className='mt-5 text-center'>
              <Link
                to='/'
                className='bg-orange hover:bg-orange/80 rounded-sm px-10 py-2 uppercase text-white transition-all'
              >
                Mua ngay
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
