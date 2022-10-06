const BASE_URL = "https://resources.newhouse.syr.edu/directory/wp-json/wp/v2";

export async function getPeople() {
  const peopleRes = await fetch(BASE_URL + "/directory?per_page=100");
  const people = await peopleRes.json();
  return people;
}
