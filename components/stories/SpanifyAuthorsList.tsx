import Paragraph from "@/components/primitives/Paragraph";

type Student = {
    personInformation?: {
        firstName?: string;
        lastName?: string;
    };
};

type SpanifyAuthorsListProps = {
    students: Student[];
    className?: string;
};

const SpanifyAuthorsList = ({ students, className = "" }: SpanifyAuthorsListProps) => {
    const names = students
        .map((node) => {
            const firstName = node.personInformation?.firstName || "";
            const lastName = node.personInformation?.lastName || "";
            return `${firstName} ${lastName}`.trim();
        })
        .filter(Boolean);

    if (names.length === 0) {
        return null;
    }

    const byline = names.join(", ");

    return (
        <Paragraph
            className={className}
            color="white"
            textAlign="center"
            condensed
            caps
        >
            By {byline}
        </Paragraph>
    );
};
export default SpanifyAuthorsList;