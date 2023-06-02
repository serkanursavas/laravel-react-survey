import { PlusIcon } from '@heroicons/react/outline'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import QuestionEditor from './QuestionEditor'

export default function SurveyQuestion({ questions, onQuestionsUpdate }) {
  const [myQuestions, setMyQuestions] = useState([...questions])

  const addQuestion = (index) => {
    index = index !== undefined ? index : myQuestions.length - 1
    myQuestions.splice(index, 0, {
      id: uuidv4(),
      type: 'text',
      question: '',
      description: '',
      data: {},
    })
    setMyQuestions([...myQuestions])
    onQuestionsUpdate(myQuestions)
  }

  const questionChange = (question) => {
    if (!question) return
    const newQuestions = myQuestions.map((q) => {
      if (q.id == question.id) {
        return { ...question }
      }
      return q
    })
    setMyQuestions(newQuestions)
    onQuestionsUpdate(newQuestions)
  }

  const deleteQuestion = (question) => {
    const newQuestions = myQuestions.filter((q) => q.id !== question.id)

    setMyQuestions(newQuestions)
    onQuestionsUpdate(newQuestions)
  }

  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">Questions</h3>
        <button
          type="button"
          className="flex items-center px-4 py-1 text-sm text-white bg-gray-600 rounded-sm hover:bg-gray-700"
          onClick={() => addQuestion()}
        >
          <PlusIcon className="w-4 mr-2" />
          Add question
        </button>
      </div>
      {myQuestions ? (
        myQuestions.map((q, ind) => (
          <QuestionEditor
            key={q.id}
            index={ind}
            question={q}
            questionChange={questionChange}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
          />
        ))
      ) : (
        <div className="py-4 text-center text-gray-400">
          You dont have any question created
        </div>
      )}
    </>
  )
}
