
const BusinessModel = require("../models/business");
const mongoose = require('../db/db');

// Controller to create a new business
exports.createBusiness = async (req, res) => {
  try {
    // Get the data from the request body
    const { business, subBusinessList } = req.body;
    // console.log(business, subBusinessList)
    // Create a new instance of BusinessModel
    const newBusiness = new BusinessModel({
      name: business.name,
      subbusinesses: subBusinessList.map((subBusiness) => ({
        name: subBusiness.subbusinessName,
        buildings: subBusiness.buildingList.map((building) => ({
          name: building.buildingName,
          phone: building.phoneList.map((phone) => phone.buildingPhone),
          email: building.emailList.map((email) => email.buildingEmail),
          addressLine1: building.buildingAddress1,
          addressLine2: building.buildingAddress2,
          postal_code: building.buildingPostalCode,
          city: building.buildingCity,
          state: building.buildingState,
          country: building.buildingCountry,
        })),
      })),
    });

    // Save the newBusiness instance to the database
    await newBusiness.save();

    res.status(201).json({ message: 'Business created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the business' });
  }
};

// Controller to get a business by ID
exports.getBusinessById = async (req, res) => {
  try {
    const businessId = req.params.businessId;
    const business = await BusinessModel.findById(businessId);
    
    if (!business) {
      return res.status(404).json({ error: 'Business not found.' });
    }
    
    res.json(business);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the business.' });
  }
};

