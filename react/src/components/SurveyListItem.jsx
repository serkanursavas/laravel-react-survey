import TButton from './core/TButton'
import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/outline'

const SurveyListItem = ({ survey, onDeleteClick }) => {
  return (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[470px] ">
      <img
        src={survey.image_url}
        alt={survey.title}
        className="object-cover w-full h-48"
      />
      <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: survey.description }}
        className="flex-1 overflow-hidden"
      ></div>

      <div className="flex items-center justify-between mt-3">
        <TButton to={`/surveys/${survey.id}`}>
          <PencilIcon className="w-5 h-5 mr-2" />
          Edit
        </TButton>
        <div className="flex items-center">
          <TButton href={`/view/survey/${survey.slug}`} circle link>
            <ShareIcon className="w-5 h-5 " />
          </TButton>
          {survey.id && (
            <button
              className="text-red-600"
              onClick={() => onDeleteClick(survey.id)}
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SurveyListItem
