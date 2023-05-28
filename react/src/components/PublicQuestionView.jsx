import React from 'react'

export default function PublicQuestionView({ question, index, answerChanged }) {
  let selectedOptions = []

  function onCheckboxChange(option, $event) {
    if ($event.target.checked) {
      selectedOptions.push(option.uuid)
    } else {
      selectedOptions = selectedOptions.filter((op) => op != option.uuid)
    }
    answerChanged(selectedOptions)
  }

  return (
    <>
      <fieldset className="mb-4">
        <div>
          <legend className="text-base font-medium text-gray-900">
            {index + 1}. {question.question}
          </legend>
          <p className="text-sm text-gray-500">{question.description}</p>
        </div>

        <div className="mt-3">
          {question.type === 'select' && (
            <div>
              <select
                onChange={(ev) => answerChanged(ev.target.value)}
                className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Please Select</option>
                {question.data.options.map((option) => (
                  <option key={option.uuid} value={option.text}>
                    {option.text}
                  </option>
                ))}
              </select>
            </div>
          )}
          {question.type === 'radio' && (
            <div>
              {question.data.options.map((option, ind) => (
                <div key={option.uuid} className="flex items-center">
                  <input
                    value={option.text}
                    onChange={(ev) => answerChanged(ev.target.value)}
                    name={'question' + question.id}
                    type="radio"
                    id={option.uuid}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={option.uuid}
                    className="block ml-3 text-sm font-medium text-gray-700"
                  >
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.type === 'checkbox' && (
            <div>
              {question.data.options.map((option, ind) => (
                <div key={option.uuid} className="flex items-center">
                  <input
                    id={option.uuid}
                    onChange={(ev) => onCheckboxChange(option, ev)}
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 border-r-gray-300"
                  />
                  <label
                    htmlFor={option.uuid}
                    className="block ml-3 text-sm font-medium text-gray-700"
                  >
                    {option.text}
                  </label>
                </div>
              ))}
            </div>
          )}
          {question.type === 'text' && (
            <div>
              <input
                type="text"
                onChange={(ev) => answerChanged(ev.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}
          {question.type === 'textarea' && (
            <div>
              <textarea
                onChange={(ev) => answerChanged(ev.target.value)}
                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 sm:text-sm"
              ></textarea>
            </div>
          )}
        </div>
      </fieldset>
      <hr className="mb-4" />
    </>
  )
}
