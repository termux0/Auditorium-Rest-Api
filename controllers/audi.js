var mongoose = require('mongoose'),
 errors = require('restify-errors'),
 Audi = require('../models/audi'),
 Request = require('../models/request'),
 ObjectId = mongoose.Types.ObjectId;
 
exports.listAudi = function(req, res, next) {  
    Audi.apiQuery(req.params,function(err, audi) {
        if (err){
        return next(
				new errors.InternalServerError("Error occured: " + err) //500
			); 
        } else {
            if (audi) {
                //res.send({data :audi});
                res.json(audi);
            } else {
                res.json({message: "Audi Data not found"});
            }
        }
    });
};

exports.createAudi = function(req, res, next) {
    if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Requires 'Content-type: application/json'")
			);
	}
	if(!req.Admin){
        return next(
				new errors.UnauthorizedError("You are not admin")
			);
    }
    var audiModel = new Audi(req.body);
    audiModel.save(function(err, audi) {
        if (err){  
        return next(
				new errors.UnauthorizedError("Error occured: " + err) //500
			); 
        } else {
            res.json(audi);
        }
    });
};

exports.viewApproveRequest = function(req, res, next) {
    if (req.params.id.length != 24) {
			return next(
				new errors.InvalidContentError("Requires 'id' parameter")
			);
	}
    Request.find({ audi_id : req.params.id , approved : 1 } , function(err, audi) {
        if (err){
        return next(
				new errors.InternalServerError(err) //500
			); 
      } else {
            if (audi) {
                res.json(audi);
            } else {
                res.json({Message: "Audi Data not found"});
            }
        }
    });
};
 
exports.viewAudi = function(req, res, next) {
    if (req.params.id.length != 24) {
			return next(
				new errors.InvalidContentError("Requires 'id' parameter")
			);
	}
    Audi.findById(new ObjectId(req.params.id), function(err, audi) {
        if (err){
        return next(
				new errors.InternalServerError("Error occured: " + err) //500
			); 
        } else {
            if (audi) {
                res.json(audi);
            } else {
                res.json({Message: "Audi Data not found"});
            }
        }
    });
};

exports.updateAudi = function(req, res, next) {
    if (req.params.id.length != 24) {
			return next(
				new errors.InvalidContentError("Requires 'id' parameter")
			);
	}
    if (!req.is('application/json')) {
			return next(
				new errors.InvalidContentError("Requires 'Content-type: application/json'")
			);
	}
	if(!req.Admin){
        return next(
				new errors.UnauthorizedError("You are not admin")
			);
    }
    var updatedAudiModel = new Audi(req.body);
    Audi.findByIdAndUpdate(new ObjectId(req.params.id), updatedAudiModel, function(err, audi) {
        if (err){
        return next(
				new errors.InternalServerError("Error occured: " + err) //500
			); 
        } else {
            if (audi) {
                res.json(audi);
            } else {
                res.json({message : "Audi not found"});
            }
        }
    });
};
 
exports.deleteAudi = function(req, res, next) {
    if (req.params.id.length != 24) {
			return next(
				new errors.InvalidContentError("Requires 'id' parameter")
			);
	}
	if(!req.Admin){
        return next(
				new errors.UnauthorizedError("You are not admin")
			);
    }
    Audi.findByIdAndRemove(new Object(req.params.id), function(err, useless) {
        if (err){
        return next(
				new errors.InternalServerError("Error occured: " + err) //500
			); 
        }
         else {
            res.json({Message: "Audi deleted successfully"});
        }
    });
};