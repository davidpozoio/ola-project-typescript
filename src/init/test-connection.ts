import pool from "../config/mysql-config";
import delay from "../utils/delay";

const testConnection = async () => {
  let test = true;

  while (test) {
    try {
      await pool.query("SELECT 1");
      test = false;
      console.log("connection stablished!");
    } catch {
      console.log("testing connection...");
    }
    await delay(2);
  }
};

export default testConnection;
