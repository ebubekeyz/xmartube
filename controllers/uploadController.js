const {StatusCodes} = require('http-status-codes')
const CustomError = require('../errors')
const path = require('path')
const cloudinary = require('cloudinary').v2
const fs = require('fs')

const uploadVideoDesktop = async(req, res) => {
    if(!req.files){
        throw new CustomError.BadRequestError('No File uploaded')
    }

    let blogVideo = req.files.video

    if(!blogVideo.mimetype.startsWith('video')){
        throw new CustomError.BadRequestError('Please upload video')
    }

    console.log(blogVideo)
    const videoPath = path.join(__dirname, '../public/uploads/' + `${blogVideo.name}`)

    await blogVideo.mv(videoPath)
    res.status(StatusCodes.OK).json({video: {src: `/uploads/${blogVideo.name}`}})
    
    

}

const uploadImageCloud = async(req, res) => {
    console.log(req.files)
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, {
            use_filename: true, folder: 'xmartube',
        }
    )
    
    fs.unlinkSync(req.files.image.tempFilePath)
    return res.status(StatusCodes.OK).json({image: {src: result.secure_url}})
}


const uploadVideoCloud = async(req, res) => {
    console.log(req.files)
    const result = await cloudinary.uploader.upload(
        req.files.video.tempFilePath, {
            resource_type: 'video'
        }
    )
    
    fs.unlinkSync(req.files.video.tempFilePath)
    return res.status(StatusCodes.OK).json({video: {src: result.secure_url}})

  
}

module.exports = {
    uploadVideoCloud,
    uploadImageCloud,
    uploadVideoDesktop
}

