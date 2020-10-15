
import Mongoose from "mongoose";

class MongoConnect {

    private static database: Mongoose.Connection;

    public static getInstance(): Mongoose.Connection {
        if (!this.database) {
            this.connect();
        }

        return this.database;
    }

    public static connect() {
        const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@stonks-cluster.unm0q.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`;
    
        if(this.database) {
            return;
        }
    
        Mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    
        this.database = Mongoose.connection;
    
        this.database.once("open", async () => {
          console.log("Connected to database");
        });
    
        this.database.on("error", () => {
          console.log("Error connecting to database");
        });

        return 
    }
    
    public static disconnect() {
        if (!this.database) {
          return;
        }
        Mongoose.disconnect();
      };
}

export default MongoConnect;