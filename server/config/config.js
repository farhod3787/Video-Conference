const port = 8000;
const url = 'http://localhost:8000';
const database = 'mongodb://localhost:27017/video_conference';
const JWT_SECRET = 'zoom-clone';
const JWT_EXPIRATION = '2h';

export default {
  url,
  database,
  port,
  JWT_SECRET,
  JWT_EXPIRATION
}