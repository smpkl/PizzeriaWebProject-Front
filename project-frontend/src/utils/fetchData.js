const fetchData = async (url, options = {}) => {
  // console.log('fetching data from url: ', url);
  const response = await fetch(url, options);
  const json = await response.json();
  console.log('fetchResponse: ', response);
  if (!response.ok) {
    console.log('json', json);
    if (json.error) {
      console.log(json.error);
      throw new Error(json.error.message);
    }
  }
  return json;
};

export default fetchData;
