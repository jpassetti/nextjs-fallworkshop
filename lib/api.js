const API_URL = process.env.WORDPRESS_API_URL;

async function fetchAPI(query, { variables } = {}) {
 const headers = { "Content-Type": "application/json" };

 const res = await fetch(API_URL, {
  method: "POST",
  headers,
  body: JSON.stringify({
   query,
   variables,
  }),
 });

 const json = await res.json();
 if (json.errors) {
  console.error(json.errors);
  throw new Error("Failed to fetch API");
 }
 return json.data;
}

export async function getAllYearSlugs() {
 const data = await fetchAPI(`query MyQuery {
		years(first: 100) {
			edges {
				node {
					slug
				}
			}
		}
	}
	`);
 return data?.years.edges;
}

const GET_PEOPLE_BY_YEAR = `
query MyQuery($id: ID!, $first: Int, $after: String) {
  year(idType: SLUG, id: $id) {
    id
    name
    people(first: $first, after: $after) {
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
              sourceUrl(size: LARGE)
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
              facultyBioUrl
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}`;

export async function getPeopleByYear(id) {
 let allPeople = [];
 let hasNextPage = true;
 let after = null;

 while (hasNextPage) {
  const data = await fetchAPI(GET_PEOPLE_BY_YEAR, {
   variables: {
    id: id,
    first: 200, // Fetch 200 people per request
    after, // Use the cursor from the previous request
   },
  });

  const { edges, pageInfo } = data?.year.people;

  // Add the current batch of people to the array
  allPeople.push(...edges);

  // Update pagination info
  hasNextPage = pageInfo.hasNextPage;
  after = pageInfo.endCursor;
 }

 return allPeople;
}

// export async function getPeopleByYear(id) {
//  const data = await fetchAPI(
//   `query MyQuery($id: ID!) {
//   year(idType: SLUG, id: $id) {
//     id
//     name
//     people (first:200) {
//       edges {
//         node {
//           id
//           title
//           slug
//           featuredImage {
//             node {
//               altText
//               mediaDetails {
//                 width
//                 height
//               }
//               sourceUrl(size: LARGE)
//             }
//           }
//           personInformation {
//             firstName
//             lastName
//             jobs {
//               companyName
//               companyUrl
//               jobTitle
//             }
//             linksInformation {
//               linkedinUrl
//               instagramUrl
//               twitterUrl
//               websiteUrl
//               facultyBioUrl
//               links
//             }
//             rolesPerYear {
//               role
//               title
//               year
//             }
//           }
//         }
//       }
//     }
//   }
// }`,
//   {
//    variables: {
//     id: id,
//    },
//   }
//  );
//  return data?.year.people.edges;
// }

export async function getScheduleByYear(id) {
 const data = await fetchAPI(
  `query MyQuery($id: ID!) {
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
	`,
  {
   variables: {
    id: id,
   },
  }
 );
 return data?.scheduleItem;
}

export async function getSponsorsByYear(id) {
 const data = await fetchAPI(
  `query MyQuery($id: ID!) {
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
}`,
  {
   variables: {
    id: id,
   },
  }
 );
 return data?.year.sponsors.edges;
}

export function getNavLinks() {
 const navLinks = [
  {
   label: "About",
   id: "about",
  },
  {
   label: "Stories",
   id: "stories",
  },
  {
   label: "Workshops",
   id: "workshops",
  },
  {
   label: "Schedule",
   id: "schedule",
  },
  {
   label: "Coaches",
   id: "coaches",
  },
  {
   label: "Faculty",
   id: "faculty",
  },
  {
   label: "Sponsors",
   id: "sponsors",
  },
 ];
 return navLinks;
}

/**
 * Return an array of nav link objects (label, id) filtered and ordered by the
 * provided requestedIds array. Unknown ids are skipped.
 *
 * Example: getNavLinksByYear(['schedule','coaches'])
 */
export function getNavLinksByYear(request = []) {
 const available = getNavLinks();
 const lookup = available.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
 }, {});

 // If request is empty or not an array, return all available links
 if (!Array.isArray(request) || request.length === 0) {
  return available;
 }

 // If request is an array of strings (ids), return the filtered ordered array
 if (typeof request[0] === "string") {
  return request.map((id) => lookup[id]).filter(Boolean);
 }

 // If request is an array of objects like { year, links: ['stories','coaches'] }
 if (typeof request[0] === "object" && request[0] !== null) {
  return request.map(({ year, links }) => {
   const nav = Array.isArray(links)
    ? links.map((id) => lookup[id]).filter(Boolean)
    : [];
   return { year, nav };
  });
 }

 // Fallback: return available
 return available;
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
    },
   },
   links: [
    {
     type: "Website",
     url: "https://www.greatbigstory.com/",
    },
    {
     type: "Twitter",
     url: "https://twitter.com/ibartolucci",
    },
    {
     type: "Instagram",
     url: "https://www.instagram.com/ibartolucci/",
    },
   ],
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
    },
   },
   links: [
    {
     type: "Website",
     url: "https://www.greatbigstory.com/",
    },
    {
     type: "Twitter",
     url: "https://twitter.com/ibartolucci",
    },
    {
     type: "Instagram",
     url: "https://www.instagram.com/ibartolucci/",
    },
   ],
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
    },
   },
   links: [
    {
     type: "Website",
     url: "https://www.greatbigstory.com/",
    },
    {
     type: "Twitter",
     url: "https://twitter.com/ibartolucci",
    },
    {
     type: "Instagram",
     url: "https://www.instagram.com/ibartolucci/",
    },
   ],
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
    },
   },
   links: [
    {
     type: "Website",
     url: "https://www.greatbigstory.com/",
    },
    {
     type: "Twitter",
     url: "https://twitter.com/ibartolucci",
    },
    {
     type: "Instagram",
     url: "https://www.instagram.com/ibartolucci/",
    },
   ],
  },
 ];
 return people;
}

export async function getAllYears() {
 try {
  const data = await fetchAPI(
   `query GetYears {
        years {
          edges {
            node {
              name
            }
          }
        }
      }`
  );

  if (!data) {
   throw new Error("No data returned from the API");
  }

  return data?.years.edges;
 } catch (error) {
  console.error("Error fetching years:", error);
  return [];
 }
}

export async function getAllStorySlugs() {
 const data = await fetchAPI(
  `query MyQuery($first: Int) {
  posts(first: $first) {
    edges {
      node {
        id
        slug
        years {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    }
  }
}`,
  {
   variables: {
    first: 100,
   },
  }
 );
 return data?.posts.edges;
}
export async function getStoryBySlug(id) {
 const data = await fetchAPI(
  `query MyQuery($id: ID!) {
  post(id: $id, idType: SLUG) {
    id
    title
    slug
    excerpt
	content
    featuredImage {
      node {
        id
        sourceUrl(size: LARGE)
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
          sourceUrl(size: LARGE)
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
            sourceUrl(size: LARGE)
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
              sourceUrl(size: MEDIUM)
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
              sourceUrl(size: LARGE)
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
}`,
  {
   variables: {
    id: id,
   },
  }
 );
 return data?.post;
}
export async function getStoriesByYear(id) {
 const GET_STORIES = `
    query MyQuery($id: ID!, $first: Int, $after: String) {
      year(id: $id, idType: SLUG) {
        posts(first: $first, after: $after) {
          edges {
            node {
              id
              title
              slug
              excerpt
              years {
                edges {
                  node {
                    name
                  }
                }
              }
              featuredImage {
                node {
                  id
                  sourceUrl(size: LARGE)
                  altText
                  mediaDetails {
                    width
                    height
                  }
                }
              }
              storyInformation {
                storyType
                students {
                  ... on Person {
                    id
                    personInformation {
                      firstName
                      lastName
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  `;

 const allStories = [];
 let hasNextPage = true;
 let after = null;

 while (hasNextPage) {
  const data = await fetchAPI(GET_STORIES, {
   variables: {
    id,
    first: 100, // Fetch 100 stories per request
    after, // Use the cursor for pagination
   },
  });

  const { edges, pageInfo } = data?.year.posts;

  // Add the fetched stories to the array
  allStories.push(...edges.map((edge) => edge.node));

  // Update pagination info
  hasNextPage = pageInfo.hasNextPage;
  after = pageInfo.endCursor;
 }

 return allStories;
}
export async function getStorySlugsByYear(id) {
 const GET_STORY_SLUGS = `
  query MyQuery($id: ID!, $first: Int, $after: String) {
    year(id: $id, idType: SLUG) {
      posts(first: $first, after: $after) {
        edges {
          node {
            slug
            years {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }`;

 const allSlugs = [];
 let hasNextPage = true;
 let after = null;

 while (hasNextPage) {
  const data = await fetchAPI(GET_STORY_SLUGS, {
   variables: {
    id,
    first: 100, // Fetch 100 posts per batch
    after, // Cursor for the next batch
   },
  });

  const { edges, pageInfo } = data?.year.posts;

  // Add fetched slugs to the array
  allSlugs.push(...edges.map((edge) => edge.node));

  // Update pagination variables
  hasNextPage = pageInfo.hasNextPage;
  after = pageInfo.endCursor;
 }

 return allSlugs;
}

export function getSponsors() {
 const sponsors = [
  {
   title: "Nikon",
   url: "https://www.nikonusa.com/",
   logo: "nikon-logo.svg",
  },
  {
   title: "B&H Photo",
   url: "https://www.bhphotovideo.com/",
   logo: "b-and-h-photo-logo.svg",
  },
  {
   title: "Syracuse University Bookstore",
   url: "https://bookweb.syr.edu/",
   logo: "syracuse-university-bookstore-logo.svg",
  },
  {
   title: "Think Tank Photo",
   url: "https://www.thinktankphoto.com/",
   logo: "think-tank-logo.svg",
  },
  /*{
			title: "Tamron",
			url: "http://www.tamron-usa.com/",
			logo: "tamron-logo.svg"
		},*/
  {
   title: "Newhouse School",
   url: "https://newhouse.syr.edu/",
   logo: "newhouse-school-logo-white.svg",
  },
  {
   title: "appeThaizing",
   url: "http://www.appethaizing.com/",
   logo: false,
  },
  {
   title: "Brooklyn Pickle",
   url: "https://www.brooklynpickle.com/",
   logo: false,
  },
  {
   title: "Insomnia Cookies",
   url: "https://insomniacookies.com/",
   logo: false,
  },
  {
   title: "Pascale Italian Bistro",
   url: "http://www.pascaledrumlins.com/",
   logo: false,
  },
  {
   title: "Pastabilities",
   url: "http://www.pastabilities.com/",
   logo: false,
  },
  {
   title: "Smokey and the Pig BBQ",
   url: "https://smokeyandthepig.com/",
   logo: false,
  },
 ];
 return sponsors;
}
