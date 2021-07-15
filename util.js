var util = {};

util.parseError = function (errors) {  
    var parsed = {};

    if(errors.name == 'ValidationError'){
        for(var name in errors.errors){
            var validationError = errors.errors[name];
            parsed[name] = { message:validationError.message };
        }
    }
    else if(errors.code == '11000' && errors.errmsg.indexOf('username') > 0){
        parsed.username = {message:'아이디가 이미 존재합니다.'};
    }
    else{
        parsed.unhandled = JSON.stringify(errors);
    }

    return parsed;
}

util.isLoggedin = function (req,res, next) {  
    if(req.isAuthenticated()){
        next();
    }
    else{
        req.flash('errors', {login:'로그인 해주세요'});
        res.redirect('/login');
    }
}

util.noPermission = function (req, res) {  
    req.flash('errors', {login:'접근이 거부되었습니다.'});
    req.logout();
    res.redirect('/login');
}

module.exports = util;