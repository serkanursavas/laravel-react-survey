import PageComponent from '../components/PageComponent'
import DashboardCard from '../components/DashboardCard'
import { useState, useEffect } from 'react'
import axiosClient from '../axios'
import TButton from '../components/core/TButton'
import { EyeIcon, PencilIcon } from '@heroicons/react/outline'

function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
    setLoading(true)
    axiosClient
      .get(`/dashboard`)
      .then((res) => {
        setLoading(false)
        setData(res.data)
        return res
      })
      .catch((error) => {
        setLoading(false)
        return error
      })
  }, [])

  return (
    <PageComponent title="Dashboard">
      {loading && <div className="flex justify-center">Loading...</div>}
      {!loading && (
        <div className="grid grid-cols-1 gap-5 text-gray-700 md:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Total Surveys"
            className="order-1 lg:order-2"
            style="animaton-delay: 0.1s"
          >
            <div className="flex items-center justify-center flex-1 pb-4 font-semibold text-8xl">
              {data.totalSurveys}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Total Answers"
            className="order-2 lg:order-4"
            style="animaton-delay: 0.2s"
          >
            <div className="flex items-center justify-center flex-1 pb-4 font-semibold text-8xl">
              {data.totalAnswers}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Latest Survey"
            className="order-3 row-span-2 lg:order-1"
            style="animaton-delay: 0.2s"
          >
            {data.latestSurvey && (
              <div>
                <img
                  src={data.latestSurvey.image_url}
                  className="w-[240px] mx-auto"
                />
                <h3 className="mb-3 text-xl font-bold">
                  {data.latestSurvey.title}
                </h3>
                <div className="flex justify-between mb-1 text-sm">
                  <div>Created Date:</div>
                  <div>{data.latestSurvey.created_at}</div>
                </div>
                <div className="flex justify-between mb-1 text-sm">
                  <div>Expire Date:</div>
                  <div>{data.latestSurvey.expire_date}</div>
                </div>
                <div className="flex justify-between mb-1 text-sm">
                  <div>Status:</div>
                  <div>{data.latestSurvey.status ? 'Active' : 'Draft'}</div>
                </div>
                <div className="flex justify-between mb-1 text-sm">
                  <div>Questions:</div>
                  <div>{data.latestSurvey.questions}</div>
                </div>
                <div className="flex justify-between mb-1 text-sm">
                  <div>Answers:</div>
                  <div>{data.latestSurvey.answers}</div>
                </div>
                <div className="flex justify-between">
                  <TButton to={`/surveys/${data.latestSurvey.id}`} link>
                    <PencilIcon className="w-5 h-5 mr-2" />
                    Edit Survey
                  </TButton>

                  <TButton link>
                    <EyeIcon className="w-5 h-5 mr-2" />
                    View Answers
                  </TButton>
                </div>
              </div>
            )}
            {!data.latestSurvey && (
              <div className="py-16 text-center text-gray-600">
                Your don't have surveys yet
              </div>
            )}
          </DashboardCard>

          <DashboardCard
            title="Latest Answer"
            className="order-4 row-span-3 lg:order-3"
            style="animaton-delay: 0.3s"
          >
            {data.latestAnswers && data.latestAnswers.length && (
              <div className="text-left">
                {data.latestAnswers.map((answer, index) => {
                  return (
                    <div key={index}>
                      <a href="#" className="block p-2 hover:bg-gray-100/90">
                        <div className="font-semibold">
                          {answer.survey.title}
                        </div>
                        <small>
                          Answer Made at:
                          <i className="font-semibold">{answer.end_date}</i>
                        </small>
                      </a>
                    </div>
                  )
                })}
              </div>
            )}
            {data.latestAnswers && !data.latestAnswers.length && (
              <div className="py-16 text-center text-gray-600">
                Your don't have answers yet
              </div>
            )}
          </DashboardCard>
        </div>
      )}
    </PageComponent>
  )
}

export default Dashboard
