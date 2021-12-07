const sqlConfig = require('../database/config');
const jwt = require('jsonwebtoken');
const sql = require("mssql");

async function Vendordata(req,res){
  const {name,password} = req.body;
  console.log(name,password)
  try {
    await sql.connect(sqlConfig)
    if (!name || !password) {
      return res.status(401).json({
        message: !name ? `Please Enter Name` :  `Please Enter Password`
      })
    }
    const result = await sql.query(`select UID,uPWD,uName,CUST_ID,cust_name from User_Rights where CUST_ID='${name}' and uPWD='${password}'`);
    if(result.recordset[0]) {
      const token = jwt.sign({ name, password }, process.env.JWT_KEY, { expiresIn: 5 * 24 * 60 * 60 })
      res.status(200).send({
        status:"Success",
        token,
        ...result.recordset[0]
      })
    }else{
      res.status(401).send({
        status:"Fail"
      })
    }
  } catch (err) {
    console.log(`ERROR OCCURRED ${err}`)
  }
}

async function add(req, res) {
    const { Vandor_id, UserName, name, password } = req.body;
    try {
      await sql.connect(sqlConfig)
      const Duplicate = await sql.query(`select * from wp_test wt where Name='${name}'`);
      if (Duplicate) {
        res.send("Data Already")
      }
      else {
        await sql.query(`INSERT into wp_test (Vandor_id,Name,UserName,Password) Values('${Vandor_id}','${name}','${UserName}','${password}')`);
        res.send("Data Entered Successfully")
      }
    }
    catch (err) {
      console.log(`Error ocurred ${err}`)
    }
  }

  
  async function Vendorget(req,res) {
    const id = req.query.id;
    console.log(id)
    try {
      await sql.connect(sqlConfig)
      const result= await sql.query(`select tid,tname,tadd,tcity,Tstate,Tpin,Tcountry,Tcontactperson,Tcontactno,temail,tpan,tcst as GSTNO from tbl_transporter where Tid='${id}'`)
      if(result){
      res.send(result.recordset[0])
    }
    }
    catch (err) {
      console.log(`Error occured ${err}`)
    }
  }
  
  module.exports = {add,Vendordata,Vendorget}