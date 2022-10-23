import { Fragment } from 'react'

import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'

const Layout = ({children, inside}) => {
	return <Fragment>
		<Header inside />
		<Main>
			{children}
		</Main>
		<Footer />
	</Fragment>
}
export default Layout
