import React from 'react'
import { Footer, Navbar } from 'layouts'
import SEO from '../components/SEO'

import styled from '@emotion/styled'
import '../styles/styles.css'

const ChildWrapper = styled.div`
  padding-top: 2rem;
`

const Layout = ({ children }) => (
  <>
    <SEO />
    <Navbar />
    <ChildWrapper id="childWrapper">{children}</ChildWrapper>
    <Footer />

    {/* <script
      async
      src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
    ></script> */}
  </>
)

export default Layout
