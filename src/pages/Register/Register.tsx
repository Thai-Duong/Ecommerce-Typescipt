import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { Link, useNavigate } from 'react-router-dom'
import { registerAcount } from 'src/api/auth.api'
import Input from 'src/components/Input'
import { AppContext } from 'src/context/app.context'
import { schema } from 'src/utils/rules'

interface FormData {
  email: string
  password: string
  comfirm_password: string
}
export default function Register() {
  const { setIsAuthentication } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({ resolver: yupResolver(schema) })

  const registerMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'comfirm_password'>) => registerAcount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['comfirm_password'])
    registerMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthentication(true), navigate('/')
      }
    })
  })
  return (
    <div className='px-[300px] py-[100px]'>
      <div className='grid grid-cols-10 border border-gray-700 rounded-xl'>
        <div className='rounded-xl lg:col-span-7'>
          <form onSubmit={onSubmit} className='p-10 bg-white'>
            <div className='text-2xl'>Chào Mừng,</div>
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
            <Input
              register={register}
              type='comfirm_password'
              name='comfirm_password'
              placeholder='Comfirm_password'
              errorMessage={errors.comfirm_password?.message}
            ></Input>

            <div className='mt-5'>
              <button
                type='submit'
                className='w-full p-2 text-xl text-center text-white uppercase bg-red-600 rounded-md '
              >
                Đăng Ký
              </button>
            </div>
            <div className='mt-8 text-xl'>
              <div className='flex items-center justify-center'>
                <span className='text-slate-400'>Bạn đã có tài khoản</span>
                <Link to='/login' className='ml-3 text-red-400'>
                  Đăng Nhập
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className='flex items-center bg-[#ebf6ff] px-10 lg:col-span-3'>
          <img src='https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png' alt='' />
        </div>
      </div>
    </div>
  )
}
