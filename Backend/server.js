import 'dotenv/config'
import app from "./src/app.js";
import connectDB from './src/db/db.js';

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4001, () => {
      console.log(`SERVER IS RUNNING ON PORT : ${process.env.PORT}`);
    })
  }
  ).catch(
    (error) => {
      console.log("MongoDB Connnection Failed", error);
    }
  )


