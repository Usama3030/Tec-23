const BuildingModel = require("../models/building");
const mongoose = require('../db/db');

//Create APi

exports.createBuilding = async (req, res) =>{
    try{
        buildingData = req.body;
        const newBuilding = new BuildingModel(buildingData);
        await newBuilding.save();
        res.status(201).json({ message: 'Building added Successfully.', building: newBuilding });
    }catch (error) {
        res.status(500).json({ error: 'An Error Created While Inserting Building data.'});
    }
};  

//Get Api

exports.getBuildingById = async (req, res) =>{
    try{
        const buildingId = req.params.buildingId;
        const building = await BuildingModel.findById(buildingId);
         
        if(!building){
            return res.status(401).json({error: 'Building not found' });
        }

        res.json(building);
    }catch (error) {
        res.status(500).json({error: 'An Error while fetching Buildings.' });
    }
};
 