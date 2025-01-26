import mongoose from 'mongoose';
import config from './config/config.js';
import app from './db/index.js';

mongoose.connect(config.database).then( () => {
  console.log('Connected to database')
})
.catch( () =>{
  console.log('Error in connected database')
});

mongoose.set('strictPopulate', false);

export default app;