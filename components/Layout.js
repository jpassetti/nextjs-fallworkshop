import { Fragment } from 'react'
import Head from 'next/head'
import Container from './Container'
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import SEO from './SEO'

const Layout = ({children, inside = false}) => {
	return <Fragment>
		<SEO
			title="The Alexia Fall Workshop | Newhouse School at Syracuse University"
			siteName="The Alexia Fall Workshop | Newhouse School at Syracuse University"
			description="Founded by Visual Communications faculty in 1999, the workshop brings top professionals from around the world to join our professors as we push students to identify, observe and artfully communicate the core of who we are and the issues we face in everyday life."
			image={{
				src : 'images/the-alexia-fall-workshop-1200x630px.jpg',
				alt : 'The Alexia Fall Workshop and the Newhouse School at Syracuse University wordmarks.',
				width: 1200,
				height: 630
			}}
			url="https://fallworkshop.newhouse.syr.edu"
    />
		<Header inside={inside ? true : false} />
		<Main>
			{children}
		</Main>
		<Footer />
	</Fragment>
}
export default Layout
