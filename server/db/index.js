import express from 'express'
import companyRouter from './company/company.routes.js';
import systemUserRouter from './systemUser/systemUser.routes.js';
import companyUserRouter from './companyUser/companyUser.routes.js';
import roomRouter from './room/room.routes.js';
import meetingRouter from './meeting/meeting.routes.js';

import languageRouter from './language/language.routes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/company', companyRouter);
app.use('/api/system_user', systemUserRouter);
app.use('/api/company_user', companyUserRouter);
app.use('/api/room', roomRouter);
app.use('/api/meeting', meetingRouter);

// Language and Translations
app.use('/api/language', languageRouter);

export default app;