const express = require('express');
const router =  express.Router();

const VendorController = require('../controller/controller')
router.route('/details').post(VendorController.add)
router.route('/vendordetails').post(VendorController.Vendordata)
router.route('/trans').get(VendorController.Vendorget)

module.exports = router;
