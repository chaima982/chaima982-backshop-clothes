const prodmodel = require('../Model/productModel');

module.exports={
//: maaneha sinon
//? maaneha true
//kaadin najoutiou fel image
    create: function (req, res) {
        req.body["gallery"] =
          req.files.length <= 0 //maaneha m aadit hata image
            ? [] //nraj3ou table vide mtaa gallery f oudh undefined
            : req.files.map(function (file) {
                return { name: file.filename  }; //yraj3elna esm el taswira
            });
        const product = new prodmodel(req.body); //esm bch yjina f mongodb hua cat
        product.save(req.body, function (err, item) {
          if (err) {
            res.status(404).json({
              status: 404,
              message: "error " + err,
              data: null,
            });
          } else {
            res.status(201).json({
              status: 201,
              message: "success",
              data: item,
            });
          }
        });
      },
    getAll:function(req,res){ 
        prodmodel.find({}).exec(function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "list of Products",
                    data: item,
                });
            };
        })
    },
    update:function(req,res){
        prodmodel.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err,item){
            req.body["gallery"] =
          req.files.length <= 0
            ? req.files.filename //traj3elna el taswira elkdima
            : req.files.map(function (file) {
                return { name: file.filename  }; 
            });
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "success",
                    data: item,
                });
            };
        })
    },
    deleteprod: function(req,res){
        prodmodel.findByIdAndDelete(req.params.id, function(err, item){
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
                    data: item,
                });
            };
        })
    },
    getId : function(req,res){
        prodmodel.findById(req.params.id , function(err,item){
            if(err){
                res.status(404).json({
                    status:404,
                    message : "error" +err,
                    data : null,
                })
            } else {
                res.status(201).json({
                    status: 201,
                    message: "list of Products",
                    data: item
                })
            }
        })
    }
};