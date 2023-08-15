exports.latestStories = async (data) => {
  // this will be the return of this helper
  // will push the title and link object into this array
  const response = [];

  // static host to concatenate the extracted link
  const host = "https://time.com";
  let sliceStart = data.indexOf(`latest-stories__heading">Latest Stories`);
  let sliceEnd = data.indexOf(`homepage-section-v2 mag-subs`);

  // mutate the html string by slicing based on start and end
  // and split by <li> element to convert it into an array
  const result = data
    .slice(sliceStart, sliceEnd)
    .split(`<li class="latest-stories__item">`);

  for (let i = 1; i < result.length; i++) {
    const link = result[i].slice(
      result[i].indexOf(`/`),
      result[i].indexOf(`/">`)
    );
    const title = result[i]
      .slice(result[i].indexOf(`headline"`), result[i].indexOf(`</h3>`))
      .replace(`headline">`, "");

    const object = { title, link: host + link };
    response.push(object);
  }

  return response;
};
