import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

const KEY = '27554653-652dd52f5d9f77b2420fd44a9';

async function searchImg(name, page) {
  const response = await axios.get(
    `${BASE_URL}?key=${KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`
  );
  return response.data;
}

export default searchImg;
