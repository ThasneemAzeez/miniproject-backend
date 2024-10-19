const express = require('express');
const Mongooose = require('mongoose');
const userSchema = Mongooose.Schema(
    {
        "name":{type:String},
        "details":{type:String},
        "venue":{type:String},
        "date":{type:Date},
        "image":{type:String},
        "registrationlink":{type:String}
    }
)

let formModel = Mongooose.model("form",userSchema);
module.exports=formModel
