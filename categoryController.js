const modelCat = require("../Model/categoryModel")

//export mara barka naamlouha

module.exports={
    create:function(req,res){
        const category = new modelCat(req.body); //esm bch yjina f mongodb hua cat
        category.save(req.body, function(err,item){
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
        });
    },
    getAll:function(req,res){ 
        modelCat.find({}).populate('subcategory').exec(function(err,item){ //populate nous aide bch naccediou lel les données fel back
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "list of category",
                    data: item,
                });
            };
        })
    },
    update:function(req,res){
        modelCat.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err,item){
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
    deletecategory: function(req,res){
        modelCat.findByIdAndDelete(req.params.id, function(err, item){
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
        } )
    },
    getbyId: function(req,res){
        modelCat.findById(req.params.id,function(err,item){
            if(err){
                res.status(404).json({
                    statut: 404,
                    message: "error " + err,
                    data: null,
                })
            } else {
                res.status(201).json({
                    status:201,
                    message: "list of category",
                    data: item,
                });
            };
        }) 
    }
};