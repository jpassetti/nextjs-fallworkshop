import Container from "@/components/primitives/Container";
import Paragraph from "@/components/primitives/Paragraph";
import Section from "@/components/primitives/Section";
import VimeoLightbox from "@/components/media/VimeoLightbox";
import styles from "./about.module.scss";

type AboutProps = {
 videoUrl?: string | null;
 contentHtml?: string | null;
};

const About = ({ videoUrl, contentHtml }: AboutProps) => {
 return (
  <Section id="about" title="About">
   <Container content>
    <div className={styles.aboutLayout}>
     {videoUrl && (
      <div className={styles.aboutMedia}>
       <VimeoLightbox src={videoUrl} title="The Alexia Fall Workshop video" />
      </div>
     )}
     <div className={styles.aboutBody}>
      {contentHtml ? (
       <div
        className={styles.aboutProse}
        dangerouslySetInnerHTML={{ __html: contentHtml }}
       />
      ) : (
       <Paragraph marginBottom="2" className={styles.aboutFallback}>
        Founded by Visual Communications faculty in 1999, the workshop brings
        top professionals from around the world to join our professors as we
        push students to identify, observe and artfully communicate the core of
        who we are and the issues we face in everyday life. In the process,
        students learn to better use still photography, audio, video, motion
        graphics, design and words to become exceptional storytellers who
        engage the community.
       </Paragraph>
      )}
     </div>
    </div>
   </Container>
  </Section>
 );
};
export default About;
