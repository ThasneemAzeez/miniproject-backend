const express = require('express');
const Mongooose = require('mongoose');
const userSchema = Mongooose.Schema(
    {
        "name":{type:String,required:true},
        "details":{type:String,required:true},
        "venue":{type:String,required:true},
        "date":{type:Date,required:true},
        "image":{type:String},
        "registrationlink":{type:String,requierd:true}
    }
)

let formModel = Mongooose.model("form",userSchema);
module.exports=formModel
