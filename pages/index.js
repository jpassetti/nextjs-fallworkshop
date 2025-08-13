// components
import Button from "../components/Button";
import Col from '../components/Col';
import Container from "../components/Container";
import Heading from "../components/Heading";
import Layout from "../components/Layout";
import Paragraph from "../components/Paragraph";
import Row from "../components/Row";
import Section from "../components/Section";
import Vimeo from "../components/Vimeo";

// data
import WORKSHOP_DATES from "../lib/workshopDates";

const Home = () => {
    return (
        <Layout>
            <Container content>
                <Heading level={2} textAlign="center" marginBottom={2} marginTop={6}>About The Alexia Fall Workshop</Heading>

                <Paragraph marginBottom={2}>The Fall Workshop was founded in 1999 by the faculty of the Visual Communications department of the <a href="https://newhouse.syracuse.edu" target="_blank">S.I. Newhouse School of Public Communications</a> at <a href="https://www.syracuse.edu" target="_blank">Syracuse University</a>. In 2023, the name was changed to The Alexia Fall Workshop to more closely connect the workshop to <a href="https://newhouse.syracuse.edu/centers/the-alexia/" target="_blank">The Alexia</a>, a granting organization at Newhouse that supports professional and student visual storytellers worldwide who produce projects that inform, foster cultural understanding and inspire meaningful change.</Paragraph>

                <Paragraph marginBottom={2}>The workshop takes place over four days each fall and brings top visual professionals from around the world to join Newhouse professors as they push students to identify, observe and artfully communicate the core of who we are. Students use photography, video, audio and words to hone their craft of exceptional storytelling while engaging in the community and the world around them. The workshop has existed in various iterations, from holding the entire event on-site at a nearby community, to holding it completely on campus, to, more recently, employing a hybrid approach.</Paragraph>

                <Paragraph marginBottom={2}>The program kicks off on a Thursday evening as coaches and their student teams get to know one another. All day Friday, students work on their projects in the community, and Saturday is a production day with an early evening presentation by a professional visual storyteller courtesy of the workshop’s sponsor, <a href="https://www.nikonusa.com" target="_blank">Nikon</a>.The event wraps on Sunday with a public viewing and awards.</Paragraph>

                <Paragraph marginBottom={6}>The Alexia and now The Alexia Fall Workshop are named in memory of photojournalism student Alexia Tsairis, one of 35 Syracuse University students who died in the 1988 terrorist bombing of Pan Am Flight 103 over Lockerbie, Scotland, while on their way home from a semester abroad.</Paragraph>

            </Container>
            <Container content>

            </Container>
            <Section backgroundColor="orange_10">
                <Container content>
                    <Heading level={2} textAlign="center" marginBottom={2}>Previous Alexia Fall Workshops</Heading>
                    <Paragraph marginBottom={4} textAlign="center">
                        Discover the history of The Alexia Fall Workshop. Browse student work, meet coaches and faculty, and explore each year’s unique stories and achievements.
                    </Paragraph>
                    <Heading level={3} textAlign="center" marginBottom={2}>2024 Workshop: Baldwinsville, NY</Heading>
                    <Vimeo src="https://vimeo.com/1028882555" />
                    <Paragraph marginBottom={4}>
                        Watch the video above to go behind the scenes at the 2024 Alexia Fall Workshop in Baldwinsville, NY. This documentary captures the spirit of Baldwinsville, highlighting its people, places, and stories through the creative lenses of our student storytellers and coaches.
                    </Paragraph>
                    <Heading level={3} textAlign="center" marginBottom={2}>Select a Year to Explore</Heading>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                            {WORKSHOP_DATES.filter(({ year }) => year !== "2025").map(({ year, dates }) => (
                            <li key={year} style={{ marginBottom: "2rem" }}>
                                <Row alignItems="center" justifyContent="space-between" borderPosition="top" borderColor="blue" borderSize={1} paddingTop={2}>
                                    <Col xs={12} sm={8}>
                                        <Heading level={4} marginBottom={1}>{`Alexia Fall Workshop ${year}`}</Heading>
                                        <Paragraph marginBottom={1}>
                                           {dates}
                                        </Paragraph>
                                    </Col>
                                    <Col xs={12} sm={4}>
                                        <Button.CTA label={`View ${year} Workshop`} onClick={() => {
                                            window.location.href = `/${year}`;
                                        }} />
                                    </Col>
                                </Row>
                            </li>
                        ))}
                    </ul>
                </Container>
            </Section>
        </Layout>
    );
};
export default Home;
