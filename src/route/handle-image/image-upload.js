import express from "express";
import { body } from "express-validator";
import { singleUploadCtrl } from "../../utils/singleUploadCtrl.js";
const updateImageRouter  = express.Router();

import path from 'path';//to convert req.file from buffer bytes to base64 string
import DatauriParser from 'datauri';
// import DatauriParser from 'datauri/parser';
const parser = new DatauriParser();
const formatBufferTo64 = file =>
  // parser.format(path.extname(path.file.originalname).toString(), file.buffer)
  parser.format(path.extname(file.originalname).toString(), file.buffer)

import cloudinary from 'cloudinary';


cloudinary.config({
  cloud_name: 'dtobvfgky',
  api_key: '897966173618853',
  api_secret: 'ZQBjYP480zteTVipyOm-eZ9R-4I'
})

const cloudinaryUpload = file => cloudinary.uploader.upload(file);


updateImageRouter.post('/api/image-upload',singleUploadCtrl,async(req, res) => {
    try {
        if (!req.file) { throw new Error('Image is not presented!'); }
        console.log(req.file);
        //const file64 = req.file.toString('base64');
        //const file64=imageToBase64(req.file)
        //let buff = new Buffer(req.file, 'base64');
        // console.log(buff)
        // let base64 = buff.toString('ascii');
        // const file64=req.file.toString('base64')
       // const file64 = formatBufferTo64(req.file);
        console.log(file64);
        const uploadResult = await cloudinaryUpload(file64.content);
       console.log(uploadResult.public_id)
        return res.json({cloudinaryId: uploadResult.public_id, url: uploadResult.secure_url});
      } catch(e) {
        return res.status(422).send({message: e.message})
      }
    })
  export {updateImageRouter}