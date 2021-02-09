'use strict'

const jwt = require('jsonwebtoken');
const moment=require('moment');
const SECRET_KEY = 'secretkey';

function createToken(user){

    const payload={
        id  : user._id,
        dni : user.perDni,
        iat : moment().unix(),
        exp : moment().add(1,'days').unix(),
      }

      return jwt.sign({ payload },SECRET_KEY);
};

module.exports = {createToken}
