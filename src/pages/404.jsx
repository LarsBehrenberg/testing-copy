import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { Layout } from 'layouts'
import { SEO } from 'components'
import { SEOTitles } from '../../config/contants'

const Wrapper = styled.section`
  text-align: center;
  margin: auto;
  padding: 15.5rem 1.5rem;
  width: 80%;
  max-width: 80vw;
  height: 100%;
  flex: 1;
`

const ErrorPage = center => (
  <Layout>
    <SEO
      title={SEOTitles.notFound.title}
      description={SEOTitles.notFound.description}
    />
    <Wrapper>
      <h1>Woops, something went wrong.</h1>
      <h3>This page does not exist or is no longer reachable.</h3>
      <h3>
        You can return to the{' '}
        <Link to="/" style={{ color: '#e53132' }}>
          Homepage
        </Link>
        .
      </h3>
    </Wrapper>
  </Layout>
)

export default ErrorPage
