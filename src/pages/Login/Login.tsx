import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import Input from 'src/components/Input'
import { schema } from 'src/utils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginAcount } from 'src/api/auth.api'
import { useMutation } from 'react-query'
import { useContext } from 'react'
import { AppContext } from 'src/context/app.context'
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
      <div className='grid grid-cols-10 rounded-xl border border-gray-700 '>
        <div className='rounded-xl lg:col-span-7'>
          <form onSubmit={onSubmit} className='bg-white p-10'>
            <div className='text-2xl'>Xin Chào,</div>
            <p>Đăng nhập hoặc Tạo tài khoản</p>
            <Input
              type='email'
              name='email'
              register={register}
              placeholder='Email'
              errorMessage={errors.email?.message}
            ></Input>
            <Input
              register={register}
              type='password'
              name='password'
              placeholder='Password'
              errorMessage={errors.password?.message}
            ></Input>

            <div className='mt-5'>
              <button
                type='submit'
                className='w-full rounded-md bg-red-600 p-2 text-center text-xl uppercase text-white '
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
