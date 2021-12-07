const UserService = require('../service/service')

async function add(req, res) {
    const { name, password } = req.body;
    const result = await UserService.add({ name, password });
    res.send({ msg: result })
}

async function getUser(req, res) {
    const {name,password} = req.body;
    console.log(name,password);
    const result = await UserService.getUser({name,password});
    res.send({ msg: result });
}

async function find(req, res) {
    const id = req.query.id;
    const result = await UserService.find(id)
    res.send({ msg: result });
}

async function findid(req, res) {
    const id = req.query.id;
    const result = await UserService.findid(id)
    res.send({ msg: result });
}

async function addCompany(req, res) {
    const { name, date, city, state, PinCode, gst, document, Imageurl } = req.body;
    const result = await UserService.addCompany({ name, date, city, state, PinCode, gst, document, Imageurl });
    res.send({ msg: result })
}

async function findVendor(req, res) {
    const id = req.query.id;
    const result = await UserService.findVendor(id)
    res.send({ msg: result });
}

async function upadateVendor(req, res) {
    const id = req.query.id;
    const body = req.body;
    console.log(body)
    const result = await UserService.upadateVendor(id, body)
    res.send({ msg: result })
}

module.exports= {add,find,addCompany,findVendor,upadateVendor,findid,getUser }