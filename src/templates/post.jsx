/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { SEO, TextSection, Header, Suggestion, Video } from 'components'
import { Newsletter, Layout } from 'layouts'
import { Helmet } from 'react-helmet'
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'

const Post = ({ data, pageContext }) => {
  const { html, frontmatter, excerpt, fields } = data.markdownRemark
  const {
    title,
    subTitle,
    path,
    textSections,
    upperGalleryImages,
    videoId,
  } = frontmatter
  const image = frontmatter.cover.childImageSharp.fluid.src

  useEffect(() => {
    // Create inline images with title displayed beneath
    let insertAfter = (referenceNode, newNode) => {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }
    const inlineImage = document
      .querySelectorAll('.site-text p img')
      .forEach(node => {
        let el = document.createElement('span')
        el.classList.add('inline-image-caption')
        el.innerHTML = node.title

        const newParent = document.createElement('a')
        node.parentElement.classList.add('inline-image-container')
        node.classList.add('lightbox-image')
        insertAfter(node, el)
        const parentContent = node.parentElement.innerHTML
        const imageSource = node.getAttribute('src')
        const newContent =
          '<a href="' +
          imageSource +
          '" data-attribute="SRL">' +
          parentContent +
          '</a>'
        node.parentElement.innerHTML = newContent
      })
  })

  return (
    <>
      <Helmet
        bodyAttributes={{
          class: 'post-page',
        }}
      />
      <Layout>
        <SEO
          title={title}
          description={excerpt || 'Welcome to ImpressionistArts.com'}
          banner={image}
          pathname={path}
          article
        />
        {/* This is the upprGallery & sideBar */}
        <SimpleReactLightbox>
          <SRLWrapper>
            <Header
              title={title}
              subTitleText={subTitle}
              intro={html}
              bodyTitles={fields.bodyTitle}
              images={upperGalleryImages}
              sideLinks={data.allMarkdownRemark.nodes}
            />
            <div className="site-content">
              <main className="site-main">
                {/* These are the TextSections */}
                {videoId !== null && videoId !== '' ? (
                  <Video videoId={videoId} title={title} subtitle={subTitle} />
                ) : null}
                {fields.bodyTitle.map((value, index) => {
                  return (
                    <TextSection
                      key={`section-${index}`}
                      index={index}
                      title={textSections[index].textTitle}
                      text={fields.bodyText[index]}
                      textSectionImageArray={
                        textSections[index].sideGalleryImages
                      }
                      buttonToggle={textSections[index].buttonToggle}
                    />
                  )
                })}
              </main>
            </div>
          </SRLWrapper>
          <Suggestion
            links={data.allMarkdownRemark.nodes}
            contextPages={pageContext}
          />
        </SimpleReactLightbox>
        <Newsletter />
      </Layout>
    </>
  )
}

export default Post

Post.propTypes = {
  pageContext: PropTypes.shape({
    prev: PropTypes.object,
    next: PropTypes.object,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
}

export const query = graphql`
  query($pathSlug: String!, $sideBarLinks: [String]) {
    allMarkdownRemark(filter: { frontmatter: { id: { in: $sideBarLinks } } }) {
      nodes {
        frontmatter {
          title
          path
          cover {
            childImageSharp {
              fixed(width: 250) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      html
      excerpt
      fields {
        bodyTitle
        bodyText
      }
      frontmatter {
        title
        subTitle
        videoId
        upperGalleryImages {
          topImage {
            topImageTitle
            topImageUrl {
              expandedImage: childImageSharp {
                fluid(srcSetBreakpoints: [800]) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          leftImage {
            leftImageTitle
            leftImageUrl {
              fixedImage: childImageSharp {
                fixed(width: 450) {
                  ...GatsbyImageSharpFixed
                }
              }
              expandedImage: childImageSharp {
                fluid(srcSetBreakpoints: [800]) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          middleImage {
            middleImageTitle
            middleImageUrl {
              fixedImage: childImageSharp {
                fixed(width: 450) {
                  ...GatsbyImageSharpFixed
                }
              }
              expandedImage: childImageSharp {
                fluid(srcSetBreakpoints: [800]) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          rightImage {
            rightImageTitle
            rightImageUrl {
              fixedImage: childImageSharp {
                fixed(width: 450) {
                  ...GatsbyImageSharpFixed
                }
              }
              expandedImage: childImageSharp {
                fluid(srcSetBreakpoints: [800]) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        textSections {
          textTitle
          buttonToggle
          sideGalleryImages {
            imageTitle
            imageUrl {
              fixedImage: childImageSharp {
                fixed(width: 250) {
                  ...GatsbyImageSharpFixed
                }
              }
              expandedImage: childImageSharp {
                fluid(srcSetBreakpoints: [800]) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        cover {
          childImageSharp {
            fluid(
              maxWidth: 800
              quality: 90
              duotone: { highlight: "#386eee", shadow: "#d3d3d3", opacity: 20 }
            ) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
