import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import userApi from 'src/api/user.api'
import DateSelect from 'src/components/DateSelect'
import Input from 'src/components/Input'
import { UserSchema, userSchema } from 'src/utils/rules'

type FormData = Pick<UserSchema, 'name' | 'address' | 'phone' | 'date_of_birth' | 'avatar'>
const profileSchema = userSchema.pick(['name', 'date_of_birth', 'address', 'phone', 'avatar'])
export default function Profile() {
  const { data, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: userApi.getProfile
  })
  const profile = data?.data.data
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      avatar: '',
      date_of_birth: new Date(1990, 0, 1)
    },
    resolver: yupResolver(profileSchema)
  })
  useEffect(() => {
    if (profile) {
      setValue('address', profile.address)
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('date_of_birth', profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1990 / 0 / 1))
      setValue('avatar', profile.avatar)
    }
  }, [profile, setValue])
  const updateMutation = useMutation(userApi.updateProfile)
  const onSubmit = handleSubmit(async (data) => {
    const res = await updateMutation.mutateAsync({ ...data, date_of_birth: data.date_of_birth?.toISOString() })
    refetch()
    toast.success(res.data.message)
  })
  return (
    <div className='px-2 pb-10 bg-white rounded-sm shadow md:px-7 md:pb-20'>
      <Helmet>
        <title>Tài Khoản | Shop</title>
        <meta name='description' content='Trang tài khoản của người dùng' />
      </Helmet>
      <div className='py-6 border-b border-b-gray-200'>
        <h1 className='text-lg font-medium text-gray-900 capitalize'>Hồ Sơ Của Tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='flex mt-8 felx-col-reverse md:flex-start md:flex-row' onSubmit={onSubmit}>
        <div className='flex-grow pr-12 mt-6 md:mt-0'>
          <div className='flex flex-wrap'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
            <div className='pl-5 sm:w-[80%]'>
              <div className='pt-3 text-gray-700'>{profile?.email}</div>
            </div>
          </div>
          {/* <Info></Info> */}
          <div className='flex flex-col flex-wrap mt-6 sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Tên</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                className='w-full px-3 py-2 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm'
                register={register}
                name='name'
                placeholder='Tên'
                errorMessage={errors.name?.message}
              />
            </div>
          </div>
          <div className='flex flex-col flex-wrap mt-2 sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Số điện thoại</div>
            <div className='sm:w-[80%] sm:pl-5'>
              <Input
                type='text'
                name='phone'
                register={register}
                className='w-full px-3 py-2 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm'
              />
            </div>
          </div>
          <div className='flex flex-wrap mt-2 sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Địa chỉ</div>
            <div className='pl-5 sm:w-[80%]'>
              <Input
                register={register}
                name='address'
                placeholder='Địa chỉ'
                errorMessage={errors.address?.message}
                className='w-full px-3 py-2 border border-gray-300 rounded-sm outline-none focus:border-gray-500 focus:shadow-sm'
              ></Input>
            </div>
          </div>
          <div className='flex flex-wrap mt-2 sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
            <Controller
              control={control}
              name='date_of_birth'
              render={({ field }) => (
                <DateSelect
                  errorMessage={errors.date_of_birth?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className='flex flex-col flex-wrap mt-2 sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <button
                className='flex items-center px-5 text-sm text-center text-white bg-blue-500 rounded-sm hover:bg-blue-250 h-9'
                type='submit'
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
        <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
          <div className='flex flex-col items-center'>
            <div className='w-24 h-24 my-5'>
              <img src={profile?.avatar} alt='' className='object-cover w-full h-full rounded-full' />
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
