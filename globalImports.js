const express = require("express");
const mongoose = require("mongoose");
const CustomerModel = require("./Models/Customers");

module.exports = {
  express,
  mongoose,
  CustomerModel
};
