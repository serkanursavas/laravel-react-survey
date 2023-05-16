import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios'

export default function SurveyPublicView() {
  const { slug } = useParams()
  const [survey, setSurvey] = useState({})

  useEffect(() => {
    axiosClient.get(`survey/get-by-slug/${slug}`).then(({ data }) => {
      setSurvey(data)
    })
  }, [])

  return (
    <div>
      <pre>{JSON.stringify(survey, undefined, 2)}</pre>
    </div>
  )
}
