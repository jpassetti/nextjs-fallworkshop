export function formatArrayToStringWithCommas(people) {
	const peopleArrayWithNames = people.map(person => {
		const {firstName, lastName} = person.personInformation;
		return `${firstName} ${lastName}`;
	})
	if (peopleArrayWithNames.length > 1) {
		// multiple people
		const last = peopleArrayWithNames.pop();
		const result = peopleArrayWithNames.join(', ') + ' and ' + last;
		return result;
	} else {
		// single person
		return peopleArrayWithNames.join();
	}
}
