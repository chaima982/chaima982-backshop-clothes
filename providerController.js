const providerMod = require('../Model/providerModel')
const nodemailer = require("nodemailer")
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "8b6c215cd0cee9",
        pass: "9d402087e42983"
    }
});
const bcrypt = require('bcrypt')

module.exports = {
    create: async(req, res) => {

        const salt = bcrypt.genSalt(10)
            // pw chyekhouha mel body , ykolna kadeh men caractere
        const hashPassword = await bcrypt.hashSync(req.body.password, parseInt(salt))

        const provide = new providerMod({
            ...req.body,
            password: hashPassword
        });
        //esm bch yjina f mongodb hua provide
        await provide.save(req.body, function(err, item) {
            if (err) {

                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                transport.sendMail({
                        from: '"Test Server" <test@example.com>',
                        to: req.body.email,
                        subject: "Email Test",
                        text: "welcome Mr" + req.body.username + "to e-commerce website",
                    }),

                    res.status(201).json({
                        status: 201,
                        message: "success",
                        data: item,

                    });
            };
        });
    },
    getAll: function(req, res) {
        providerMod.find({}).exec(function(err, item) {
            if (err) {
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "Providers",
                    data: item,
                });
            };
        })
    },
    update: function(req, res) {
        providerMod.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, item) {
            if (err) {
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "success",
                    data: item,
                });
            };
        })
    },
    delete: function(req, res) {
        providerMod.findByIdAndDelete(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "Deleted successfully",
                });
            };
        })
    },
    getId: function(req, res) {
        providerMod.findById(req.params.id, function(err, item) {
            if (err) {
                res.status(404).json({
                    status: 404,
                    message: "error" + err,
                    data: null
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "list of providers",
                    data: item
                })
            }
        })
    }
};