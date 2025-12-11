import server from "./index.js";
import dotenv from "dotenv";
dotenv.config();
import dbInitialization from "./config/db.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await dbInitialization();
    server.listen(PORT, () => {
      console.log(`✅ Server is listening on PORT ${PORT}.`);
    });
  } catch (error) {
    console.error("❌ Server can't be connected.");
  }
}

startServer();
