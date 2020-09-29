import React from 'react'
import { Link } from 'gatsby'

const SideMenu = ({ sideLinks, bodyTitles, title }) => (
  <div className="col-sm-3">
    <section className="site-sidebar" id="sidebar-container">
      <div className="container">
        <div className="row">
          <div className="col-sm-push-9 col-sm-3" id="sidebar">
            <div className="list-group">
              {' '}
              <Link to="#" className="list-group-item active">
                <h4 className="list-group-item-heading">{title}</h4>
              </Link>
              {bodyTitles.length === 0 ? (
                <>
                  <Link
                    to="/paul-cezanne-biography"
                    className="list-group-item"
                  >
                    <h5 className="list-group-item-heading">Paul Cezanne</h5>
                  </Link>
                  <Link
                    to="/edouard-manet-biography"
                    className="list-group-item"
                  >
                    <h5 className="list-group-item-heading"> Edouard Manet</h5>
                  </Link>
                  <Link
                    to="/claude-monet-biography"
                    className="list-group-item"
                  >
                    <h5 className="list-group-item-heading"> Claude Monet</h5>
                  </Link>
                  <Link
                    to="/pierre-auguste-renoir-biography"
                    className="list-group-item"
                  >
                    <h5 className="list-group-item-heading">
                      {' '}
                      Pierre-Auguste Renoir
                    </h5>
                  </Link>
                  <Link to="/edgar-degas-biography" className="list-group-item">
                    <h5 className="list-group-item-heading"> Edgar Degas</h5>
                  </Link>
                </>
              ) : bodyTitles.length > 7 ? (
                <>
                  {bodyTitles.slice(0, 7).map((value, index) => {
                    return (
                      <Link
                        to={`#${index + 1}`}
                        className="list-group-item"
                        key={`#${index + 1}`}
                      >
                        <h5
                          className="list-group-item-heading"
                          dangerouslySetInnerHTML={{
                            __html: bodyTitles[index],
                          }}
                        />
                      </Link>
                    )
                  })}
                  <Link to="#8" className="list-group-item">
                    <h5 className="list-group-item-heading">
                      <svg
                        id="i-arrow-right"
                        viewBox="0 0 113.4 85"
                        fill="#dd3030"
                        style={{
                          display: 'inline',
                          width: '16px',
                          height: '11px',
                          marginRight: '5px',
                        }}
                      >
                        <path d="M109,35.4L70.9,3.8C68.7,2,67,0,63.8,0c-4.4,0-7.1,3.7-7.1,7.1v21.3H7.1c-3.9,0-7.1,3.2-7.1,7.1v14.2c0,3.9,3.2,7.1,7.1,7.1 h49.6V78c0,3.4,2.7,7.1,7.1,7.1c3.3,0,4.9-2,7.1-3.8L109,49.6c2.7-2.2,4.4-3.9,4.4-7.1S111.7,37.7,109,35.4z"></path>
                      </svg>
                      {bodyTitles.length - 7} more
                    </h5>
                  </Link>
                </>
              ) : (
                bodyTitles.map((value, index) => {
                  return (
                    <Link
                      to={`#${index + 1}`}
                      className="list-group-item"
                      key={`#${index + 1}`}
                    >
                      <h5
                        className="list-group-item-heading"
                        dangerouslySetInnerHTML={{
                          __html: bodyTitles[index],
                        }}
                      />
                    </Link>
                  )
                })
              )}
              {sideLinks.map(link => (
                <Link
                  to={`/${link.frontmatter.path}`}
                  className="list-group-item active"
                  key={link.frontmatter.path}
                >
                  <h4 className="list-group-item-heading">
                    {link.frontmatter.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
)

export default SideMenu
