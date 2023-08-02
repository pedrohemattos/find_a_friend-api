import express from 'express';

import { router as organizationsRoutes } from './http/controllers/organizations/routes';
import { router as petsRoutes } from './http/controllers/pets/routes';
import cookieParser from 'cookie-parser';
const cors = require("cors")

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/organizations", organizationsRoutes);
app.use("/pets", petsRoutes);
