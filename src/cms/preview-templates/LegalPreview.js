import React from 'react'
import '../preview-styles/preview-styles.css'

const LegalPreview = ({ widgetFor }) => {
  return (
    <div className="site-content" style={{ padding: '2rem' }}>
      <main className="site-main">
        <div className="col-sm-12">{widgetFor('text')}</div>
      </main>
    </div>
  )
}

export default LegalPreview
