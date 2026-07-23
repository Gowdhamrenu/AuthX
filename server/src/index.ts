import express from "express";

import { env } from "./config/env";
import { connectDatabase } from "./config/database";
import healthRoutes from "./routes/health.routes";

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);

const startServer = async () => {
  await connectDatabase();

  app.listen(Number(env.PORT), () => {
    console.log(`🚀 Server running at http://localhost:${env.PORT}`);
  });
};

startServer();