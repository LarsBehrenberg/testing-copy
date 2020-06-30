import React from 'react'
import { Layout } from 'layouts'
import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { SEO, BackgroundImage } from 'components'
import { SEOTitles } from '../../config/contants'

const Container = styled.div`
  margin: 0 auto;
  width: 100vw;
  display: flex;
`

const FormWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 3.5rem 1rem 2rem;

  @media (min-width: 900px) {
    width: 50%;
    padding: 3.5rem 4rem 2rem;
  }
`
const IntroTextWrapper = styled.div`
  margin: 0 1%;
  max-width: 600px;

  @media (max-width: 400px) {
    word-break: break-word;
  }
`

const ThankYou = () => (
  <Layout>
    <SEO
      title={SEOTitles.thankYou.title}
      description={SEOTitles.thankYou.title}
    />
    <Container>
      <BackgroundImage />
      <FormWrapper>
        <IntroTextWrapper>
          <h1>Thank you!</h1>
          <h3>Your form submission has been received.</h3>
          <h3>
            Return here to the{' '}
            <Link to="/" style={{ color: '#e53132' }}>
              Homepage
            </Link>
            .
          </h3>
        </IntroTextWrapper>
      </FormWrapper>
    </Container>
  </Layout>
)

export default ThankYou
