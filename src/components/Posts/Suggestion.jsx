import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { graphql, useStaticQuery } from 'gatsby'

const Suggestion = ({ links, contextPages }) => {
  const data = useStaticQuery(graphql`
    query {
      file(absolutePath: { regex: "/backgrounds/quiz.jpg/" }) {
        childImageSharp {
          fixed(width: 200) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const firstSuggestion = links[0]
    ? links[0].frontmatter
    : contextPages.next.frontmatter
  const secondSuggestion = links[1]
    ? links[1].frontmatter
    : contextPages.prev.frontmatter
  const thirdSuggestion = links[2] ? links[2].frontmatter : false

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9">
          <div className="site-sugg">
            <h3>People also like</h3>
            <div className="site-gallery">
              <div className="ttde-gallery sugg">
                <div className="ttde-gallery-inner">
                  <div className="ttde-gallery-bottom">
                    <div className="ttde-gallery-col ttde-gallery-col-1">
                      <div className="ttde-gallery-col-inner">
                        <Link
                          className="ttde-gallery-url"
                          to={`/${firstSuggestion.path}`}
                          data-gallery=""
                          title={firstSuggestion.title}
                        >
                          <span className="ttde-gallery-open-btn">
                            <span>{firstSuggestion.title}</span>
                          </span>
                          <Img
                            fixed={firstSuggestion.cover.childImageSharp.fixed}
                            alt={firstSuggestion.title}
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                          />
                        </Link>
                      </div>
                    </div>
                    <div className="ttde-gallery-col ttde-gallery-col-2">
                      <div className="ttde-gallery-col-inner">
                        {thirdSuggestion ? (
                          <Link
                            className="ttde-gallery-url"
                            to={`/${thirdSuggestion.path}`}
                            data-gallery=""
                            title={thirdSuggestion.title}
                          >
                            <span className="ttde-gallery-open-btn">
                              <span>{thirdSuggestion.title}</span>
                            </span>
                            <Img
                              fixed={
                                thirdSuggestion.cover.childImageSharp.fixed
                              }
                              alt={thirdSuggestion.title}
                              style={{
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </Link>
                        ) : (
                          <Link
                            className="ttde-gallery-url"
                            to="/quiz"
                            title="Try our 100 question impressionism quiz"
                          >
                            <span className="ttde-gallery-open-btn">
                              <span>2-minute quiz</span>
                            </span>
                            <Img
                              fixed={data.file.childImageSharp.fixed}
                              alt="Try our 100 question impressionism quiz"
                              style={{
                                width: '100%',
                                height: '100%',
                              }}
                            />
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="ttde-gallery-col ttde-gallery-col-3 ttde-gallery-open">
                      <div className="ttde-gallery-col-inner">
                        <Link
                          className="ttde-gallery-url"
                          to={`/${secondSuggestion.path}`}
                          title={secondSuggestion.title}
                        >
                          <span className="ttde-gallery-open-btn">
                            <span>{secondSuggestion.title}</span>
                          </span>
                          <Img
                            fixed={secondSuggestion.cover.childImageSharp.fixed}
                            alt={secondSuggestion.title}
                            style={{
                              width: '100%',
                              height: '100%',
                            }}
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Suggestion
