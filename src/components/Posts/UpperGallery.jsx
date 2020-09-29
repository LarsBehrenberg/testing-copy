import React from 'react'
import Img from 'gatsby-image'

const UpperGallery = ({
  upperGallery: { topImage, leftImage, middleImage, rightImage },
  showGallery,
  openGallery,
}) => (
  <div className="site-gallery">
    <div className="ttde-gallery">
      <div className="ttde-gallery-inner">
        <div className="ttde-gallery-top ttdegalleryitem" data-pswp-uid="1">
          <figure
            className="ttde-gallery-top-inner"
            onClick={() => {
              openGallery()
              showGallery(1)
            }}
          >
            <span className="ttde-gallery-url" data-index="0">
              <Img
                fluid={topImage.topImageUrl.expandedImage.fluid}
                alt={topImage.topImageTitle}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </span>
          </figure>
        </div>
        <div className="ttde-gallery-bottom">
          <div
            className="ttde-gallery-col ttde-gallery-col-1 ttdegalleryitem"
            data-pswp-uid="1"
          >
            <figure
              className="ttde-gallery-col-inner"
              onClick={() => {
                openGallery()
                showGallery(2)
              }}
            >
              <span className="ttde-gallery-url" data-index="1">
                <Img
                  fixed={leftImage.leftImageUrl.thumbImage.fixed}
                  alt={leftImage.leftImageTitle}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </span>
            </figure>
          </div>
          <div
            className="ttde-gallery-col ttde-gallery-col-2 ttdegalleryitem"
            data-pswp-uid="1"
          >
            <figure
              className="ttde-gallery-col-inner"
              onClick={() => {
                openGallery()
                showGallery(3)
              }}
            >
              <span className="ttde-gallery-url" data-index="2">
                <Img
                  fixed={middleImage.middleImageUrl.thumbImage.fixed}
                  alt={middleImage.middleImageTitle}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </span>
            </figure>
          </div>
          <div
            className="ttde-gallery-col ttde-gallery-col-3 ttdegalleryitem ttde-gallery-open"
            data-pswp-uid="1"
          >
            <figure
              className="ttde-gallery-col-inner"
              onClick={() => {
                openGallery()
                showGallery(4)
              }}
            >
              <span className="ttde-gallery-url" data-index="3">
                <span className="ttde-gallery-open-btn">
                  <span>More images 20+</span>
                </span>
                <Img
                  fixed={rightImage.rightImageUrl.thumbImage.fixed}
                  alt={rightImage.rightImageTitle}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </span>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default UpperGallery
