import { useStateContext } from '../Context/ContextProvider'
import PageComponent from '../components/PageComponent'
import SurveyListItem from '../components/SurveyListItem'

function Surveys() {
  const { surveys } = useStateContext()
  console.log(surveys)

  const onDeleteClick = () => {
    console.log('On Delete click')
  }
  return (
    <PageComponent title="Surveys">
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
