import Article from './Article';
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
    return <Section backgroundColor="blue" title="Workshops" id="workshops">
        <Container content>
        {workshops?.map((workshop, index)=> {
            //console.log({workshop});
            const {title, eventType, description, dates, location, speakers} = workshop;
         
            const { 
                speakerCompany, 
                speakerCompanyUrl, 
                speakerImage, 
                speakerJob, 
                speakerName
            } = speakers[0];
               //const formattedDate = getFormattedDate(date);
               
               return <Article key={`workshop${index}`}>
                 <Row paddingTop="3">  
                    <Col xs="12" sm="12">
                        <Heading level="3" color="white">{title}</Heading>
                    </Col>
                </Row>
               <Row key={`workshop${index}`} borderBottom="1" flexDirection="row" paddingBottom="3">  
               
                <Col xs="12" sm="8" flexOrder="xs:2 sm:1" marginBottom="0">
                    <Row flexDirection="column" marginBottom="0">
                        <Col xs="12" sm="12" flexOrder="xs:2 sm:1" marginBottom="0">
                            <Row marginBottom="0">
               {dates.map((dateObj, index) => {
                const {dayDate, date} = dateObj;
                const formattedDate = getFormattedDate(dayDate);
                //console.log({formattedDate});
                const formattedTimeDuration = formatTimeDuration(date);
                   const formattedRoom = getFormattedLocation(location);
                   const {name, number, building} = formattedRoom;
                return <Col xs="12" sm="6" key={`workshop${index}`} marginBottom="0">
                    <Row marginBottom="1">
                    <Col xs="1" sm="1"><Paragraph color="orange">{index + 1}.</Paragraph></Col>
                    <Col xs="11" sm="11" marginBottom="0">
                        <Paragraph color="white" marginBottom="1">
                            <strong>{formattedDate}<br />
                        {date ? formattedTimeDuration : ''}</strong></Paragraph>
                        <Paragraph color="white" marginBottom="1" condensed caps>
                        {name ? name : ''}<br />
                        {number ? number : ''} {building ? building : ''}</Paragraph>
                    </Col>
                </Row></Col>
               })}
               </Row>
                </Col>
                <Col xs="12" sm="12" flexOrder="xs:1 sm:2">
                    <Paragraph color="white" marginBottom="2">{description}</Paragraph>
                </Col>     
                 </Row>  
                </Col>
                <Col xs="8" sm="4" marginBottom="2" flexOrder="xs:1 sm:2">
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
            </Article>
        })}
        </Container>
    </Section>
};
export default WorkshopSpotlight;