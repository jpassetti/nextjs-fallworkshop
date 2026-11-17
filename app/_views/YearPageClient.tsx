"use client";

import Layout from "@/components/layout/Layout";
import About from "@/components/sections/About";
import Credits from "@/components/sections/Credits";
import HomeHeroShowcase from "@/components/sections/HomeHeroShowcase";
import Stories from "@/components/stories/Stories";
import PeopleByRole from "@/components/people/PeopleByRole";
import Person from "@/components/people/Person";
import Sponsors from "@/components/sections/Sponsors";
import Schedule from "@/components/sections/Schedule";
import Section from "@/components/primitives/Section";
import Container from "@/components/primitives/Container";
import Col from "@/components/primitives/Col";
import Paragraph from "@/components/primitives/Paragraph";
import Row from "@/components/primitives/Row";
import Reveal from "@/components/primitives/Reveal";
import type { YearPageViewProps, NavItem } from "@/app/_views/types";

type ScheduleData = {
  scheduleInformation?: {
    days?: unknown[];
  };
};

const YearPageClient = ({
  activeYear,
  people,
  sponsors,
  stories,
  schedule,
  navItems,
  yearContent,
}: YearPageViewProps) => {
  const hasNav = (id: string) => navItems.some((n: NavItem) => n.id === id);
  const storyList = Array.isArray(stories) ? stories : [];
  const peopleList = Array.isArray(people) ? people : [];
  const sponsorList = Array.isArray(sponsors) ? sponsors : [];
  const digitalTeamNames = new Set(["caleigh roy", "brigh maczka"]);
  const isDigitalTeamPerson = (person: any) => {
    const firstName = person?.node?.personInformation?.firstName?.trim().toLowerCase() || "";
    const lastName = person?.node?.personInformation?.lastName?.trim().toLowerCase() || "";
    return digitalTeamNames.has(`${firstName} ${lastName}`);
  };
  const digitalTeamOrder = ["caleigh roy", "brigh maczka"];
  const digitalTeamPeople = activeYear === "2026"
    ? [...peopleList]
        .filter(isDigitalTeamPerson)
        .sort((a: any, b: any) => {
          const aName = `${a?.node?.personInformation?.firstName?.trim().toLowerCase() || ""} ${a?.node?.personInformation?.lastName?.trim().toLowerCase() || ""}`;
          const bName = `${b?.node?.personInformation?.firstName?.trim().toLowerCase() || ""} ${b?.node?.personInformation?.lastName?.trim().toLowerCase() || ""}`;
          return digitalTeamOrder.indexOf(aName) - digitalTeamOrder.indexOf(bName);
        })
    : [];
  const facultyPeople = activeYear === "2026"
    ? peopleList.filter((person) => !isDigitalTeamPerson(person))
    : peopleList;
  const scheduleData = schedule as ScheduleData | null | undefined;
  const hasScheduleDays = Boolean(scheduleData?.scheduleInformation?.days?.length);
  const comingSoonLead = "coming soon";

  return (
    <Layout
      home
      year={activeYear}
      navItems={navItems}
      workshopDates={yearContent.workshopDates}
    >
      {storyList.length > 0 && (
        <HomeHeroShowcase
          activeYear={activeYear}
          workshopDates={yearContent.workshopDates}
          stories={storyList as Array<Record<string, unknown>>}
        />
      )}
      {hasNav("about") && (
        <About
          videoUrl={yearContent.aboutVideoUrl}
          contentHtml={yearContent.aboutContentHtml}
        />
      )}
      {hasNav("schedule") &&
        (hasScheduleDays ? (
          <Schedule schedule={scheduleData} />
        ) : (
          <Section id="schedule" title="Schedule" backgroundColor="orange_10">
            <Container>
              <Paragraph textAlign="center">
                The {activeYear} workshop schedule is {comingSoonLead}. Please check back soon.
              </Paragraph>
            </Container>
          </Section>
        ))}
      {hasNav("stories") && (
        <Stories
          stories={storyList}
          activeYear={activeYear}
          emptyMessage={`The ${activeYear} stories are ${comingSoonLead}.`}
        />
      )}
      {hasNav("coaches") && (
        <PeopleByRole
          role="coach"
          plural="Coaches"
          people={peopleList}
          activeYear={activeYear}
          emptyMessage={`The ${activeYear} coaches are ${comingSoonLead}.`}
        />
      )}
      {hasNav("faculty") && (
        <PeopleByRole
          role="staff"
          plural="Faculty/Staff"
          people={facultyPeople}
          activeYear={activeYear}
          emptyMessage={`The ${activeYear} faculty/staff are ${comingSoonLead}.`}
        />
      )}
      {activeYear === "2026" && hasNav("digital-team") && digitalTeamPeople.length > 0 && (
        <Section id="digital-team" title="Digital Team" backgroundColor="orange_10">
          <Container>
            <Row justifyContent="center">
              {digitalTeamPeople.map((person: any, index: number) => (
                <Col xs="6" sm="6" md="4" lg="3" key={person?.node?.id || index}>
                  <Reveal delay={(index % 4) * 0.1}>
                    <Person role="staff" person={person.node} activeYear={activeYear} />
                  </Reveal>
                </Col>
              ))}
            </Row>
          </Container>
        </Section>
      )}
      {activeYear === "2025" && <Credits />}
      {hasNav("sponsors") &&
        (sponsorList.length > 0 ? (
          <Sponsors sponsors={sponsorList} activeYear={activeYear} />
        ) : (
          <Section
            id="sponsors"
            title={`${activeYear} Sponsors`}
            backgroundColor="orange_10"
          >
            <Container>
              <Paragraph textAlign="center">
                Sponsor announcements for {activeYear} are {comingSoonLead}.
              </Paragraph>
            </Container>
          </Section>
        ))}
      
    </Layout>
  );
};

export default YearPageClient;
