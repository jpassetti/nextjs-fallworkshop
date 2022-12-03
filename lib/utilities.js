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
