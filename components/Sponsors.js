import Col from './Col'
import Container from './Container'
import Image from 'next/image'
import Row from './Row'
import Section from './Section'
import Sponsor from './Sponsor'

import styles from './sponsor.module.scss'

const Sponsors = ({sponsors}) => {

	return <Section id="sponsors" title="Sponsors" backgroundColor="orange_10">
		<Container size="sm">
			{/* NIKON 458.6 400 */ }
			<Row justifyContent="center">
				<Col xs="10" sm="8" md="5">
					<div className={styles.sponsor}>
					<a href="https://www.nikonusa.com/" target="_blank">
						<Image
								src="/sponsors/nikonusa-logo-color.svg"
								alt="Nikon USA logo"
								width={458.6}
								height={400}
								layout="responsive"
						/>
						</a>
					</div>
				</Col>
			</Row>
		<Row justifyContent="center">
			{sponsors.map((sponsor, index) => {
				return <Col key={index} xs="6" sm="6" md="4"><Sponsor sponsor={sponsor.node} size="sm" /></Col>
			})}
		</Row>
	</Container></Section>
}
export default Sponsors;
