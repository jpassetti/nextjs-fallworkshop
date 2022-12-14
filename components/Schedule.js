import * as moment from 'moment'
import { useState } from 'react'

import Button from './Button'
import Col from './Col'
import Container from './Container'
import Heading from './Heading'
import Image from 'next/image'
import ImageWrapper from './ImageWrapper'
import Paragraph from './Paragraph'
import Row from './Row'
import Section from './Section'
import Tab from './Tab'
import Tabs from './Tabs'

import styles from './schedule.module.scss'

import { getFormattedLocation } from '../lib/api'

const formatTimeDuration = (date) => {
	const { startTime, endTime } = date;
	const startTimeSplit = startTime.split(" ");
	const startHour = startTimeSplit[0].split(":")[0];
	const startMinutes = startTimeSplit[0].split(":")[1];
	const startAMPM = startTimeSplit[1];
	const startFormatted = startMinutes !== "00" ? `${startHour}:${startMinutes}` : `${startHour}`;

	const endTimeSplit = endTime ? endTime.split(" ") : null;
	const endHour = endTime ? endTimeSplit[0].split(":")[0] : null;
	const endMinutes = endTime ? endTimeSplit[0].split(":")[1] : null;
	const endAMPM = endTime ? endTimeSplit[1] : null;
	const endFormatted = endTime && endMinutes !== "00" ? `${endHour}:${endMinutes}` : endHour ? `${endHour}` : null;


	let formattedDuration;
	if(endTime) {
		// yes endTime
		if (startAMPM === "am" & endAMPM === "am") {
			formattedDuration = `${startFormatted}-${endFormatted} a.m.`;
		} else if (startAMPM === "pm" & endAMPM === "pm") {
			formattedDuration = `${startFormatted}-${endFormatted} p.m.`;
		} else {
			formattedDuration = `${startFormatted} a.m.-${endFormatted} p.m.`;
		}
	} else {
		// no endTime
		if (startAMPM === "am") {
			formattedDuration = `${startFormatted} a.m.`;
		} else {
			formattedDuration = `${startFormatted} p.m.`;
		}
	}

	return formattedDuration;
}

const Schedule = ({schedule}) => {
	const [activeTab, setActiveTab] = useState(3);
	const {title, scheduleInformation} = schedule;
	const {days} = scheduleInformation;
	return <Section id="schedule" title="Schedule" backgroundColor="orange_10">
			<Container>
				<Tabs>
				{days.map((day,index) => {
					const {dayDate} = day;
					const theDay = moment(dayDate).format('ddd');
					const theMonth = moment(dayDate).format('MMM');
					const theDayNum = moment(dayDate).format('DD');
					return <Tab 
						key={index}
						activeTab={index === activeTab ? true : false} 
						clickHandler={()=> {
							setActiveTab(index)
						}}
						>{theDay}<br />
						{theMonth}<br />
						{theDayNum}</Tab>
				})}
				</Tabs>
				<Row th>
					<Col textAlign="center" xs="4" sm="4" th>Time</Col>
					<Col textAlign="center" xs="4" sm="4" th>Title</Col>
					<Col textAlign="center" xs="4" sm="4" th>Location</Col>
				</Row>
				{days[activeTab].events ? days[activeTab].events.map((event, index) => {
					return <Schedule.Item key={index} event={event} />
				})
			: <Row><Col paddingTop="2" textAlign="center" xs="12" sm="12" td>No events scheduled yet.</Col></Row>}
		
			</Container>
			</Section>
}
export default Schedule;

const Item = ({event}) => {
	const {title, eventType, description, date, location, speakers} = event;
	const formattedRoom = getFormattedLocation(location);
	const {name, number, building} = formattedRoom;
	const formattedTimeDuration = formatTimeDuration(date);
	return <Row tr alignItems="center">
		<Col textAlign="center" xs="12" sm="4" td flexOrder="xs:2 sm:1">{formattedTimeDuration}</Col>
		<Col textAlign="center" xs="12" sm="4" td flexOrder="xs:1 sm:2" paddingTop="2">
			{eventType !== "none" ? 
				<Heading level="4" textAlign="center" marginBottom="2" textTransform="uppercase" color="orange">{eventType}</Heading> 
			: ''}
			{title && <Heading level="3" textAlign="center" marginBottom="1">{title}</Heading>}
			<span dangerouslySetInnerHTML={{__html: description}} />
			{speakers && speakers.map((speaker, index) => {
				const {speakerCompany, speakerCompanyUrl, speakerImage, speakerJob, speakerName} = speaker;
				return <div className={styles.speaker_group} key={index}>
					{speakerImage && 
						<ImageWrapper size="thumbnail">
							<Image 
								src={speakerImage.sourceUrl}
								alt={speakerImage.altText}
								width={speakerImage.mediaDetails.width}
								height={speakerImage.mediaDetails.height}
							/>
						</ImageWrapper>
					}
					{speakerName &&
						<Heading level="3" textAlign="center" marginBottom="1" color="blue">{speakerName}</Heading>
					}
					{speakerJob &&
						<Paragraph>
							{speakerJob}
						</Paragraph> 
					}
					{speakerCompany &&
						<Paragraph>
							{speakerCompany}
						</Paragraph> 
					}
				</div>
			})}
			</Col>
		<Col textAlign="center" xs="12" sm="4" td flexOrder="xs:3 sm:3">{name ? name : ''}<br />
		{number ? number : ''} {building ? building : ''}</Col>
	</Row>
		
}
Schedule.Item = Item;
