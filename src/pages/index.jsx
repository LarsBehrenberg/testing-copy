import React from 'react'
import chunk from 'lodash/chunk'
import { graphql } from 'gatsby'
import { Layout, Newsletter } from 'layouts'
import {
  PostList,
  ImageCarousel,
  SEO,
  PostWrapper,
  ButtonWrapper,
  CategoryWrapper,
  ViewButtonWrapper,
  TagButton,
  GridButtonSVG,
  ListButtonSVG,
  LoadMore,
} from 'components'
import {
  pinnedPosts,
  orderedCategories,
  SEOTitles,
} from '../../config/contants'

if (typeof window !== `undefined`) {
  window.postsToShow = 10
}

class Index extends React.Component {
  constructor() {
    super()
    let postsToShow = 10
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow
    }

    this.state = {
      showingMore: postsToShow > 10,
      postsToShow,
      categorizedData: null,
      currentCategory: 'all',
      currentView: 'grid',
    }
  }

  // Fetch more posts on request
  update = () => {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight)
    if (this.state.showingMore && distanceToBottom < 700) {
      this.setState({ postsToShow: this.state.postsToShow + 10 })
    }
    this.ticking = false
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true
      requestAnimationFrame(() => this.update())
    }
  }

  componentDidMount() {
    this.setState({ categorizedData: this.props.data.allMarkdownRemark.edges })
    window.addEventListener(`scroll`, this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll)
    window.postsToShow = this.state.postsToShow
  }

  render() {
    // Const of all Markdown posts
    const { edges } = this.props.data.allMarkdownRemark

    // Get only tags from MD posts, store in an array, flatten array and remove duplicates
    const tagArray = edges.map(({ node }) => node.frontmatter.tags)
    const categories = [...new Set(tagArray)]

    // Category buttons
    const categoryPressed = category => {
      const posts = edges || []

      const categorizedData = posts.filter(post => {
        const { tags } = post.node.frontmatter
        return tags && tags === category
      })
      this.setState({
        categorizedData,
        currentCategory: category,
      })
    }

    // Sorting posts posts and displaying them
    const { categorizedData, currentCategory, currentView } = this.state

    const sortData = data =>
      data.sort((a, b) => {
        const firstPost =
          pinnedPosts[a.node.frontmatter.id] === undefined
            ? data.length
            : pinnedPosts[a.node.frontmatter.id]

        const secondPost =
          pinnedPosts[b.node.frontmatter.id] === undefined
            ? data.length
            : pinnedPosts[b.node.frontmatter.id]
        return firstPost - secondPost
      })

    const sortedCategorizedData = categorizedData
      ? sortData(categorizedData)
      : sortData(edges)

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
                this.setState({
                  categorizedData: edges,
                  currentCategory: 'all',
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
                this.setState({
                  currentView: 'grid',
                })
              }}
              className="set-view-button"
            >
              <GridButtonSVG />
            </TagButton>
            <TagButton
              onClick={() => {
                this.setState({
                  currentView: 'list',
                })
              }}
              className="set-view-button"
            >
              <ListButtonSVG />
            </TagButton>
          </ViewButtonWrapper>
        </ButtonWrapper>
        <PostWrapper>
          {/* {sortedCategorizedData
            ? sortedCategorizedData.map(({ node }) => {
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
                    view={this.state.currentView}
                  />
                )
              })
            : null} */}
          {chunk(sortedCategorizedData.slice(0, this.state.postsToShow), 3).map(
            (chunk, i) =>
              chunk.map(({ node }) => {
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
                    view={this.state.currentView}
                  />
                )
              })
          )}
          {!this.state.showingMore && (
            <LoadMore>
              <a
                data-testid="load-more"
                onClick={() => {
                  this.setState({
                    postsToShow: this.state.postsToShow + 10,
                    showingMore: true,
                  })
                }}
              >
                Load More
              </a>
            </LoadMore>
          )}
        </PostWrapper>
        <Newsletter />
      </Layout>
    )
  }
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
                fluid(
                  maxWidth: 450
                  quality: 50
                  traceSVG: { color: "#161C2E" }
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
