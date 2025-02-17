const multer = require('multer')
const path = require('path') //path les images

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null, "storages") //storages hua el folder eli aamalneh jdid
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
}) 

//fonction upload eli bch nuploadiou menha images that are stocked in the folder storages
const upload = multer({
    storage: storage,
    limits:{fileSize: "10000000000"},
    fileFilter:(req,file,cb)=>{
        const fileTypes= /jpg|jpg|png|svg|pdf|gif/ //aarafna chnouma les types qu'on peut mettre
        const mimetype=fileTypes.test(file.mimetype) //verification du type de fichier ken mawjoud meli f start lfoukani wale
        const extname=fileTypes.test(path.extname(file.originalname))

        if(mimetype && extname) {
            return cb(null,true)
        }
        cb("erreur") //testana retour bch tnajem tetaada testi (teba3 js)
    }
})

module.exports = upload