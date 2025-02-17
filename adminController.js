const bcrypt = require('bcrypt')
const adminModel = require('../Model/adminModel');
 const nodemailer = require("nodemailer")
//les donnees de notre mail bch k ntestiou yabaath ghadi
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8b6c215cd0cee9",
      pass: "9d402087e42983"
    }
  });
const { randomBytes } = require("crypto");
module.exports={
    create: async(req, res) => {
        const salt = bcrypt.genSalt(10)
            // pw chyekhouha mel body
        const hashPassword = await bcrypt.hashSync(req.body.password, parseInt(salt))
        const admin = new adminModel({
            ...req.body,
            password: hashPassword,
            codeVerification: randomBytes(6).toString("hex"),
        });
        await admin.save(req.body, function(err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: err,
                    data: null
                })
            } else {
                transport.sendMail({
                        from: '"Test Server" <test@example.com>',
                        to: req.body.email,
                        subject: "Email Test",
                        text: "welcome Mr" + req.body.username + "to e-commerce website",
                        html: `click here to <a href="http://localhost:3000/users/verify/${item.codeVerification}">verify</a> to confirm`,
                    },
                    (err, info) => {
                        if (err) {
                            console.log(err);
                            return next(err);
                        }
                        console.log("Info: ", info);
                        res.json({
                            message: "Email successfully sent.",
                        });
                    }
                );
                res.status(201).json({
                    status: 201,
                    massage: "admin created successfully",
                    data: item
                })
            }
        })
    },
    gatAll : function(req,res){
        adminModel.find({}).exec(function(err,item){
            if (err){
                res.status(404).json({
                    status : 404,
                    message : "error" +err,
                    data : null
                })
            } else {
                res.status(201).json({
                    status : 201,
                    massage : "admin created successfully",
                    data : item
                })
            }
        })
    },
    update: function(req,res){
        adminModel.findByIdAndUpdate(req.params.id, req.id , {new : true} , function(err,item){
            if (err){
                res.status(404).json({
                    status : 404,
                    message : "error" +err,
                    data : null
                })
            } else {
                res.status(201).json({
                    status : 201,
                    massage : "admin updated successfully",
                    data : item
                })
            }
        })
    },
    delete : function(req,res){
        adminModel.findByIdAndDelete(req.params.id , function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "Deleted successfully",
                });
            };
        })
    },
    getbyId: function(req,res){
        adminModel.findById(req.params.id,function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "list of admin",
                    data: item,
                });
            };
        })
    }
}






