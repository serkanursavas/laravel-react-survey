import { useState } from 'react'
import PageComponent from '../components/PageComponent'
import { PhotographIcon } from '@heroicons/react/outline'
import TButton from '../components/core/TButton'

export default function SurveyView() {
  const [survey, setSurvey] = useState({
    title: '',
    slug: '',
    status: false,
    description: '',
    image: null,
    image_url: null,
    expire_date: '',
    questions: [],
  })

  const OnImageChoose = () => {
    console.log('On Image Choose')
  }

  const onSubmit = (ev) => {
    ev.preventDefault()
    console.log(ev)
  }

  return (
    <PageComponent title="Create new Survey">
      <form action="#" method="POST" onSubmit={onSubmit}>
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700"></label>
              <div className="mt-1 flex items-center">
                {survey.image_url && (
                  <img
                    src={survey.image_url}
                    alt=""
                    className="w-32 h-32 object-cover"
                  />
                )}

                {!survey.image_url && (
                  <span className="flex justify-center items-center text-gray-400 h-12 w-12">
                    <PhotographIcon className="w-8 h-8" />
                  </span>
                )}
                <button
                  type="button"
                  className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2  focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <input
                    type="file"
                    className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                    onChange={OnImageChoose}
                  />
                  Change
                </button>
              </div>
            </div>
            {/* Image */}

            {/* Title */}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Survey Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={survey.title}
                onChange={(ev) => {
                  setSurvey({ ...survey, title: ev.target.value })
                }}
                placeholder="Survey Title"
                className=" p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {/* Title */}

            {/* Description */}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={survey.description}
                onChange={(ev) => {
                  setSurvey({ ...survey, description: ev.target.value })
                }}
                placeholder="Describe your survey"
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            {/* Description */}

            {/* ExpireDate */}
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="expire_date"
                className="block text-sm font-medium text-gray-700"
              >
                Expire Date
              </label>
              <input
                type="date"
                name="expire_date"
                id="expire_date"
                value={survey.expire_date}
                onChange={(ev) => {
                  setSurvey({ ...survey, expire_date: ev.target.value })
                }}
                className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {/* ExpireDate */}

            {/* Active */}
            <div className="flex items-center">
              <div className="flex h-5 items-center">
                <input
                  type="checkbox"
                  id="status"
                  name="status"
                  checked={survey.status}
                  onChange={(ev) => {
                    setSurvey({ ...survey, status: ev.target.checked })
                  }}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
              </div>

              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                  Active
                </label>
                <p className="text-gray-500">
                  Whether to make sirvey publicly available
                </p>
              </div>
            </div>
            {/* Active */}
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <TButton>Save</TButton>
          </div>
        </div>
      </form>
    </PageComponent>
  )
}
