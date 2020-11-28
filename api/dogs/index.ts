import { AzureFunction, Context, HttpRequest } from "@azure/functions"

import * as mongoose from 'mongoose';

mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING,{useNewUrlParser:true})

import { Dog } from '../../shared/interfaces.d';

const dogSchema=new mongoose.Schema({
    name:String,
    age:Number
});

interface DogDocument extends Dog, mongoose.Document{}

const DogModel=mongoose.model<DogDocument>('Dog',dogSchema);


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log("Returned list of dogs");

    // const dogs:Array<Dog>=[
    //     { name: 'Sammy', age: 2 },
    //     { name: 'Dyson', age: 6 },
    //     { name: 'Roscoe', age: 15 },
    //     {name:'Butch',age:10},
    //     {name:'Yarn',age:12}
    // ];

    // await DogModel.insertMany([
    //     {
    //         name:'Tommy',age:4
    //     },
    //     {
    //         name:'Tony',age:10
    //     }
    // ]);

    const dogs=await DogModel.find();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body:{dogs},
        headers:{'Content-type':'application/json'}
    };

};

export default httpTrigger;