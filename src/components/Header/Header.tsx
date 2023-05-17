import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import Popover from '../Popover'
import { useMutation, useQuery } from 'react-query'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { logoutAcount } from 'src/api/auth.api'
import purchaseApi from 'src/api/purchase.api'
import { purchasesStatus } from 'src/utils/purchase'
import { formatCurrency } from 'src/utils/utils'
import { queryClient } from 'src/main'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import useQueryConfig from 'src/hooks/useQueryConfig'
type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])
export default function Header() {
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  const { setIsAuthentication, isAuthentication, setProfile, profile } = useContext(AppContext)
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { name: '' },
    resolver: yupResolver(nameSchema)
  })
  const logoutMutation = useMutation({
    mutationFn: logoutAcount,
    onSuccess: () => {
      setIsAuthentication(false)
      setProfile(null)
      queryClient.removeQueries({ queryKey: ['purchases', { status: purchasesStatus.inCart }] })
    }
  })
  const { data: cart } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthentication
  })
  const purchasesInCart = cart?.data.data
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  const onSubmitSearch = handleSubmit((data) => {
    navigate({
      pathname: '/',
      search: createSearchParams({
        ...queryConfig,
        name: data.name
      }).toString()
    })
  })
  return (
    <div className='pt-2 text-white '>
      <div className='mx-[100px] pb-4'>
        <div className='mt-1 grid grid-cols-12 '>
          <Link to='/' className='col-span-1'>
            <img
              src='https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png'
              alt='tiki-logo'
              className='w-[50%]'
            />
          </Link>
          <form className='col-span-7 ' onSubmit={onSubmitSearch}>
            <div className='relative flex rounded-sm p-1'>
              <input
                type='text'
                className='flex-grow rounded-lg border border-gray-500 bg-transparent px-3 py-2 text-black outline-none'
                {...register('name')}
              />
              <button className='absolute right-2 top-3 rounded-sm px-3 text-blue-500'>Tìm Kiếm</button>
            </div>
          </form>
          <div className='col-span-4 ml-5 text-gray-500'>
            <div className='flex justify-end '>
              <div className='flex items-center rounded-lg hover:bg-gray-200'>
                <Link to='/' className='mx-3 flex items-center justify-center'>
                  <img
                    src='https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png'
                    alt='header_header_account_img'
                    className='mr-2 h-6 w-6'
                  />
                  Trang Chủ
                </Link>
              </div>

              {isAuthentication ? (
                <Popover
                  rederpopover={
                    <div className='border'>
                      <div className='block w-full bg-white px-3 py-2 text-left'>{profile?.email}</div>
                      {/* <Link to='' className='block w-full px-3 py-2 text-left bg-white'>
                        Tài khoản của tôi
                      </Link> */}
                      {/* <Link to='' className='block w-full px-3 py-2 text-left bg-white'>
                        Đơn Hàng
                      </Link> */}
                      <button className='block w-full bg-white px-3 py-2 text-left' onClick={handleLogout}>
                        Đăng Xuất
                      </button>
                    </div>
                  }
                >
                  <div className='m-3 h-5 w-5 flex-shrink-0 '>
                    <img className='h-full w-full rounded-full object-cover ' alt='' src={profile?.avatar} />
                  </div>
                </Popover>
              ) : (
                <div className='flex items-center rounded-lg hover:bg-gray-200'>
                  <Link to='/login' className='mx-3 flex items-center justify-center'>
                    <img
                      src='https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png'
                      alt='header_header_account_img'
                      className='mr-2 h-6 w-6'
                    />
                    Đăng Nhập
                  </Link>
                </div>
              )}
              <div className='mx-1 mt-4 h-5 w-[1px] bg-gray-300'></div>
              <Popover
                rederpopover={
                  <div className='relative max-w-[350px] rounded-sm border border-gray-200 bg-white text-sm shadow-md'>
                    {purchasesInCart && purchasesInCart.length > 0 ? (
                      <div className='p-2'>
                        <div className='capitalize text-gray-400'>Sản phẩm mới thêm</div>
                        <div className='mt-5'>
                          {purchasesInCart.slice(0, 5).map((purchase) => (
                            <div className='mt-2 flex py-2 hover:bg-gray-100' key={purchase._id}>
                              <div className='flex-shrink-0'>
                                <img src='' alt='' className='h-11 w-11 object-cover' />
                              </div>
                              <div className='ml-2 flex-grow overflow-hidden'>
                                <div className='truncate'>{purchase.product.name}</div>
                              </div>
                              <div className='ml-2 flex-shrink-0'>
                                <span className='text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className='mt-6 flex items-center justify-between'>
                          <div className='text-xs capitalize text-gray-500'>
                            {purchasesInCart.length > 5 ? purchasesInCart.length - 5 : ''} Thêm hàng vào giỏ
                          </div>
                          <Link
                            to='/cart'
                            className='rounded-sm bg-red-500 px-4 py-2 capitalize text-white hover:bg-opacity-90'
                          >
                            Xem giỏ hàng
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className='flex h-[300px] w-[300px] flex-col items-center justify-center p-2'>
                        <div className='mt-3 capitalize'>Chưa có sản phẩm</div>
                      </div>
                    )}
                  </div>
                }
              >
                <Link
                  to='/'
                  className='relative flex items-center justify-center py-2 text-sm hover:rounded-lg hover:bg-blue-200'
                >
                  <img
                    src='https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png'
                    alt='header_menu_item_home'
                    className='mr-1 w-[25%]'
                  ></img>
                  {purchasesInCart && purchasesInCart.length > 0 && (
                    <span className='absolute left-[17px] top-[-5px] rounded-full bg-red-500 px-[9px] py-[1px] text-xs text-white '>
                      {purchasesInCart?.length}
                    </span>
                  )}
                </Link>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center bg-[#ffe880] py-3 text-black'>Freeship mỗi ngày, không cần áp mã</div>
    </div>
  )
}
