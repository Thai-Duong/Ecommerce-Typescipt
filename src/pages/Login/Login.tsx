import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginAcount } from 'src/api/auth.api'
import { useMutation } from 'react-query'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
import { Helmet } from 'react-helmet'
interface FormData {
  email: string
  password: string
}
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
  const { setIsAuthentication, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(loginSchema) })
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => loginAcount(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthentication(true), navigate('/')
        setProfile(data.data.data.user)
      }
    })
  })

  return (
    <div className='px-[300px] py-[100px]'>
      <Helmet>
        <title> Trang Đăng Nhập | Shop</title>
        <meta name='description' content='Trang đăng nhập của shop' />
      </Helmet>
      <div className='grid grid-cols-10 border border-gray-700 rounded-xl '>
        <div className='rounded-xl lg:col-span-7'>
          <form onSubmit={onSubmit} className='p-10 bg-white'>
            <div className='text-2xl'>Xin Chào,</div>
            <p className='mb-5'>Đăng nhập hoặc Tạo tài khoản</p>
            <Input
              type='email'
              name='email'
              register={register}
              placeholder='Email'
              errorMessage={errors.email?.message}
              className='w-full p-3 border border-gray-500 rounded-md focus:border-blue-500'
            ></Input>
            <Input
              register={register}
              type='password'
              name='password'
              placeholder='Password'
              errorMessage={errors.password?.message}
              className='w-full p-3 border border-gray-500 rounded-md focus:border-blue-500'
            ></Input>

            <div className='mt-5'>
              <button
                type='submit'
                className='w-full p-2 text-xl text-center text-white uppercase bg-red-600 rounded-md '
              >
                Đăng Nhập
              </button>
            </div>
            <div className='mt-8 text-xl'>
              <div className='flex items-center justify-center'>
                <span className='text-slate-400'>Bạn chưa có tài khoản</span>
                <Link to='/register' className='ml-3 text-red-400'>
                  Đăng Ký
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className='flex items-center bg-[#ebf6ff] lg:col-span-3'>
          <img src='https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png' alt='' />
        </div>
      </div>
    </div>
  )
}
