import db from "./config/db";

const testConnection = async () => {
  try {
    const connection = await db.getConnection();

    console.log("Database connected successfully!");

    connection.release();
  } catch (error) {
    console.error(error);
  }
};

testConnection();
