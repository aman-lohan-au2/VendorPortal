const express = require('express');
const router = express.Router();

const UserController = require('../controller/controller')

const DocumentController = require ('../controller/fileUploader')

router.route('/login').post(UserController.add)

router.route('/loginuser').get(UserController.getUser)

router.route('/login').get(UserController.find)

router.route('/loginid').get(UserController.findid)

router.route('/data').post(UserController.addCompany)

router.route('/vendor').get(UserController.findVendor)

router.route('/Updatevendor').put(UserController.upadateVendor)

router.route('/documentupload').post(DocumentController.upload)

module.exports = router;