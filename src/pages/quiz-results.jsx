/* eslint-disable no-undef */
import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { Layout } from 'layouts'
import { SEO } from 'components'
import { SEOTitles } from '../../config/contants'

const ResultWrapper = styled.div`
  background-color: #ecf5ff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`

const FinalScore = styled.h1`
  font-size: 4rem;
  color: #e53132;
`

const StyledLink = styled(Link)`
  font-size: 1.3rem;
  padding: 0.7rem 0;
  width: 10rem;
  text-align: center;
  border: 0.1rem solid #56a5eb;
  margin-bottom: 1rem;
  text-decoration: none;
  color: #56a5eb;
  background-color: white;
  margin: 1rem;
  border-radius: 0.4rem;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: scale(1.05);
  }
`

const Form = styled.form`
  display: flex;
  flex-flow: row wrap;
  flex-wrap: wrap;
  justify-content: center;
`

class QuizResults extends React.Component {
  componentDidMount() {
    const mostRecentScore = localStorage.getItem('mostRecentScore')
    this.finalScoreMessage(parseInt(mostRecentScore))

    document.getElementById('finalScore').innerText = mostRecentScore
  }

  finalScoreMessage = score => {
    if (score > 8) {
      document.getElementById('finalMessage').innerText =
        'Congratulations, you know your Manet from your Monet!'
    } else if (score >= 6) {
      document.getElementById('finalMessage').innerText =
        'Good work. But check out our timeline page to get top marks!'
    } else if (score >= 4) {
      document.getElementById('finalMessage').innerText =
        "Not bad, but there's room for improvement!  Start with our Monet page."
    } else {
      document.getElementById('finalMessage').innerText =
        'You need to do some serious research!'
    }
  }

  render() {
    return (
      <Layout>
        <SEO
          title={SEOTitles.quizResults.title}
          description={SEOTitles.quizResults.description}
        />
        <ResultWrapper>
          <div id="end" className="justify-center flex-column">
            <h3>You scored:</h3>
            <FinalScore id="finalScore">0</FinalScore>

            <h2 id="finalMessage">You need to do some serious research!</h2>
            <Form>
              <StyledLink to="/quiz">Play Again*</StyledLink>
              <StyledLink to="/">Homepage</StyledLink>
            </Form>
            <h3 style={{ paddingTop: '30px' }}>
              *Our quiz has a database of over 100 questions.
            </h3>
          </div>
        </ResultWrapper>
      </Layout>
    )
  }
}

export default QuizResults
