/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { SEO, TextSection, Header, Suggestion, Video, Lightbox } from 'components'
import { Newsletter, Layout } from 'layouts'
import { Helmet } from 'react-helmet'
import Img from 'gatsby-image'

let slideIndex = 1

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
  const { topImage, leftImage, middleImage, rightImage } = upperGalleryImages
  let touchListen = false

  let touchstartX = 0
  let touchendX = 0

  let altTitles = []
  altTitles.push(
    topImage.topImageTitle,
    leftImage.leftImageTitle,
    middleImage.middleImageTitle,
    rightImage.rightImageTitle,
    textSections
      .filter(section => section.sideGalleryImages !== null)
      .map(section => section.sideGalleryImages.map(image => image.imageTitle))
  )

  function keyListener(event) {
    if (event.keyCode === 39) {
      // eslint-disable-next-line no-use-before-define
      plusSlides(1)
    }
    if (event.keyCode === 37) {
      // eslint-disable-next-line no-use-before-define
      plusSlides(-1)
    }
    if (event.keyCode === 27) {
      // eslint-disable-next-line no-use-before-define
      closeModal()
    }
  }

  // React Hook to initiate and clean up eventlisteners after mounting
  useEffect(() => {
    window.addEventListener('keydown', keyListener)

    let insertAfter = (referenceNode, newNode) => {
      referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }

    const imageCaptions = []

    const inlineImage = document
      .querySelectorAll('.site-text p img')
      .forEach(node => {
        let el = document.createElement('span')
        el.classList.add('inline-image-caption')
        el.innerHTML = node.title
        node.parentElement.classList.add('inline-image-container')
        insertAfter(node, el)
      })

    // console.log(document.querySelector('.site-text p img').parentNode)
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener('keydown', keyListener)
    }
  })

  function openModal() {
    document.getElementById('myModal').style.display = 'block'
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  }

  function closeModal() {
    if (document.getElementById('myModal')) {
      document.getElementById('myModal').style.display = 'none'
    }
    document.getElementsByTagName('body')[0].style.overflow = 'auto'
  }

  function showSlides(n) {
    let i
    slideIndex = n
    const slides = document.getElementsByClassName('mySlides')
    const captionText = document.getElementById('caption')
    const numberText = document.getElementById('numbertext')

    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
      slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i += 1) {
      slides[i].style.display = 'none'
    }
    slides[slideIndex - 1].style.display = 'block'

    captionText.innerHTML = altTitles.flat(2)[slideIndex - 1]
      ? altTitles.flat(2)[slideIndex - 1]
      : 'An image description is missing'

    numberText.innerHTML = `${slideIndex} / ${altTitles.flat(2).length}`

    if (touchListen === false) {
      Array.from(slides).forEach(slide => {
        slide.addEventListener(
          'touchstart',
          event => {
            touchstartX = event.changedTouches[0].screenX
          },
          false
        )

        slide.addEventListener(
          'touchend',
          event => {
            touchendX = event.changedTouches[0].screenX
            // eslint-disable-next-line no-use-before-define
            handleGesture()
          },
          false
        )
      })
      touchListen = true
    }
  }

  function plusSlides(n) {
    if (document.getElementById('myModal')) {
      slideIndex += n
      showSlides(slideIndex)
    }
  }

  function handleGesture() {
    if (touchendX <= touchstartX) {
      plusSlides(1)
    }

    if (touchendX >= touchstartX) {
      plusSlides(-1)
    }
  }

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
        <Header
          title={title}
          subTitleText={subTitle}
          intro={html}
          bodyTitles={fields.bodyTitle}
          images={upperGalleryImages}
          showGallery={showSlides}
          openGallery={openModal}
          sideLinks={data.allMarkdownRemark.nodes}
        />
        <div className="site-content">
          <main className="site-main">
            {/* These are the TextSections */}
            {videoId !== null && videoId !== '' ? (
              <Video videoId={videoId} />
            ) : null}
            {fields.bodyTitle.map((value, index) => {
              return (
                <TextSection
                  key={`section-${index}`}
                  showGallery={showSlides}
                  openGallery={openModal}
                  index={index}
                  title={textSections[index].textTitle}
                  text={fields.bodyText[index]}
                  textSectionImageArray={textSections[index].sideGalleryImages}
                  buttonToggle={textSections[index].buttonToggle}
                />
              )
            })}
            <Suggestion
              links={data.allMarkdownRemark.nodes}
              contextPages={pageContext}
            />
          </main>
        </div>
        <Newsletter />
      </Layout>
      {/* Lightbox showing when opening images */}
      <Lightbox closeModal={closeModal}  upperGalleryImages={upperGalleryImages} textSections={textSections}  />
    </>
  )
}

export default Post

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
              thumbImage: childImageSharp {
                fixed(width: 400) {
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
              thumbImage: childImageSharp {
                fixed(width: 400) {
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
              thumbImage: childImageSharp {
                fixed(width: 400) {
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
              thumbImage: childImageSharp {
                fixed(width: 200) {
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
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
