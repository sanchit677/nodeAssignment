import express from 'express';
// import * as cors from 'cors';
import { useExpressServer } from 'routing-controllers';
import { CRUDController } from './controller/crudController';
import { requestLoggerMiddleware } from './middleware/request.logger.middleware';
import { MongoHelper } from '../src/mongo.helper';
import * as http from 'http';
import 'reflect-metadata';
// import cors from 'cors';

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true})); 
app.use(express.json());  
app.use(requestLoggerMiddleware);
// app.use(cors);

// app.use('/', router);

useExpressServer(app, {
    controllers: [CRUDController],
    classTransformer: false // other wise classTransfer throws error to create instance
});

const server = http.createServer(app);
app.get('/', (req, res) => {
    res.send('CRUD Node Server');
});

server.listen(port);

var projectDBi = {
    user: 'pe8zfb', pass: 'matrix',  host: 'localhost',  port: 27017, database: 'CRUD',
    autoBackup: true, removeOldBackup: false, keepLastDaysBackup: 2, autoBackupPath: './automaticsDailyBackUp/' // i.e. /var/database-backup/
};


server.on('listening',  async() => {
        try{
            console.log(`Server is listening on ${port}`);
            var projectURI = 'mongodb://' + projectDBi.user + ':' + projectDBi.pass + '@' + projectDBi.host + ':' + projectDBi.port + '/' + projectDBi.database;
            await MongoHelper.connect(projectURI);
            console.info(`Connect to Mongo!`);
        }
        catch(err){
            console.error(`Unable to Connect to Mongo!`, err);
        }
    });