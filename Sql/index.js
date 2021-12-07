const express = require('express');
const app = express();
const sql = require("mssql");
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlConfig = require('./database/config');
const router = require('./router/router');
const sqlConfig1 = require('./database/config1')
const Port = 8080;


require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/api',router)

app.put('/UpdateVendor',async function (req,res) {
    const{tid,tadd,tcity,Tstate,Tpin,Tcountry,Tcontactperson,Tcontactno,temail,tpan,tcst} = req.body

    console.log(req.body)
    try{
      console.log('Tid +>',tid)
      console.log(`UPDATE tbl_transporter SET tadd='${tadd?tadd:''}',tcity='${tcity?tcity:''}',Tstate='${Tstate?Tstate:''}',Tpin='${Tpin?Tpin:''}',Tcountry='${Tcountry?Tcountry:''}',Tcontactperson='${Tcontactperson?Tcontactperson:''}',Tcontactno='${Tcontactno?Tcontactno:''}',temail='${temail?temail:''}',tpan='${tpan?tpan:''}',tcst='${tcst?tcst:''}'  WHERE Tid='${tid?tid:''}'`)
      const pool = new sql.ConnectionPool(sqlConfig);
      await pool.connect();
      const data = await pool.query(`UPDATE tbl_transporter SET tadd='${tadd?tadd:''}',tcity='${tcity?tcity:''}',Tstate='${Tstate?Tstate:''}',Tpin='${Tpin?Tpin:''}',Tcountry='${Tcountry?Tcountry:''}',Tcontactperson='${Tcontactperson?Tcontactperson:''}',Tcontactno='${Tcontactno?Tcontactno:''}',temail='${temail?temail:''}',tpan='${tpan?tpan:''}',tcst='${tcst?tcst:''}'  WHERE Tid='${tid?tid:''}'`)
      await pool.close()  
      res.send(`Data Updated`)
      
          }
    catch(err){
        console.log(`Error occured ${err}`)
    }
})

app.get('/Invoices', async function (req,res){
  try{
    const pool = new sql.ConnectionPool(sqlConfig1);
    await pool.connect();   
     const data =  await pool.query(`SELECT [INV_NO],[INV_DATE],[INV_AMT],[tds_amt] FROM FINS_PJ_DIRECT where AC_NAME='fedex' and company='awl'`)
    await pool.close()
     res.send(data.recordset)
    
  }
  catch(err){
    console.log(`The Error is ${err}`)
  }
})

app.get('/InvoicesOffset', async function (req,res){
  const pageNumber = req.query.pageNumber;
  const RowsPerPage = 10;
  try{
    const pool = new sql.ConnectionPool(sqlConfig1);
    await pool.connect();   
        const data =  await pool.query(`SELECT  [INV_NO],[INV_DATE],[INV_AMT],[tds_amt] FROM FINS_PJ_DIRECT where AC_NAME='fedex' and company='awl'
                                   ORDER by INV_DATE ASC OFFSET (${pageNumber}-1) * ${RowsPerPage} ROWS FETCH NEXT  ${RowsPerPage} ROWS ONLY `)
    const countData =  await pool.query(`select COUNT(*) as total_row FROM FINS_PJ_DIRECT where AC_NAME='fedex' and company='awl'`)
    await pool.close()
                              res.status(200).send({data:data.recordsets[0],pageNumber,Count:countData.recordset})

  }
    catch(err){
    console.log(`The Error is ${err}`)
  }
})

app.listen(Port, (err, req, res, next) => {
  if (err)
    console.log("Ouch! Something went wrong")
  console.log(`server listen on: ${Port}`)
})
