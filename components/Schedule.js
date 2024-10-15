import * as moment from "moment";
import { useState, useEffect } from "react";

import Button from "./Button";
import Col from "./Col";
import Container from "./Container";
import Heading from "./Heading";
import Image from "next/image";
import ImageWrapper from "./ImageWrapper";
import Paragraph from "./Paragraph";
import Row from "./Row";
import Section from "./Section";
import Tab from "./Tab";
import Tabs from "./Tabs";

import styles from "./schedule.module.scss";

import { formatTimeDuration, getFormattedLocation } from "../lib/utilities";

const Schedule = ({ schedule }) => {
 //console.log({schedule});
 const [activeTab, setActiveTab] = useState(0);
 const { title, scheduleInformation } = schedule;
 const { days } = scheduleInformation;

 const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
 };

 useEffect(() => {
  const currentDate = getCurrentDate();
  const firstDate = days[0].dayDate;
  const lastDate = days[days.length - 1].dayDate;

  if (currentDate <= firstDate) {
   setActiveTab(0);
  } else if (currentDate >= lastDate) {
   setActiveTab(days.length - 1);
  } else {
   const index = days.findIndex((day) => day.dayDate === currentDate);
   if (index !== -1) {
    setActiveTab(index);
   }
  }
 }, []);

 return (
  <Section id="schedule" title="Schedule" backgroundColor="orange_10">
   <Container>
    <Tabs>
     {days.map((day, index) => {
      const { dayDate } = day;
      const theDay = moment(dayDate).format("ddd");
      const theMonth = moment(dayDate).format("MMM");
      const theDayNum = moment(dayDate).format("DD");
      return (
       <Tab
        key={index}
        activeTab={index === activeTab ? true : false}
        clickHandler={() => {
         setActiveTab(index);
        }}
       >
        {theDay}
        <br />
        {theMonth}
        <br />
        {theDayNum}
       </Tab>
      );
     })}
    </Tabs>
    <Row th>
     <Col textAlign="center" xs="4" sm="4" th>
      Time
     </Col>
     <Col textAlign="center" xs="4" sm="4" th>
      Title
     </Col>
     <Col textAlign="center" xs="4" sm="4" th>
      Location
     </Col>
    </Row>
    {days[activeTab].events ? (
     days[activeTab].events.map((event, index) => {
      return <Schedule.Item key={index} event={event} />;
     })
    ) : (
     <Row>
      <Col paddingTop="2" textAlign="center" xs="12" sm="12" td>
       No events scheduled yet.
      </Col>
     </Row>
    )}
   </Container>
  </Section>
 );
};
export default Schedule;

const Item = ({ event }) => {
 const { title, eventType, description, date, location, speakers } = event;
 const formattedRoom = getFormattedLocation(location);
 const { name, number, building } = formattedRoom;
 const formattedTimeDuration = formatTimeDuration(date);
 return (
  <Row tr alignItems="flex-start">
   <Col
    textAlign="center"
    xs="12"
    sm="4"
    td
    flexOrder="xs:2 sm:1"
    paddingTop="2"
   >
    {formattedTimeDuration}
   </Col>
   <Col
    textAlign="center"
    xs="12"
    sm="4"
    td
    flexOrder="xs:1 sm:2"
    paddingTop="2"
   >
    {eventType !== "none" ? (
     <Heading
      level="4"
      textAlign="center"
      marginBottom="2"
      textTransform="uppercase"
      color="orange"
     >
      {eventType}
     </Heading>
    ) : (
     ""
    )}
    {title && (
     <Heading level="3" textAlign="center" marginBottom="1">
      {title}
     </Heading>
    )}
    {description && <span dangerouslySetInnerHTML={{ __html: description }} />}
    {speakers &&
     speakers.map((speaker, index) => {
      const {
       speakerCompany,
       speakerCompanyUrl,
       speakerImage,
       speakerJob,
       speakerName,
      } = speaker;
      return (
       <div className={styles.speaker_group} key={index}>
        {speakerImage && (
         <ImageWrapper size="thumbnail">
          <Image
           src={speakerImage.sourceUrl}
           alt={speakerImage.altText}
           width={speakerImage.mediaDetails.width}
           height={speakerImage.mediaDetails.height}
          />
         </ImageWrapper>
        )}
        {speakerName && (
         <Heading level="3" textAlign="center" marginBottom="1" color="blue">
          {speakerName}
         </Heading>
        )}
        {speakerJob && <Paragraph>{speakerJob}</Paragraph>}
        {speakerCompany && <Paragraph>{speakerCompany}</Paragraph>}
       </div>
      );
     })}
   </Col>
   <Col
    textAlign="center"
    xs="12"
    sm="4"
    td
    flexOrder="xs:3 sm:3"
    paddingTop="2"
   >
    <Paragraph condensed caps>
     {name && (
      <>
       {name}
       <br />
      </>
     )}
     {number && number} {building && building}
    </Paragraph>
   </Col>
  </Row>
 );
};
Schedule.Item = Item;
