import React from 'react'
import { Link } from 'gatsby'
import { SideMenu, UpperGallery } from 'components'

const Header = ({
  title,
  subTitleText,
  intro,
  bodyTitles,
  upperGallery,
  showGallery,
  openGallery,
  sideLinks,
}) => {
  return (
    <div className="container" style={{ paddingTop: '40px' }}>
      <div className="row">
        <div className="col-sm-9">
          <section className="site-block top">
            <div className="site-title">
              <h1>
                <span className="page__title-ttd">{subTitleText}</span>
                <span className="page__title-e">{title}</span>
              </h1>
            </div>
            {/* Upper Gallery here */}
            <UpperGallery
              upperGallery={upperGallery}
              openGallery={openGallery}
              showGallery={showGallery}
            />
            <div className="site-bb">
              <ul>
                <li>
                  <Link to="/" style={{ color: '#737373' }}>
                    Home
                  </Link>
                </li>
                <li>{title}</li>
              </ul>
            </div>
            {/* Intro text here */}
            <div
              className="site-text"
              dangerouslySetInnerHTML={{ __html: intro }}
            />
          </section>
        </div>
        {/* SideMenu here */}
        <SideMenu bodyTitles={bodyTitles} sideLinks={sideLinks} title={title} />
      </div>
    </div>
  )
}

export default Header
