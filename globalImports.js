const express = require("express");
const mongoose = require("mongoose");
const CustomerModel = require("./Models/Customers");
const OrderModel = require('./Models/Orders');

module.exports = {
  express,
  mongoose,
  CustomerModel,
  OrderModel
};
