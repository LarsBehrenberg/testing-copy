import React, { useState } from 'react'
import { graphql } from 'gatsby'
import styled from '@emotion/styled'
import { Layout, Newsletter } from 'layouts'
import { PostList, ImageCarousel, SEO } from 'components'
import {
  pinnedPosts,
  orderedCategories,
  SEOTitles,
} from '../../config/contants'

const PostWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 2rem 4rem 1rem 4rem;

  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 3rem 1rem 1rem 1rem;
  }
  @media (min-width: 1200px) {
    width: 1170px;
    margin: 2rem auto 1rem auto;

    a.grid-view:first-of-type:nth-last-of-type(2),
    a.grid-view:first-of-type:nth-last-of-type(2) ~ a.grid-view {
      flex-basis: 48%;
      max-width: 48%;
      width: 48%;
    }

    & a.grid-view:nth-of-type(5n-1),
    a.grid-view:nth-of-type(5n) {
      flex-basis: 48%;
      max-width: 48%;
      width: 48%;
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2rem 4rem 1rem 4rem;

  @media (max-width: 1000px) {
    margin: 4rem 2rem 1rem 2rem;
  }
  @media (max-width: 700px) {
    margin: 3rem 1rem 1rem 1rem;
  }
  @media (min-width: 1200px) {
    width: 1170px;
    margin: 2rem auto 1rem auto;
  }
`

const CategoryWrapper = styled.div`
  @media (min-width: 1200px) {
    max-width: 600px;
  }
`

const ViewButtonWrapper = styled.div`
  width: 136px;
  @media (max-width: 1200px) {
    width: 68px;
  }
`

const TagButton = styled.span`
  z-index: 5;
  font-size: 14px;
  line-height: 35px;
  color: #757575;
  text-transform: uppercase;
  border-width: 1px;
  border-style: solid;
  display: inline-block;
  height: 35px;
  border-radius: 4px;
  border-color: #dedede;
  background-color: white;
  padding: 0 15px;
  outline: none;
  text-decoration: none !important;
  margin: 0 5px 10px 5px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background: #e53132;
    color: white;
    border-color: #e53132;
  }

  &.active {
    background: #e53132;
    color: white;
    border-color: #e53132;
  }
`

const Index = ({ data }) => {
  // Const of all Markdown posts
  const { edges } = data.allMarkdownRemark

  // Get only tags from MD posts, store in an array, flatten array and remove duplicates
  const tagArray = edges.map(({ node }) => node.frontmatter.tags)
  const categories = [...new Set(tagArray)]

  // Set state for manipulating displayed posts after searching or sorting
  const [state, setState] = useState({
    categorizedData: edges,
    currentCategory: 'all',
    currentView: 'grid',
  })

  const categoryPressed = category => {
    const posts = edges || []

    const categorizedData = posts.filter(post => {
      const { tags } = post.node.frontmatter
      return tags && tags === category
    })
    setState({
      categorizedData,
      currentCategory: category,
      currentView,
    })
  }
  const { categorizedData, currentCategory, currentView } = state

  return (
    <Layout>
      <SEO
        title={SEOTitles.index.title}
        description={SEOTitles.index.description}
      />
      <ImageCarousel />
      <ButtonWrapper>
        <CategoryWrapper>
          <TagButton
            onClick={() => {
              setState({
                categorizedData: edges,
                currentCategory: 'all',
                currentView,
              })
            }}
            className={`${currentCategory === 'all' ? 'active' : ''}`}
          >
            All Posts
          </TagButton>
          {categories
            .sort(
              (a, b) =>
                orderedCategories[a.toUpperCase()] -
                orderedCategories[b.toUpperCase()]
            )
            .map(tag => (
              <TagButton
                onClick={() => categoryPressed(tag)}
                className={`${currentCategory === tag ? 'active' : ''}`}
                key={tag}
              >
                {tag}
              </TagButton>
            ))}
        </CategoryWrapper>
        <ViewButtonWrapper>
          <TagButton
            onClick={() => {
              setState({
                categorizedData,
                currentCategory,
                currentView: 'grid',
              })
            }}
            style={{ paddingTop: '3px' }}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="#333">
              <path d="M4.33337 13.8424H12.0371V5.4165H4.33337V13.8424ZM4.33337 20.5832H12.0371V15.5276H4.33337V20.5832ZM13.963 20.5832H21.6667V12.1572H13.963V20.5832ZM13.963 5.4165V10.4721H21.6667V5.4165H13.963Z"></path>
            </svg>
          </TagButton>
          <TagButton
            onClick={() => {
              setState({
                categorizedData,
                currentCategory,
                currentView: 'list',
              })
            }}
            style={{ paddingTop: '3px' }}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="#333">
              <path d="M4.33331 15.1665H8.41174V10.8332H4.33331V15.1665ZM4.33331 20.5832H8.41174V16.2498H4.33331V20.5832ZM4.33331 9.74984H8.41174V5.4165H4.33331V9.74984ZM9.43135 15.1665H21.6666V10.8332H9.43135V15.1665ZM9.43135 20.5832H21.6666V16.2498H9.43135V20.5832ZM9.43135 5.4165V9.74984H21.6666V5.4165H9.43135Z"></path>
            </svg>
          </TagButton>
        </ViewButtonWrapper>
      </ButtonWrapper>
      <PostWrapper>
        {categorizedData
          ? categorizedData
              .sort((a, b) => {
                const firstPost =
                  pinnedPosts[a.node.frontmatter.id] === undefined
                    ? categorizedData.length
                    : pinnedPosts[a.node.frontmatter.id]

                const secondPost =
                  pinnedPosts[b.node.frontmatter.id] === undefined
                    ? categorizedData.length
                    : pinnedPosts[b.node.frontmatter.id]
                return firstPost - secondPost
              })
              .map(({ node }) => {
                const { excerpt, frontmatter } = node
                const { cover, path, title, date, subTitle, id } = frontmatter

                currentCategory === 'all' ? true : false

                return (
                  <PostList
                    key={id}
                    cover={cover.childImageSharp.fluid}
                    path={path}
                    title={title}
                    subTitle={subTitle}
                    date={date}
                    excerpt={excerpt}
                    view={state.currentView}
                  />
                )
              })
          : null}
      </PostWrapper>
      <Newsletter />
    </Layout>
  )
}

export default Index

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: {
        frontmatter: { showOnIndex: { eq: true } }
        fileAbsolutePath: { regex: "/posts/" }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          excerpt(pruneLength: 150)
          frontmatter {
            id
            title
            subTitle
            path
            tags
            date(formatString: "dddd, MMMM Do YYYY")
            cover {
              childImageSharp {
                fluid(maxWidth: 450, quality: 50) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
