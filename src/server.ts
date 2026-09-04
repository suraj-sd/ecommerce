import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, prisma } from "./config/database.js";

const startServer = async () => {
  try {
    await connectDatabase();

    const server = app.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });

    const shutdown = async (signal: string) => {
      console.log(`${signal} received. Shutting down...`);

      server.close(async () => {
        await prisma.$disconnect();

        console.log("Server shutdown complete");

        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));

    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("Failed to start server:", error);

    await prisma.$disconnect();

    process.exit(1);
  }
};

startServer();
