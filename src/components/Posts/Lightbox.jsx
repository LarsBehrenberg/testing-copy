import React from 'react'
import styled from '@emotion/styled'
import Img from 'gatsby-image'

const Lightbox = ({ upperGalleryImages, textSections, closeModal }) => {
  const fillModals = arr => {
    return arr !== null
      ? arr.map((modalImage, index) => (
          <div
            className="mySlides"
            key={modalImage.imageUrl.expandedImage.fluid.src}
          >
            {returnModalImage(
              modalImage.imageUrl.expandedImage.fluid,
              modalImage.imageTitle
            )}
          </div>
        ))
      : null
  }

  const returnModalImage = (image, alt) => (
    <div className="gallery-image-container">
      <Img
        fluid={image}
        className="gallery-image"
        alt={alt === null ? 'An image title is missing' : alt}
        style={{
          width: '100%',
          height: '100%',
        }}
        imgStyle={{
          objectFit: 'contain',
        }}
        fadeIn={false}
        loading="eager"
      />
    </div>
  )
  const { topImage, leftImage, middleImage, rightImage } = upperGalleryImages

  return (
    <div id="myModal" className="modal">
      <div className="numbertext" id="numbertext">
        1 / x
      </div>
      <button className="close cursor" onClick={closeModal} type="button">
        &times;
      </button>
      <div className="modal-content">
        <div className="mySlides" key="slide-1">
          {returnModalImage(
            topImage.topImageUrl.expandedImage.fluid,
            topImage.topImageTitle
          )}
        </div>
        <div className="mySlides" key="slide-2">
          {returnModalImage(
            leftImage.leftImageUrl.expandedImage.fluid,
            leftImage.leftImageTitle
          )}
        </div>
        <div className="mySlides" key="slide-3">
          {returnModalImage(
            middleImage.middleImageUrl.expandedImage.fluid,
            middleImage.middleImageTitle
          )}
        </div>
        <div className="mySlides" key="slide-4">
          {returnModalImage(
            rightImage.rightImageUrl.expandedImage.fluid,
            rightImage.rightImageTitle
          )}
        </div>

        {textSections.map(section => {
          const { sideGalleryImages } = section
          return fillModals(sideGalleryImages)
        })}

        <div className="caption-container">
          <p id="caption" />
        </div>
        <button className="prev" onClick={() => plusSlides(-1)} type="button">
          &#10094;
        </button>
        <button className="next" onClick={() => plusSlides(1)} type="button">
          &#10095;
        </button>
      </div>
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          opacity: '0',
          top: '0',
          left: '0',
          zIndex: '-1',
        }}
        onClick={closeModal}
      />
    </div>
  )
}

export default Lightbox
