import { Fragment } from 'react';
import Col from './Col';
import Container from './Container';
import Heading from './Heading';
import Image from 'next/image';
import ImageWrapper from './ImageWrapper';
import Paragraph from './Paragraph';
import Row from './Row';
import Section from './Section';

import styles from './workshopspotlight.module.scss';

import { formatTimeDuration, getFormattedLocation, getFormattedDate } from '../lib/utilities';

const WorkshopSpotlight = ({ workshops }) => {
    return <Section backgroundColor="blue" title="Workshops">
        <Container content>
        {workshops?.map((workshop, index)=> {
            const {workshop:workshopProp, dayDate} = workshop;
            const formattedDate = getFormattedDate(dayDate);
           	const {title, eventType, description, date, location, speakers} = workshopProp;
               const formattedRoom = getFormattedLocation(location);
               const {name, number, building} = formattedRoom;
               //console.log({date});
               const { 
                speakerCompany, 
                speakerCompanyUrl, 
                speakerImage, 
                speakerJob, 
                speakerName
            } = speakers[0];
               //const formattedDate = getFormattedDate(date);
               const formattedTimeDuration = formatTimeDuration(date);
               return <Fragment key={`workshop${index}`}>
               <Row marginBottom="3" key={`workshop${index}`} borderBottom="1">  
               
                <Col xs="12" sm="8">
                <Row>  
                <Col xs="12" sm="12">
                <Heading level="3" color="white">{title}</Heading>
                
                </Col>
               </Row>
               <Row marginBottom="0">
                            <Col xs="12" sm="6">
                                <Paragraph color="white" marginBottom="1">
                                    <strong>{formattedDate}<br />
                                {date ? formattedTimeDuration : ''}</strong></Paragraph>
                                </Col>
                                <Col xs="12" sm="6">
                                <Paragraph color="white" marginBottom="1">
                                {name ? name : ''}<br />
                                {number ? number : ''} {building ? building : ''}</Paragraph>
                                </Col>
                        </Row>
                    <Paragraph color="white" marginBottom="2">{description}</Paragraph>
                       
                   
                    </Col>
                    <Col xs="8" sm="4" marginBottom="2">
                        {speakerImage && 
                                <Image 
                                    src={speakerImage.sourceUrl}
                                    alt={speakerImage.altText}
                                    width={speakerImage.mediaDetails.width}
                                    height={speakerImage.mediaDetails.height}
                                    className={styles.speakerImage}
                                />

                        }
                        {speakerName &&
                            <Paragraph color="white" marginTop="1">
                                <strong>{speakerName}</strong><br />
                            {speakerJob}<br />
                            {speakerCompany}</Paragraph>
                        }
                        {/*
                         {speakerName &&
                            <Paragraph color="white" marginTop="1"><strong>{speakerName}</strong></Paragraph>
                        }
                        {speakerJob &&
                            <Paragraph color="white">
                                {speakerJob}
                            </Paragraph> 
                        }
                        {speakerCompany &&
                            <Paragraph color="white" marginBottom="0">
                                {speakerCompany}
                            </Paragraph> 
                        }*/}
                        
                        </Col>
            </Row>
            </Fragment>
        })}
        </Container>
    </Section>
};
export default WorkshopSpotlight;