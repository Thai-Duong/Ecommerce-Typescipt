import classNames from 'classnames'
import { useQuery } from 'react-query'
import { Link, NavLink } from 'react-router-dom'
import userApi from 'src/api/user.api'

export default function UserMenu() {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = data?.data.data
  return (
    <div>
      <div className='flex items-center py-4 border-b border-b-gray-200'>
        <Link to='/profile' className='flex-shrink-0 w-12 h-12 overflow-hidden border rounded-full border-black/10'>
          {/* <img src='' alt='' className='object-cover w-full h-full' /> */}
          <img src='https://salt.tikicdn.com/desktop/img/avatar.png' alt='avatar' />
        </Link>
        <div className='flex-grow pl-4'>
          <Link to='/profile' className='flex items-center text-gray-500 capitalize'>
            {/* <img src='https://salt.tikicdn.com/desktop/img/avatar.png' alt='avatar' /> */}
            Sửa hồ sơ
          </Link>
          <div className='mb-1 font-semibold text-gray-600 truncate'>{profile?.email}</div>
        </div>
      </div>
      <div className='mt-7 '>
        <NavLink
          to='/profile'
          className={({ isActive }) =>
            classNames('flex items-center py-2 capitalize  transition-colors', {
              'bg-gray-200': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mx-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='w-full h-full' />
          </div>
          Tài khoản của tôi
        </NavLink>
        <NavLink
          to='/history'
          className={({ isActive }) =>
            classNames('mt-4 flex items-center py-2 capitalize transition-colors', {
              'bg-gray-200': isActive,
              'text-gray-600': !isActive
            })
          }
        >
          <div className='mx-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' className='w-full h-full' />
          </div>
          Đơn mua
        </NavLink>
      </div>
    </div>
  )
}
