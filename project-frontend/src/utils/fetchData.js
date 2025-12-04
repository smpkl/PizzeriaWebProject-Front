const fetchData = async (url, options = {}) => {
  // console.log('fetching data from url: ', url);
  const response = await fetch(url, options);
  const json = await response.json();
  if (!response.ok) {
    //console.log('json', json);
    if (json.error) {
      throw new Error(json.error.message);
    }
  }
  return json;
};

export default fetchData;
