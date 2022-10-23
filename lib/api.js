const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query, { variables } = {}) {
	const headers = { 'Content-Type': 'application/json' }

	const res = await fetch(API_URL, {
		method: 'POST',
		headers,
		body: JSON.stringify({
			query,
			variables,
		}),
	})

	const json = await res.json()
	if (json.errors) {
		console.error(json.errors)
		throw new Error('Failed to fetch API')
	}
	return json.data
}

export async function getPeopleByYear(id) {
	const data = await fetchAPI(`
query MyQuery($id: ID!) {
  year(idType: SLUG, id: $id) {
    id
    name
    people(first: 1000) {
      edges {
        node {
          id
          title
          slug
          featuredImage {
            node {
              altText
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }
          personInformation {
            firstName
            lastName
            jobs {
              companyName
              companyUrl
              jobTitle
            }
            linksInformation {
              linkedinUrl
              instagramUrl
              twitterUrl
              websiteUrl
              links
            }
            rolesPerYear {
              role
              title
              year
            }
          }
        }
      }
    }
  }
}`, {
		variables: {
			"id": id
		}
})
	return data?.year.people.edges
}

export async function getScheduleDays(id) {
	const data = await fetchAPI(`
	query MyQuery($id: ID!) {
  scheduleItem(idType: SLUG, id: $id) {
    id
    title
    scheduleInformation {
      days {
        dayDate
        events {
          date {
            endTime
            startTime
          }
          description
          eventType
          location
          title
          speakers {
            speakerCompany
            speakerCompanyUrl
            speakerImage {
              altText
              mediaDetails {
                height
                width
              }
              sourceUrl
            }
            speakerJob
            speakerName
          }
        }
      }
    }
  }
}
	`, {
		variables: {
			"id": id
		}
})
	return data?.scheduleItem
}

export async function getSponsorsByYear(id) {
	const data = await fetchAPI(`
query MyQuery($id: ID!) {
  year(idType: SLUG, id: $id) {
    id
    name
    sponsors(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
      edges {
        node {
          id
          title
          featuredImage {
            node {
              id
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          sponsorInformation {
            sponsorUrl
          }
        }
      }
    }
  }
}`, {
		variables: {
			"id": id
		}
})
	return data?.year.sponsors.edges
}

export function getNavLinks() {
	const navLinks = [
		/*{
			label: "Stories",
			id: "stories"
		},*/
		{
			label: "About",
			id: "about"
		},
		{
			label: "Stories",
			id: "stories"
		},
		{
			label: "Schedule",
			id: "schedule"
		},
		{
			label: "Coaches",
			id: "coaches"
		},
		{
			label: "Staff",
			id: "staff"
		},
		{
			label: "Sponsors",
			id: "sponsors"
		},
	];
	return navLinks;
}
export function getPeople() {
	const people = [
		{
			firstName: "Isabella",
			lastName: "Bartolucci",
			jobTitle: "Producer",
			company: "CNN's Great Big Story",
			peopleType: "coach",
			image: {
				sourceUrl: "/coaches/isabella-bartolucci.jpg",
				altText: "Isabella Bartolucci",
				mediaDetails: {
					width: 600,
					height: 600,
				}
			},
			links: [
				{
					type: "Website",
					url: "https://www.greatbigstory.com/"
				},
				{
					type: "Twitter",
					url: "https://twitter.com/ibartolucci"
				},
				{
					type: "Instagram",
					url: "https://www.instagram.com/ibartolucci/"
				},
			]
		},
		{
			firstName: "Isabella",
			lastName: "Bartolucci",
			jobTitle: "Producer",
			company: "CNN's Great Big Story",
			peopleType: "coach",
			image: {
				sourceUrl: "/coaches/isabella-bartolucci.jpg",
				altText: "Isabella Bartolucci",
				mediaDetails: {
					width: 600,
					height: 600,
				}
			},
			links: [
				{
					type: "Website",
					url: "https://www.greatbigstory.com/"
				},
				{
					type: "Twitter",
					url: "https://twitter.com/ibartolucci"
				},
				{
					type: "Instagram",
					url: "https://www.instagram.com/ibartolucci/"
				},
			]
		},
		{
			firstName: "Isabella",
			lastName: "Bartolucci",
			jobTitle: "Producer",
			company: "CNN's Great Big Story",
			peopleType: "coach",
			image: {
				sourceUrl: "/coaches/isabella-bartolucci.jpg",
				altText: "Isabella Bartolucci",
				mediaDetails: {
					width: 600,
					height: 600,
				}
			},
			links: [
				{
					type: "Website",
					url: "https://www.greatbigstory.com/"
				},
				{
					type: "Twitter",
					url: "https://twitter.com/ibartolucci"
				},
				{
					type: "Instagram",
					url: "https://www.instagram.com/ibartolucci/"
				},
			]
		},
		{
			firstName: "Jeff",
			lastName: "Passetti",
			jobTitle: "Producer",
			company: "Syracuse University",
			peopleType: "staff",
			image: {
				sourceUrl: "/coaches/isabella-bartolucci.jpg",
				altText: "Isabella Bartolucci",
				mediaDetails: {
					width: 600,
					height: 600,
				}
			},
			links: [
				{
					type: "Website",
					url: "https://www.greatbigstory.com/"
				},
				{
					type: "Twitter",
					url: "https://twitter.com/ibartolucci"
				},
				{
					type: "Instagram",
					url: "https://www.instagram.com/ibartolucci/"
				},
			]
		},
	];
	return people
}

export async function getAllStorySlugs() {
const data = await fetchAPI(`
query MyQuery($first: Int) {
  posts(first: $first) {
    edges {
      node {
        id
        slug
      }
    }
  }
}`, {
		variables: {
			"first": 100
		}
})
	return data?.posts.edges
}
export async function getStoryBySlug(id) {
	const data = await fetchAPI(`
query MyQuery($id: ID!) {
  post(id: $id, idType: SLUG) {
    id
    title
    slug
    excerpt
	content
    featuredImage {
      node {
        id
        sourceUrl
        altText
        mediaDetails {
          width
          height
        }
      }
    }
    storyInformation {
      storyType
      stillImages {
        fieldGroupName
        stillImage {
          id
          sourceUrl
          altText
          mediaDetails {
            width
            height
          }
          caption
          description
        }
      }
      photoGalleries {
        fieldGroupName
        photoGallery {
          image {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
            caption
            description
          }
        }
      }
      videos {
        fieldGroupName
        vimeoUrl
      }
      coaches {
        ... on Person {
          id
          title
          slug
          featuredImage {
            node {
              altText
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }
          personInformation {
            firstName
            lastName
          }
        }
      }
      students {
        ... on Person {
          id
          title
          slug
          featuredImage {
            node {
              altText
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }
          personInformation {
            firstName
            lastName
          }
        }
      }
    }
  }
}`, {
		variables: {
			"id": id
		}
	})
	return data?.post

}
export async function getStoriesByYear(id) {
		const data = await fetchAPI(`
query MyQuery($id: ID!) {
  year(idType: SLUG, id: $id) {
    id
    name
    posts {
      edges {
        node {
          id
          title
		  slug
		  excerpt
          featuredImage {
            node {
              id
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          storyInformation {
            storyType
            stillImages {
              fieldGroupName
              stillImage {
                id
                sourceUrl
                altText
                mediaDetails {
                  width
                  height
                }
                caption
                description
              }
            }
            photoGalleries {
              fieldGroupName
              photoGallery {
                image {
                  sourceUrl
                  altText
                  mediaDetails {
                    width
                    height
                  }
                  caption
                  description
                }
              }
            }
            videos {
              fieldGroupName
              vimeoUrl
            }
            coaches {
              ... on Person {
                id
                title
                slug
				featuredImage {
            node {
              altText
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }
                personInformation {
                  firstName
                  lastName
                }
              }
            }
            students {
              ... on Person {
                id
                title
                slug
				featuredImage {
            node {
              altText
              mediaDetails {
                width
                height
              }
              sourceUrl
            }
          }
                personInformation {
                  firstName
                  lastName
                }
              }
            }
          }
        }
      }
    }
  }
}`, {
	variables: {
			"id": id,
		}
})
	return data?.year.posts.edges
}

export function getSponsors() {
	const sponsors = [
		{
			title: "Nikon",
			url: "https://www.nikonusa.com/",
			logo: "nikon-logo.svg"
		},
		{
			title: "B&H Photo",
			url: "https://www.bhphotovideo.com/",
			logo: "b-and-h-photo-logo.svg"
		},
		{
			title: "Syracuse University Bookstore",
			url: "https://bookweb.syr.edu/",
			logo: "syracuse-university-bookstore-logo.svg"
		},
		{
			title: "Think Tank Photo",
			url: "https://www.thinktankphoto.com/",
			logo: "think-tank-logo.svg"
		},
		/*{
			title: "Tamron",
			url: "http://www.tamron-usa.com/",
			logo: "tamron-logo.svg"
		},*/
		{
			title: "Newhouse School",
			url: "https://newhouse.syr.edu/",
			logo: "newhouse-school-logo-white.svg"
		},
		{
			title: "appeThaizing",
			url: "http://www.appethaizing.com/",
			logo: false
		},
		{
			title: "Brooklyn Pickle",
			url: "https://www.brooklynpickle.com/",
			logo: false
		},
		{
			title: "Insomnia Cookies",
			url: "https://insomniacookies.com/",
			logo: false
		},
		{
			title: "Pascale Italian Bistro",
			url: "http://www.pascaledrumlins.com/",
			logo: false
		},
		{
			title: "Pastabilities",
			url: "http://www.pastabilities.com/",
			logo: false
		},
		{
			title: "Smokey and the Pig BBQ",
			url: "https://smokeyandthepig.com/",
			logo: false
		},
	];
	return sponsors;
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
207_nh1 : Steele Center
252_nh3 : Larry Kramer War Room
253_nh3 : CMR Lab
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
