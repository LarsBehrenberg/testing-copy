import React from 'react'
import { Layout } from 'layouts'
import { Game, SEO } from 'components'
import { SEOTitles } from '../../config/contants'

const Quiz = () => {
  return (
    <Layout>
      <SEO
        title={SEOTitles.quizResults.title}
        description={SEOTitles.quizResults.description}
      />
      <Game />
    </Layout>
  )
}

export default Quiz
