const {loginDB} = require('../database/db');

var mongodb = require('mongodb');

async function add({name,password}){
    const db = await loginDB();
    const datacollection = db.collection("awscollection");
    try{
        const DuplicateUser = await datacollection.find({name,password}).toArray();
        if(DuplicateUser.length)
        {  return DuplicateUser }
        else{
            return "No Entry"
        }
        // await datacollection.insertOne({name,password});
        // return 'Added'
    }
    catch(err){
        console.log(err)
        return "Error"
    }
}

async function getUser(name,password){
    const db = await loginDB();
    const datacollection = db.collection("awscollection");
    try{
        const result =  datacollection.find({name,password}).toArray();
        console.log(result)
        if(result.length){
            return result
        }
        // return result
        if(result.length === 0) return null;
        return "Got that"
    }
    catch(err){
        console.log(err)
        return "Error"
    }
}


async function find(password){
    const db = await loginDB();
    const datacollection = db.collection("awscollection");
    try{
        const result =  await datacollection.findOne({ password:password }).toArray();
        return result
    }
    catch(err){
        console.log(err)
        return "Error"
    }
}


async function findid(id){
    console.log(id)
    const db = await loginDB();
    const datacollection = db.collection("awscollection");
    try{
        const result =  await datacollection.find({ _id: new mongodb.ObjectId(id)}).toArray();
        return result
    }
    catch(err){
        console.log(err)
        return "Error"
    }
}

async function addCompany({name,date,city,state,PinCode,gst,document,Imageurl}){
    const db = await loginDB();
    const datacollection = db.collection("awscompanydata");
    try{
        console.log(name,date,city,state,PinCode,gst,Imageurl)
        await datacollection.insertOne({name,date,city,state,PinCode,gst,document,Imageurl});
        return 'Added'
    }
    catch(err){
        console.log(err)
        return "Error"
    }
}

async function findVendor(gst){
    const db = await loginDB();
    const datacollection = db.collection("awscompanydata");
    try{
        const result =  await datacollection.findOne({ gst:gst })
        return result
    }
    catch(err){
        console.log(err)
        return "Error"
    }
}

async function upadateVendor(gst, body){
    const db = await loginDB();
    const datacollection = db.collection("awscompanydata");
    console.log(gst, body)
    try{
        const result =  await datacollection.updateOne( {gst}, {$set: body})
        return result
    }
    catch(err){
        console.log(err)
        return "Error"
    }
}

module.exports={add,find,addCompany,findVendor,upadateVendor,findid,getUser}