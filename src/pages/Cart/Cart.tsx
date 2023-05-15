import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import purchaseApi from 'src/api/purchase.api'
import Quantity from 'src/components/Quantity'
import { purchasesStatus } from 'src/utils/purchase'
import { formatCurrency } from 'src/utils/utils'

export default function Cart() {
  const { data: cart } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart })
    // enabled: isAuthentication
  })
  const purchasesInCart = cart?.data.data
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container mx-auto max-w-7xl px-4'>
        {purchasesInCart && purchasesInCart.length > 0 ? (
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-9 overflow-auto'>
              <div className='min-w-[800px]'>
                <div className='grid grid-cols-12 rounded-sm bg-white px-9 py-5 text-sm capitalize text-gray-500 shadow'>
                  <div className='col-span-6'>
                    <div className='flex items-center'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          //   onChange={handleCheckAll}
                          type='checkbox'
                          //   checked={isAllChecked}
                          className='accent-orange h-5 w-5'
                        />
                      </div>
                      <div className='flex-grow text-black'>{purchasesInCart.length} Sản phẩm</div>
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
                {purchasesInCart.length > 0 && (
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {purchasesInCart &&
                      purchasesInCart.map((purchase, index) => (
                        <div
                          key={purchase._id}
                          className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white px-4 py-5 text-center text-sm text-gray-500 first:mt-0'
                        >
                          <div className='col-span-6'>
                            <div className='flex'>
                              <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                                <input
                                  //   checked={purchase.checked}
                                  //   onChange={handleChecked(index)}
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
                                  <span className='text-gray-300 line-through'>
                                    ₫{formatCurrency(purchase.product.price_before_discount)}{' '}
                                  </span>
                                  <span className='ml-3'>₫{formatCurrency(purchase.product.price)}</span>
                                </div>
                              </div>
                              <div className='col-span-1'>
                                <Quantity max={purchase.product.quantity}></Quantity>
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
                              <div
                                className='col-span-1 ml-8'
                                //    onClick={handleDelete(index)}
                              >
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
                      ))}
                  </div>
                )}
              </div>
            </div>
            <div className='sticky bottom-0 z-10 col-span-3 sm:flex-row sm:items-center'>
              <div className='h-auto w-full bg-white p-5'>
                <div>Thành tiền:</div>
                {/* <div className='ml-2 text-2xl text-orange'>₫{formatCurrency(totalCheckedPurchasePrice)}</div> */}
              </div>

              <button
                //   onClick={handleBuyPurchases}
                //   disabled={buyPurchaseMutation.isLoading}
                className='mt-2 h-10 w-full rounded-lg border border-gray-400 bg-red-500 bg-white text-sm uppercase text-white hover:bg-red-600 '
              >
                Mua hàng
              </button>
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <img src='' alt='no purchase' className='mx-auto h-24 w-24' />
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
