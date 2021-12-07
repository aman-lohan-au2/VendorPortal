const studentRepo = require('../repository/repo')

async function add(arr){
    const result = await studentRepo.add(arr);
    return result;
}

async function find(id){
    const result = await studentRepo.find(id);
    return result;
}

async function getUser(arr){
    const result = await studentRepo.getUser(arr);
    return result;
}

async function findid(id){
    console.log(id)
    const result = await studentRepo.findid(id);
    return result;
}

async function addCompany(arr){
    const result = await studentRepo.addCompany(arr);
    return result;
}

async function findVendor(id){
    const result = await studentRepo.findVendor(id);
    return result;
}
async function upadateVendor(id, body){
    const result = await studentRepo.upadateVendor(id, body);
    return result;
}
    

module.exports ={add,find,addCompany,findVendor,upadateVendor,findid,getUser}