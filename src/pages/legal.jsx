import React from 'react'
import { graphql } from 'gatsby'
import { Layout } from 'layouts'
import { SEO } from 'components'
import styled from '@emotion/styled'
import remark from 'remark'
import remarkHTML from 'remark-html'
import { SEOTitles } from '../../config/contants'

const Container = styled.div`
  margin: 5rem 4rem 3rem;

  @media (max-width: 1000px) {
    margin: 5rem 2rem 3rem;
  }
  @media (max-width: 700px) {
    margin: 4rem 1rem 2rem;
  }
  @media (min-width: 1200px) {
    width: 1100px;
    margin: 5rem auto 4rem auto;
  }
`

const Legal = ({ data }) => {
  const toHTML = value => remark().use(remarkHTML).processSync(value).toString()
  return (
    <Layout>
      <SEO
        title={SEOTitles.legal.title}
        description={SEOTitles.legal.description}
      />
      <Container
        dangerouslySetInnerHTML={{
          __html: toHTML(data.markdownRemark.frontmatter.text),
        }}
      />
    </Layout>
  )
}

export default Legal

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/pages/legal.md/" }) {
      frontmatter {
        text
      }
    }
  }
`
