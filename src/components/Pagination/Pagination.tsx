import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import { QueryConfig } from 'src/pages/Main/Main'

interface Prop {
  queryConfig: QueryConfig
  pageSize: number
}
const RANG = 2
export default function Pagination({ queryConfig, pageSize }: Prop) {
  const page = Number(queryConfig.page)
  const reder = () => {
    let dotAfter = false
    let dotBefor = false
    const rederDotBefor = (index: number) => {
      if (!dotBefor) {
        dotBefor = true
        return (
          <span key={index} className='px-3 py-2 mx-2 bg-white rounded shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    const rederDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span key={index} className='px-3 py-2 mx-2 bg-white rounded shadow-sm'>
            ...
          </span>
        )
      }
      return null
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        if (page <= RANG * 2 + 1 && pageNumber > page + RANG && pageNumber < pageSize - RANG + 1) {
          return rederDotAfter(index)
        } else if (page > RANG * 2 + 1 && page < pageSize - RANG * 2) {
          if (pageNumber < page - RANG && pageNumber > RANG) {
            return rederDotBefor(index)
          } else if (pageNumber > page + RANG && pageNumber < pageSize - RANG + 1) {
            return rederDotAfter(index)
          }
        } else if (page >= pageSize - RANG * 2 && pageNumber > RANG && pageNumber < page - RANG) {
          return rederDotBefor(index)
        }
        return (
          <Link
            to={{
              pathname: '/',
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames('mx-2 rounded border bg-white px-3 py-2 shadow-sm', {
              'border-gray-500': page == pageNumber,
              'border-transparent': page !== pageNumber
            })}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap justify-center mt-6'>
      <button className='px-3 py-2 mx-2 bg-white rounded shadow-sm'>Prev</button>
      {reder()}
      <button className='px-3 py-2 mx-2 bg-white rounded shadow-sm'>Next</button>
    </div>
  )
}
