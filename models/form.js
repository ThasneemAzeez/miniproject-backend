const express = require('express');
const Mongooose = require('mongoose');
const userSchema = Mongooose.Schema(
    {
        
        "image":{type:String,required:true}
    }
)

let formModel = Mongooose.model(events,userSchema);
module.exports=formModel
