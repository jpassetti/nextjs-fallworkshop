import Heading from "./Heading";
import Span from "./Span";

const SpanifyAuthorsList = ({students}) => {

    const formattedStudents = students.map((node, index) => {
        const {firstName, lastName} = node.personInformation;
        return <Span key={index}>{firstName} {lastName}</Span>
    }).reduce((prev, curr) => [prev, ', ', curr])

    return <Heading level="4" fontWeight="500" color="white" textAlign="center">By {formattedStudents}</Heading>
}
export default SpanifyAuthorsList