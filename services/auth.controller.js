
const tokenController= require('../services/token.controller');

const jwt = require('jsonwebtoken');
const moment=require('moment');
const SECRET_KEY = 'secretkey';

async function isAuth(req,res,next){

    try {
		if (!req.headers.authorization) {
			return res.status(401).send('Unauhtorized Request');
		}
        var token = req.headers.authorization.split(' ')[1];
    
		if (token === 'null') {
			return res.status(401).send('Unauhtorized Request');
        }
        
        token=token.replace(/['"]+/g, '');

		const payload = await jwt.verify(token, SECRET_KEY);
		if (!payload) {
            console.log("No hay payload");
			return res.status(401).send('Unauhtorized Request');
        }
        else{
            console.log(payload);
            console.log(moment().unix());

            req.userId = payload._id;
		    next();
        }


		
	} catch(e) {
	
		return res.status(401).send('Unauhtorized Request');
	}
}
module.exports=isAuth