import { useEffect, useState } from 'react'
import PageComponent from '../components/PageComponent'
import { PhotographIcon } from '@heroicons/react/outline'
import TButton from '../components/core/TButton'
import axiosClient from '../axios'
import { useNavigate, useParams } from 'react-router-dom'
import SurveyQuestion from '../components/SurveyQuestion'
import { useStateContext } from '../Context/ContextProvider'

export default function SurveyView() {
  const { showToast } = useStateContext()
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)

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

  const OnImageChoose = (ev) => {
    const file = ev.target.files[0]

    const reader = new FileReader()
    reader.onload = () => {
      setSurvey({
        ...survey,
        image: file,
        image_url: reader.result,
      })

      ev.target.value = ''
    }
    reader.readAsDataURL(file)
  }

  const onSubmit = (ev) => {
    ev.preventDefault()

    const payload = { ...survey }
    if (payload.image) {
      payload.image = payload.image_url
    }
    delete payload.image_url
    let res = null
    if (id) {
      res = axiosClient.put(`/survey/${id}`, payload)
    } else {
      res = axiosClient.post('/survey', payload)
    }

    res
      .then(() => {
        navigate('/surveys')
        if (id) {
          showToast('Survey was updated succesfully')
        } else {
          showToast('Survey was created succesfully')
        }
      })
      .catch((err) => {
        if (err && err.response) {
          setError(err.response.data.message)
        }
        console.log(err, err.response)
      })
  }

  const onQuestionsUpdate = (questions) => {
    setSurvey({ ...survey, questions })
  }

  useEffect(() => {
    if (id) {
      setLoading(true)
      axiosClient.get(`/survey/${id}`).then(({ data }) => {
        setSurvey(data.data)
        setLoading(false)
      })
    }
  }, [])

  return (
    <PageComponent title={id ? 'Update Survey' : 'Create New Survey'}>
      {loading ? (
        <div>Loading..</div>
      ) : (
        <form action="#" method="POST" onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
              {error && (
                <div className="px-3 py-3 text-white bg-red-500 ">{error}</div>
              )}
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700"></label>
                <div className="flex items-center mt-1">
                  {survey.image_url && (
                    <img
                      src={survey.image_url}
                      alt=""
                      className="object-cover w-32 h-32"
                    />
                  )}

                  {!survey.image_url && (
                    <span className="flex items-center justify-center w-12 h-12 text-gray-400">
                      <PhotographIcon className="w-8 h-8" />
                    </span>
                  )}
                  <button
                    type="button"
                    className="relative px-3 py-2 ml-5 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      className="absolute top-0 bottom-0 left-0 right-0 opacity-0"
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
                  className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
                  className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {/* this section for error handling individual */}
                {/* <small className="text-red-500">
                Lorem ipsum dolor sit amet.
              </small> */}
              </div>
              {/* ExpireDate */}

              {/* Active */}
              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    checked={survey.status}
                    onChange={(ev) => {
                      setSurvey({ ...survey, status: ev.target.checked })
                    }}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                </div>

                <div className="ml-3 text-sm">
                  <label
                    htmlFor="comments"
                    className="font-medium text-gray-700"
                  >
                    Active
                  </label>
                  <p className="text-gray-500">
                    Whether to make sirvey publicly available
                  </p>
                </div>
              </div>
              {/* Active */}

              <SurveyQuestion
                questions={survey.questions}
                onQuestionsUpdate={onQuestionsUpdate}
              />
            </div>
            <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
              <TButton>Save</TButton>
            </div>
          </div>
        </form>
      )}
    </PageComponent>
  )
}
