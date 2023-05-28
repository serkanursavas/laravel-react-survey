import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios'
import PublicQuestionView from '../components/PublicQuestionView'

export default function SurveyPublicView() {
  const answers = {}
  const [surveyFinished, setSurveyFinished] = useState(false)
  const { slug } = useParams()
  const [survey, setSurvey] = useState({
    questions: [],
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    axiosClient
      .get(`survey/get-by-slug/${slug}`)
      .then(({ data }) => {
        setSurvey(data.data)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  function answerChanged(question, value) {
    answers[question.id] = value
    console.log(question, value)
  }

  function onSubmit(ev) {
    ev.preventDefault()

    console.log(answers)
    axiosClient
      .post(`/survey/${survey.id}/answer`, {
        answers,
      })
      .then((response) => {
        debugger
        setSurveyFinished(true)
      })
  }

  return (
    <div>
      {loading && <div className="flex justify-center">Loading</div>}
      {!loading && (
        <form onSubmit={(ev) => onSubmit(ev)} className="container p-4 mx-auto">
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
            {surveyFinished && (
              <div className="py-8 px-6 bg-emerald-500 text-white w-[600px] mx-auto">
                Thank you participating in the survey
              </div>
            )}
            {!surveyFinished && (
              <>
                <div>
                  {survey.questions &&
                    survey.questions.map((question, index) => (
                      <PublicQuestionView
                        key={question.id}
                        question={question}
                        index={index}
                        answerChanged={(val) => answerChanged(question, val)}
                      />
                    ))}
                </div>

                <button
                  type="submit"
                  className="inline-flex px-4 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm justify-centerpy-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
