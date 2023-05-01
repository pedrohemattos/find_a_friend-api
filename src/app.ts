import express from 'express';

import { router as organizationsRoutes } from './http/controllers/organizations/routes';
import { router as petsRoutes } from './http/controllers/pets/routes';

export const app = express();

app.use(express.json());

app.use("/organizations", organizationsRoutes);
app.use("/pets", petsRoutes);
