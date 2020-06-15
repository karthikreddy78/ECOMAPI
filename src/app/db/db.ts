import * as mongoose from 'mongoose'

export class MongoConnect{
    static connect()
    {
        //const db="mongodb+srv://root:root@cluster0-fckxj.mongodb.net/ecommerce?retryWrites=true&w=majority"
        //mongoose.Promise = global.Promise;
//mongoose.connect(db, {useNewUrlParser: true,useUnifiedTopology: true},)

       const mongDBConn=process.env.MONGODB_URL || 'hello'
       //console.log(mongDBConn)
       mongoose.set('useCreateIndex', true);
        return mongoose.connect(mongDBConn, {useNewUrlParser: true,useUnifiedTopology: true})
    }
}