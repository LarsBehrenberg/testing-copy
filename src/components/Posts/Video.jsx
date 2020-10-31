import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import YoutubeIcon from '../../../static/backgrounds/youtube.png'

const VideoContainer = styled.div`
  position: relative;
  padding-bottom: 56.23%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  background: #000;
  margin: 5px;

  & div {
    cursor: pointer;
    -webkit-transition: 0.6s all;
    -moz-transition: 0.6s all;
    transition: 0.6s all;
    display: block;
  }
  & div:hover .youtube-icon {
    -webkit-filter: brightness(100%);
  }
  & div img {
    width: 100%;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  & div .youtube-icon {
    width: 94px;
    height: 64px;
    position: absolute;
    background: url(${YoutubeIcon}) no-repeat;
    background-position: 50% 50%;
    background-size: 70%;
    left: 50%;
    top: 50%;
    margin-left: -47px;
    margin-top: -32px;
    -webkit-filter: brightness(75%);
    z-index: 2;
  }
  & div .background {
    width: 100%;
    height: 100%;
    position: absolute;
    background: #ffffff00;
    left: 0;
    top: 0;
  }
  & iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background: transparent;
  }
`

const Video = ({ videoId, title, subtitle }) => {
  const videoThumb = id =>
    `<img src="https://i.ytimg.com/vi/${id}/hqdefault.jpg" alt="Find out more information in our video on ${
      subtitle.toLowerCase().includes('biography') ? 'the ' : ''
    } ${subtitle} ${title}">` +
    '<span class="youtube-icon"></span>' +
    '<span class="background"></span>'

  function videoIframe() {
    var iframe = document.createElement('iframe')
    iframe.setAttribute(
      'src',
      'https://www.youtube.com/embed/' + this.dataset.id + '?autoplay=1'
    )
    iframe.setAttribute('allowfullscreen', '1')
    iframe.setAttribute('frameborder', '0')
    this.parentNode.replaceChild(iframe, this)
  }

  // Run after rendering page
  useEffect(() => {
    var a,
      n,
      v = document.getElementsByClassName('video')
    for (n = 0; n < v.length; n++) {
      a = document.createElement('div')
      a.setAttribute('data-id', v[n].dataset.id)
      a.innerHTML = videoThumb(v[n].dataset.id)
      a.onclick = videoIframe
      v[n].appendChild(a)
    }
  })

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9">
          <section className="site-block" style={{ paddingBottom: '35px' }}>
            <VideoContainer className="video" data-id={videoId} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Video
