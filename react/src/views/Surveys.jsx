import { PlusCircleIcon } from '@heroicons/react/outline'
import { useStateContext } from '../Context/ContextProvider'
import PageComponent from '../components/PageComponent'
import SurveyListItem from '../components/SurveyListItem'
import TButton from '../components/core/TButton'
import { useEffect, useState } from 'react'
import axiosClient from '../axios'

function Surveys() {
  // const { surveys } = useStateContext()
  const [surveys, setSurveys] = useState([])

  const onDeleteClick = () => {
    console.log('On Delete click')
  }

  useEffect(() => {
    axiosClient.get('/survey').then(({ data }) => {
      setSurveys(data.data)
    })
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
    </PageComponent>
  )
}

export default Surveys
