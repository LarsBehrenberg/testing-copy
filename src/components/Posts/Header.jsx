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
                <span className="page__title-ttd">{subTitleText} </span>
                <span className="page__title-e" itemProp="name">
                  {title}
                  <span />{' '}
                </span>
              </h1>
            </div>
            {/* Upper Gallery here */}
            <UpperGallery
              upperGallery={upperGallery}
              openGallery={openGallery}
              showGallery={showGallery}
            />
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
                  <Link itemProp="item" to="/">
                    <span itemProp="name" style={{ color: '#737373' }}>
                      Home
                    </span>
                  </Link>
                  <meta itemProp="position" content="1" />
                </li>
                <li
                  itemProp="itemListElement"
                  itemScope=""
                  itemType="http://schema.org/ListItem"
                >
                  <span itemProp="name">{title}</span>
                  <meta itemProp="position" content="3" />
                </li>
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
