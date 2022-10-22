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
export function getFormattedStoryType(type) {
	let formattedType;
	switch (type) {
	case 'none':
		formattedType = "None";
		break;
	case 'still':
		formattedType = "Single Photo";
		break;
	case 'photo_gallery':
		formattedType = "Photo Gallery";
		break;
	case 'video':
		formattedType = "Video";
		break;
	}
	return formattedType;
}
