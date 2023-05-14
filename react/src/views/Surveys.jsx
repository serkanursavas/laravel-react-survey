import { PlusCircleIcon } from '@heroicons/react/outline'
import { useStateContext } from '../Context/ContextProvider'
import PageComponent from '../components/PageComponent'
import SurveyListItem from '../components/SurveyListItem'
import TButton from '../components/core/TButton'
import { useEffect, useState } from 'react'
import axiosClient from '../axios'
import PaginationLinks from '../components/PaginationLinks'
import router from '../router'

function Surveys() {
  const { showToast } = useStateContext()
  const [surveys, setSurveys] = useState([])
  const [meta, setMeta] = useState()
  const [loading, setLoading] = useState(false)

  const onDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      axiosClient.delete(`/survey/${id}`).then(() => {
        getSurveys()
        showToast('The survey was deleted')
      })
    }
  }

  const onPageClick = (link) => {
    getSurveys(link.url)
  }

  const getSurveys = (url) => {
    url = url || '/survey'
    setLoading(true)
    axiosClient.get(url).then(({ data }) => {
      setSurveys(data.data)
      setMeta(data.meta)
      setLoading(false)
    })
  }

  useEffect(() => {
    getSurveys()
  }, [])

  return (
    <PageComponent
      title="Surveys"
      buttons={
        <TButton color="green" to="/surveys/create">
          <PlusCircleIcon className="w-6 h-6 mr-2" />
          Create New
        </TButton>
      }
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {surveys.length === 0 && (
            <div className="py-8 text-center text-gray-700">
              You dont have surveys created
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
            {surveys.map((survey) => {
              return (
                <SurveyListItem
                  survey={survey}
                  key={survey.id}
                  onDeleteClick={onDeleteClick}
                />
              )
            })}
          </div>

          <PaginationLinks meta={meta} onPageClick={onPageClick} />
        </div>
      )}
    </PageComponent>
  )
}

export default Surveys
