// interface Prop {
//   queryConfig: QueryConfig
//   pageSize: number
// }
export default function SortProductList() {
  return (
    <div className='px-3 py-4 bg-white'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex flex-wrap items-center gap-2'>
          <button className='h-8 px-4 text-sm capitalize bg-orange '>Phổ Biến</button>
          <button
            className='h-8 px-4 text-sm capitalize bg-orange '
            // className={classNames('bg-orange h-8 px-4 text-sm capitalize ', {
            //   ' hover:bg-orange/80 text-white': isActiveSortBy(sortBy.createdAt),
            //   'bg-white text-black hover:bg-slate-500': !isActiveSortBy(sortBy.createdAt)
            // })}
            // onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới Nhất
          </button>
          <button
            className='h-8 px-4 text-sm capitalize bg-orange '
            // className={classNames('bg-orange h-8 px-4 text-sm capitalize ', {
            //   ' hover:bg-orange/80 text-white': isActiveSortBy(sortBy.sold),
            //   'bg-white text-black hover:bg-slate-500': !isActiveSortBy(sortBy.sold)
            // })}
            // onClick={() => handleSort(sortBy.sold)}
          >
            Bán Chạy
          </button>
          <button className='h-8 px-4 text-sm capitalize bg-orange '>Giá : Cao đến Thấp</button>
          <button className='h-8 px-4 text-sm capitalize bg-orange '>Giá : Thấp đến Cao</button>
          {/* <select
            className={classNames('h-8 px-4 text-sm capitalize text-black ', {
              'bg-orange hover:bg-orange/80 text-white': isActiveSortBy(sortBy.price),
              'bg-white text-black hover:bg-slate-500': !isActiveSortBy(sortBy.price)
            })}
            value={order || ''}
            onChange={(event) => handlePriceOrder(event.target.value as Exclude<ProductListConfig['order'], undefined>)}
          >
            <option value='' disabled className='text-black bg-white'>
              Giá
            </option>
            <option className='text-black bg-white'>Giá : Thấp đến Cao</option>
            <option className='text-black bg-white'>Giá : Cao đến Thấp</option>
          </select> */}
        </div>
        <div className='flex items-center'>
          <div>
            <span className='text-orange'>{}</span>
            <span>/{}</span>
          </div>
          <div className='flex ml-2'>
            {/* {page === 1 ? (
              <span className='flex items-center justify-center h-8 px-3 rounded-tl-sm rounded-bl-sm cursor-not-allowed w-9 bg-white/60 hover:bg-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page - 1).toString()
                  }).toString()
                }}
                className='flex items-center justify-center h-8 px-3 rounded-tl-sm rounded-bl-sm cursor-not-allowed w-9 bg-white/60 hover:bg-white'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                </svg>
              </Link>
            )} */}
            {/* {page === pagesize ? (
              <span className='flex items-center justify-center h-8 px-3 rounded-tl-sm rounded-bl-sm cursor-not-allowed w-9 bg-white/60 hover:bg-white'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </span>
            ) : (
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    page: (page + 1).toString()
                  }).toString()
                }}
                className='flex items-center justify-center h-8 px-3 rounded-tl-sm rounded-bl-sm w-9 bg-white/60 hover:bg-white'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='w-3 h-3'
                >
                  <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                </svg>
              </Link>
            )} */}
          </div>
        </div>
      </div>
    </div>
  )
}
