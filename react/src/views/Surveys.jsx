import { PlusCircleIcon } from '@heroicons/react/outline'
import { useStateContext } from '../Context/ContextProvider'
import PageComponent from '../components/PageComponent'
import SurveyListItem from '../components/SurveyListItem'
import TButton from '../components/core/TButton'

function Surveys() {
  const { surveys } = useStateContext()

  const onDeleteClick = () => {
    console.log('On Delete click')
  }
  return (
    <PageComponent
      title="Surveys"
      buttons={
        <TButton color="green" to="/surveys/create">
          <PlusCircleIcon className="h-6 w-6 mr-2" />
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
