import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios'
import PublicQuestionView from '../components/PublicQuestionView'

export default function SurveyPublicView() {
  const { slug } = useParams()
  const [survey, setSurvey] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axiosClient.get(`survey/get-by-slug/${slug}`).then(({ data }) => {
      setSurvey(data.data)
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {loading && <div className="flex justify-center">Loading</div>}
      {!loading && (
        <form className="container mx-auto">
          <div>
            <div className="grid grid-cols-6">
              <div className="mr-4">
                <img src={survey.image_url} />
              </div>
              <div className="col-span-5">
                <h1 className="mb-3 text-3xl">{survey.title}</h1>
                <p className="mb-3 text-sm text-gray-500">
                  Expire Date: {survey.expire_date}
                </p>
                <p className="mb-3 text-sm text-gray-500">
                  {survey.description}
                </p>
              </div>
            </div>
            <div>
              {survey.questions &&
                survey.questions.map((question, index) => (
                  <PublicQuestionView
                    key={index}
                    question={question}
                    index={index}
                  />
                ))}
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
