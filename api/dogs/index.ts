import { AzureFunction, Context, HttpRequest } from "@azure/functions"

// import {Dog} from '../../shared/interface';

interface Dog {
    name: string;
    age: number;
}



const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log("Returned list of dogs");

    const dogs:Array<Dog>=[
        { name: 'Sammy', age: 2 },
        { name: 'Dyson', age: 6 },
        { name: 'Roscoe', age: 15 },
        {name:'Butch',age:10},
        {name:'Yarn',age:12}
    ];

    context.res = {
        // status: 200, /* Defaults to 200 */
        body:{dogs},
        headers:{'Content-type':'application/json'}
    };

};

export default httpTrigger;