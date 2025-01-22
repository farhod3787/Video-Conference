import express from 'express'
import companyRouter from './company/company.routes.js';
import systemUserRouter from './systemUser/systemUser.routes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/company', companyRouter);
app.use('/api/system_user', systemUserRouter);

export default app;