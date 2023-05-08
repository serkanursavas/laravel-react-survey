import { useEffect, useState } from 'react'
import { useStateContext } from '../Context/ContextProvider'
import { PlusIcon, TrashIcon } from '@heroicons/react/outline'

export default function QuestionEditor({
  index = 0,
  question,
  addQuestion,
  deleteQuestion,
  questionChange,
}) {
  const [model, setModel] = useState({ ...question })
  const { questionTypes } = useStateContext()

  useEffect(() => {
    questionChange(model)
  }, [model])

  function upperCaseFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div>
      <div className="flex justify-between mb-3">
        <h4>
          {index + 1}. {model.question}
        </h4>
        <div className="flex items-center">
          <button
            type="button"
            className="flex items-center px-3 py-1 mr-3 text-xs text-white bg-gray-600 rounded-sm hover:bg-gray-700"
            onClick={() => addQuestion(index + 1)}
          >
            <PlusIcon className="w-4" />
            add
          </button>
          <button
            type="button"
            className="flex items-center px-3 py-1 text-xs font-semibold text-red-500 border border-transparent rounded-sm hover:border-red-500"
            onClick={() => deleteQuestion(question)}
          >
            <TrashIcon className="w-4" />
            delete
          </button>
        </div>
      </div>
      <div className="flex justify-between gap-3 mb-3">
        {/* Question Text */}
        <div className="flex-1">
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700"
          >
            Question
          </label>
          <input
            type="text"
            name="question"
            id="question"
            value={model.question}
            onChange={(ev) => setModel({ ...model, question: ev.target.value })}
            className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {/* Question Text */}

        {/* Question Type */}
        <div>
          <label
            htmlFor="questionType"
            className="block w-40 text-sm font-medium text-gray-700"
          >
            Question Type
          </label>
          <select
            id="questionType"
            name="questionType"
            value={model.type}
            onChange={(ev) => setModel({ ...model, type: ev.target.value })}
            className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {questionTypes.map((type) => (
              <option value={type} key={type}>
                {upperCaseFirst(type)}
              </option>
            ))}
          </select>
        </div>
        {/* Question Type */}
      </div>

      {/*Description*/}
      <div className="mb-3">
        <label
          htmlFor="questionDescription"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          name="questionDescription"
          id="questionDescription"
          value={model.description || ''}
          onChange={(ev) =>
            setModel({ ...model, description: ev.target.value })
          }
          className="block w-full px-3 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
        {/*Description*/}
      </div>
    </div>
  )
}
