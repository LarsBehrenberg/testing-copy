/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react'
import { Layout, Newsletter } from 'layouts'
import { SEO, InstagramGallery } from 'components'
import { SEOTitles } from '../../config/contants'

const Gallery = () => {
  // This can be retrieved with a GET https://www.instagram.com/web/search/topsearch/?context=blended&query=INSTAGRAM_USERNAME
  const INSTAGRAM_ID = '34201768271'
  const THUMBNAIL_WIDTH = 640
  const PHOTO_COUNT = 30

  return (
    <Layout>
      <SEO
        title={SEOTitles.gallery.title}
        description={SEOTitles.gallery.description}
      />

      <InstagramGallery
        userId={INSTAGRAM_ID}
        thumbnailWidth={THUMBNAIL_WIDTH}
        photoCount={PHOTO_COUNT}
      />
      <Newsletter />
    </Layout>
  )
}

export default Gallery
