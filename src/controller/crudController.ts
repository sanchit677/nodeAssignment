import { Request, Response } from "express";
import { JsonController, OnUndefined, Param, Body, Get, Post, Put, Delete, Res, HttpCode}  from 'routing-controllers';
import { MongoHelper } from '../mongo.helper';
import { Util } from '../util';
import { ObjectID } from "bson";

// import * as util from 'util';   //use for displaying circluar Json sample - // return util.inspect(db.databaseName);
// const machine = require(path.resolve("/DevSpace/NodeCRUDApp/src/models/weapon"));

const util = new Util();
let response: any;

@JsonController()
export class CRUDController {
    private documentResult: any;
    private dbInstance: any;
    private collectionName: any;
    constructor(){
        this.dbInstance = MongoHelper.client.db('CRUD');
        this.collectionName = this.dbInstance.collection('weapon');
    }

    @Get('/getList/:id')
    @OnUndefined(404)
    public async GetOne(@Param("id") id: number) {
        return this.collectionName.find({ _id: new ObjectID(id) }).toArray();
    }

    @Get('/getList')
    @OnUndefined(404)
    public async GetAllList() {
        return this.collectionName.find({}).toArray();
    }

    @HttpCode(200)
    @Post('/createList')
    @OnUndefined(404)
    public async CreateList(@Body() req: any,@Res() res: any){
        let promisedDB = this.collectionName.insertMany(req);
        response = await this.ExecutePromise(promisedDB);
        return res.send(response.insertedIds)
    }

    @Delete('/deleteList/:id')
    @OnUndefined(404)
    public async DeleteList(@Param("id") id: number){
        this.collectionName.deleteMany({ _id: new ObjectID(id) });
        return 'Successfully Deleted!'
    }

    @Put('/updateList/:id')
    @OnUndefined(404)
    public async UpdateList(@Param("id") id: number){
        this.collectionName.updateOne({ _id: new ObjectID(id) }, {$set : { name: "Aug A3", damage: 65, dps: 60, type: "AR", remarks: "Catch if you can from the drops!" }});
        return 'Successfully Updated!';
    }

    private async ExecutePromise(value){
        let resolvedPromise: any;
        await value.then((data) => {
                resolvedPromise = data;
        });
        return resolvedPromise;
    }
}