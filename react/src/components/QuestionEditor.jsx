import { useEffect, useState } from 'react'
import { useStateContext } from '../Context/ContextProvider'
import { PlusIcon, TrashIcon } from '@heroicons/react/outline'
import { v4 as uuidv4 } from 'uuid'

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

  function shouldHaveOptions(type = null) {
    type = type || model.type
    return ['select', 'radio', 'checkbox'].includes(type)
  }

  function onTypeChange(ev) {
    const newModel = {
      ...model,
      type: ev.target.value,
    }
    if (!shouldHaveOptions(model.type) && shouldHaveOptions(ev.target.value)) {
      if (!model.data.options) {
        newModel.data = {
          options: [{ uuid: uuidv4(), text: '' }],
        }
      }
    }
    setModel(newModel)
  }

  const addOption = () => {
    model.data.options.push({
      uuid: uuidv4(),
      text: '',
    })
    setModel({ ...model })
  }

  function deleteOption(op) {
    model.data.options = model.data.options.filter(
      (option) => option.uuid != op.uuid
    )
    setModel({ ...model })
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
            onChange={onTypeChange}
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

      <div>
        {shouldHaveOptions() && (
          <div>
            <h4 className="flex items-center justify-between mb-1 text-sm font-semibold">
              Options
              <button
                type="button"
                className="flex items-center px-2 py-1 text-xs text-white bg-gray-600 roundded-sm hover:bg-gray-700"
                onClick={addOption}
              >
                Add
              </button>
            </h4>
            {model.data.options && model.data.options.length === 0 && (
              <div className="py-3 text-xs text-center text-gray-600">
                You dont have any options defined
              </div>
            )}
            {model.data.options && model.data.options.length >= 1 && (
              <div>
                {model.data.options.map((op, ind) => {
                  return (
                    <div key={ind} className="flex items-center mb-1 ">
                      <span className="w-6 text-sm">{ind + 1}.</span>
                      <input
                        className="w-full px-2 py-1 text-xs border border-gray-300 rounded-sm focus:border-indigo-500"
                        type="text"
                        value={op.text}
                        onChange={(ev) => {
                          op.text = ev.target.value
                          setModel({ ...model })
                        }}
                      />
                      <button
                        onClick={(ev) => deleteOption(op)}
                        type="button"
                        className="flex items-center justify-center w-6 h-6 transition-colors border border-transparent rounded-full hover:border-red-100"
                      >
                        <TrashIcon className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
      {model.type === 'select' && <div></div>}

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
