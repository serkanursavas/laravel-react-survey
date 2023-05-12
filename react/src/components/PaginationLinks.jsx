import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

export default function PaginationLinks({ meta, onPageClick }) {
  const onClick = (ev, link) => {
    ev.preventDefault()

    if (!link.url) {
      return
    }
    onPageClick(link)
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 mt-4 bg-white border-t border-gray-200 shadow-md sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <a
          onClick={(ev) => onClick(ev, meta.links[0])}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          onClick={(ev) => onClick(ev, meta.links[meta.links.length - 1])}
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Nextt
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta && meta.from}</span> to{' '}
            <span className="font-medium">{meta && meta.to}</span> of{' '}
            <span className="font-medium">{meta && meta.total}</span> results
          </p>
        </div>
        <div>
          <nav
            className="inline-flex -space-x-px rounded-md shadow-sm isolate"
            aria-label="Pagination"
          >
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {meta &&
              meta.links.map((link, ind) => {
                return (
                  <a
                    key={ind}
                    onClick={(ev) => onClick(ev, link)}
                    aria-current="page"
                    className={
                      'relative z-10 inline-flex items-center shadow-md border px-4 py-2 text-sm font-medium focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hover:bg-gray-50 ' +
                      (ind === 0 ? 'rounded-l-md ' : '') +
                      (ind === meta.links.length - 1 ? 'rounded-r-md ' : '') +
                      (link.active
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-600 '
                        : '')
                    }
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  ></a>
                )
              })}
          </nav>
        </div>
      </div>
    </div>
  )
}
