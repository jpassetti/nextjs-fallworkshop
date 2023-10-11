import Span from '../components/Span';

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

export function formatTimeDuration(date) {
	const { startTime, endTime } = date;
	const startTimeSplit = startTime.split(" ");
	const startHour = startTimeSplit[0].split(":")[0];
	const startMinutes = startTimeSplit[0].split(":")[1];
	const startAMPM = startTimeSplit[1];
	const startFormatted = startMinutes !== "00" ? `${startHour}:${startMinutes}` : `${startHour}`;

	const endTimeSplit = endTime ? endTime.split(" ") : null;
	const endHour = endTime ? endTimeSplit[0].split(":")[0] : null;
	const endMinutes = endTime ? endTimeSplit[0].split(":")[1] : null;
	const endAMPM = endTime ? endTimeSplit[1] : null;
	const endFormatted = endTime && endMinutes !== "00" ? `${endHour}:${endMinutes}` : endHour ? `${endHour}` : null;


	let formattedDuration;
	if(endTime) {
		// yes endTime
		if (startAMPM === "am" & endAMPM === "am") {
			formattedDuration = `${startFormatted}-${endFormatted} a.m.`;
		} else if (startAMPM === "pm" & endAMPM === "pm") {
			formattedDuration = `${startFormatted}-${endFormatted} p.m.`;
		} else {
			formattedDuration = `${startFormatted} a.m.-${endFormatted} p.m.`;
		}
	} else {
		// no endTime
		if (startAMPM === "am") {
			formattedDuration = `${startFormatted} a.m.`;
		} else {
			formattedDuration = `${startFormatted} p.m.`;
		}
	}

	return formattedDuration;
}

export function getFormattedLocation(location) {
	let room;
	/*
none : None
nh : Around Newhouse
lobby_nh1 : Newhouse 1 Lobby
2nd_floor_gallery_nh1 : Newhouse 1 Floor 2 Gallery
113_nh1 : Photo Studio
140_nh3 : Joyce Hergenhan Auditorium
141_nh3 : Halmi Screening Room
150_nh3 : Emerging Insights Lab
151_nh3 : Classroom
207_nh1 : Steele Center
252_nh3 : Larry Kramer War Room
253_nh3 : CMR Lab
303_nh1 : Miron Special Events Room
432_nh3 : I-3 Center
legal_seafood : Legal Sea Foods area of Food.com
remembrance_memorial : Remembrance Memorial
server : Submit on server
	*/
	switch (location) {
	case 'none':
		room = {
			name: null,
			number: null,
			building: null
		}
		break;
	case 'nh':
		room = {
			name: "Around Newhouse",
			number: null,
			building: null
		}
		break;
	case 'lobby_nh1':
		room = {
			name: "Lobby",
			number: null,
			building: "Newhouse 1"
		}
		break;
	case '2nd_floor_gallery_nh1':
		room = {
			name: "Floor 2 Gallery",
			number: null,
			building: "Newhouse 1"
		}
		break;
	case 'legal_seafood':
		room = {
			name: "Legal Sea Food area",
			number: "Food.com",
			building: "Newhouse 3"
		}
		break;
	case '113_nh1':
		room = {
			name: "Photo Studio",
			number: 113,
			building: "Newhouse 1"
		}
		break;
	case '140_nh3':
		room = {
			name: "Joyce Hergenhan Auditorium",
			number: 140,
			building: "Newhouse 3"
		}
		break;
	case '141_nh3':
			room = {
				name: "Halmi Screening Room",
				number: 141,
				building: "Newhouse 3"
			}
		break;
	case '150_nh3':
			room = {
				name: "Emerging Insights Lab",
				number: 150,
				building: "Newhouse 3"
			}
		break;
	case '151_nh3':
			room = {
				name: "Classroom",
				number: 151,
				building: "Newhouse 3"
			}
		break;
	case '207_nh1':
		room = {
			name: "Steele Center",
			number: 207,
			building: "Newhouse 1"
		}
		break;
	case '252_nh3':
		room = {
			name: "Larry Kramer War Room",
			number: 252,
			building: "Newhouse 3"
		}
		break;
	case '253_nh3':
		room = {
			name: "CMR Lab",
			number: 253,
			building: "Newhouse 3"
		}
		break;
	case '303_nh1':
			room = {
				name: "Miron Special Events Room",
				number: 303,
				building: "Newhouse 1"
			}
			break;
	case '432_nh3':
		room = {
			name: "I-3 Center",
			number: "432/434",
			building: "Newhouse 3"
		}
		break;
	case 'remembrance_memorial':
		room = {
			name: "Remembrance Memorial",
			number: null,
			building: "Syracuse University campus"
		}
		break;
	case 'server':
		room = {
			name: "Submit on server",
			number: null,
			building: null
		}
		break;
	default:
		room = {
			name: "Not formatted",
			number: 1844,
			building: "Newhouse 1"
		}
	}
	return room;
}

export function getFormattedDate(dayDate) {
	const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
	  
	// Extract year, month, and day from the dayDate string
	const year = parseInt(dayDate.substring(0, 4));
	const month = parseInt(dayDate.substring(4, 6)) - 1; // Months are 0-indexed
	const day = parseInt(dayDate.substring(6, 8));
  
	// Create a Date object with the extracted date components
	const date = new Date(year, month, day);
  
	// Set the time zone offset to Eastern Standard Time (EST)
	//date.setHours(date.getHours() - 5);
  
	const formattedDate = date.toLocaleDateString('en-US', options);
	return formattedDate;
  }