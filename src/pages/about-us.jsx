import React, { useEffect } from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { Layout, Newsletter } from 'layouts'
import { SEO } from 'components'
import { SEOTitles } from '../../config/contants'
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox'

const AboutUs = ({ data }) => {
  const { title, subTitle } = data.markdownRemark.frontmatter
  const {
    topImage,
    leftImage,
    middleImage,
    rightImage,
  } = data.markdownRemark.frontmatter.upperGalleryImages
  const artists = data.allMarkdownRemark.nodes

  // React Hook to initiate and clean up eventlisteners after mounting
  useEffect(() => {
    // Create inline images with title displayed beneath
    let insertAfter = (referenceNode, newNode) => {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }
    const normalInlineImage = document
      .querySelectorAll('.site-text p > img')
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

    const gatsbyInlineImage = document
      .querySelectorAll('.site-text p .gatsby-resp-image-wrapper')
      .forEach(node => {
        let el = document.createElement('span')
        el.classList.add('inline-image-caption')
        el.innerHTML = node.querySelector('img').title

        const newParent = document.createElement('a')
        node.parentElement.classList.add('inline-image-container')
        insertAfter(node, el)
        const parentContent = node.parentElement.innerHTML
        const imageSource = node.querySelector('img').getAttribute('src')
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
      <Layout>
        <SEO
          title={SEOTitles.aboutUs.title}
          description={SEOTitles.aboutUs.description}
          banner={topImage.topImageUrl.expandedImage.fluid.src}
        />

        <SimpleReactLightbox>
          <SRLWrapper>
            <div className="container" style={{ paddingTop: '40px' }}>
              <div className="row">
                <div className="col-sm-9">
                  <section className="site-block top">
                    <div className="site-title">
                      <h1>
                        <span className="page__title-ttd">{subTitle} </span>
                        <span className="page__title-e" itemProp="name">
                          {title}
                          <span />{' '}
                        </span>
                      </h1>
                    </div>
                    <div className="site-gallery">
                      <div className="ttde-gallery">
                        <div className="ttde-gallery-inner">
                          <div className="ttde-gallery-top ttdegalleryitem">
                            <a
                              className="ttde-gallery-top-inner"
                              href={
                                topImage.topImageUrl.expandedImage.fluid.src
                              }
                              data-attribute="SRL"
                            >
                              <Img
                                fluid={topImage.topImageUrl.expandedImage.fluid}
                                alt={topImage.topImageTitle}
                                className="smallery-item-img top"
                                loading="eager"
                                style={{
                                  width: '100%',
                                  height: '100%',
                                }}
                              />
                            </a>
                          </div>
                          <div className="ttde-gallery-bottom">
                            <div className="ttde-gallery-col ttde-gallery-col-1 ttdegalleryitem">
                              <a
                                className="ttde-gallery-col-inner"
                                href={
                                  leftImage.leftImageUrl.expandedImage.fluid.src
                                }
                                data-attribute="SRL"
                              >
                                <Img
                                  fluid={
                                    leftImage.leftImageUrl.expandedImage.fluid
                                  }
                                  alt={leftImage.leftImageTitle}
                                  className="smallery-item-img"
                                  loading="eager"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                  }}
                                />
                              </a>
                            </div>
                            <div className="ttde-gallery-col ttde-gallery-col-2 ttdegalleryitem">
                              <a
                                className="ttde-gallery-col-inner"
                                href={
                                  middleImage.middleImageUrl.expandedImage.fluid
                                    .src
                                }
                                data-attribute="SRL"
                              >
                                <Img
                                  fluid={
                                    middleImage.middleImageUrl.expandedImage
                                      .fluid
                                  }
                                  alt={middleImage.middleImageTitle}
                                  className="smallery-item-img"
                                  loading="eager"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                  }}
                                />
                              </a>
                            </div>
                            <div className="ttde-gallery-col ttde-gallery-col-3 ttdegalleryitem ttde-gallery-open">
                              <a
                                className="ttde-gallery-col-inner"
                                href={
                                  rightImage.rightImageUrl.expandedImage.fluid
                                    .src
                                }
                                data-attribute="SRL"
                              >
                                <Img
                                  fluid={
                                    rightImage.rightImageUrl.expandedImage.fluid
                                  }
                                  alt={rightImage.rightImageTitle}
                                  className="smallery-item-img"
                                  loading="eager"
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                  }}
                                />

                                <span className="ttde-gallery-open-btn">
                                  <span>More images 20+</span>
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="site-bb"
                      itemScope=""
                      itemType="http://schema.org/BreadcrumbList"
                    >
                      <ul>
                        <li
                          itemProp="itemListElement"
                          itemScope=""
                          itemType="http://schema.org/ListItem"
                        >
                          <Link to="/">
                            <span itemProp="name">Home</span>
                          </Link>
                          <meta itemProp="position" content="1" />
                        </li>
                        <li
                          itemProp="itemListElement"
                          itemScope=""
                          itemType="http://schema.org/ListItem"
                        >
                          <span itemProp="name">About Us</span>
                          <meta itemProp="position" content="3" />
                        </li>
                      </ul>
                    </div>
                    <div
                      className="site-text"
                      dangerouslySetInnerHTML={{
                        __html: data.markdownRemark.html,
                      }}
                    >
                      {/* Intro text here */}
                    </div>
                  </section>
                </div>
                <div className="col-sm-3">
                  <section className="site-sidebar" id="sidebar-container">
                    <div className="container">
                      <div className="row">
                        <div className="col-sm-push-9 col-sm-3" id="sidebar">
                          <div className="list-group">
                            <a href="#top" className="list-group-item active">
                              <h4 className="list-group-item-heading">
                                Impressionist Painters
                              </h4>
                            </a>
                            {artists.map(artist => (
                              <Link
                                to={`/${artist.frontmatter.path}`}
                                className="list-group-item"
                                key={artist.frontmatter.title}
                              >
                                <h5 className="list-group-item-heading">
                                  {artist.frontmatter.title}
                                </h5>
                              </Link>
                            ))}
                            <Link to="/quiz" className="list-group-item active">
                              <h4 className="list-group-item-heading">
                                Impressionism Quiz
                              </h4>
                            </Link>
                            <Link
                              to="/gallery"
                              className="list-group-item active"
                            >
                              <h4 className="list-group-item-heading">
                                Our Gallery
                              </h4>
                            </Link>
                            <Link to="/" className="list-group-item active">
                              <h4 className="list-group-item-heading">
                                The Painters
                              </h4>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </SRLWrapper>
        </SimpleReactLightbox>
        <Newsletter />
      </Layout>
    </>
  )
}
export default AboutUs

export const query = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/pages/about-us.md/" }) {
      html
      frontmatter {
        title
        subTitle
        upperGalleryImages {
          topImage {
            topImageTitle
            topImageUrl {
              expandedImage: childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          leftImage {
            leftImageTitle
            leftImageUrl {
              expandedImage: childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          middleImage {
            middleImageTitle
            middleImageUrl {
              expandedImage: childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          rightImage {
            rightImageTitle
            rightImageUrl {
              expandedImage: childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    allMarkdownRemark(
      limit: 5
      sort: { fields: frontmatter___date, order: ASC }
    ) {
      nodes {
        frontmatter {
          title
          path
        }
      }
    }
  }
`
