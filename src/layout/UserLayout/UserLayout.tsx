import UserMenu from 'src/components/UserMenu'

interface Props {
  children?: React.ReactNode
}
export default function UserLayout({ children }: Props) {
  return (
    <div className='py-10 text-sm bg-gray-100 '>
      <div className='container px-4 mx-auto max-w-7xl'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <UserMenu />
          </div>
          <div className='col-span-9'>{children}</div>
        </div>
      </div>
    </div>
  )
}
