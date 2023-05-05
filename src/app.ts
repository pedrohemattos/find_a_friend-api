import express from 'express';

import { router as organizationsRoutes } from './http/controllers/organizations/routes';
import { router as petsRoutes } from './http/controllers/pets/routes';
import cookieParser from 'cookie-parser';

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/organizations", organizationsRoutes);
app.use("/pets", petsRoutes);
