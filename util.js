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

util.getPostQueryString = function (req, res, next) {  
    res.locals.getPostQueryString = function (isAppended=false, overwrites={}) {  
        var queryString = '';
        var queryArray = [];
        var page = overwrites.page?overwrites.page:(req.query.page?req.query.page:'');
        var limit = overwrites.limit?overwrites.limit:(req.query.limit?req.query.limit:'');
        var searchType = overwrites.searchType?overwrites.searchType:(req.query.searchType?req.query.searchType:'');
        var searchText = overwrites.searchText?overwrites.searchText:(req.query.searchText?req.query.searchText:'');
        
        if (page) {
            queryArray.push('page=' + page);
        }
        if (limit) {
            queryArray.push('limit=' + limit);
        }
        if(searchType){
            queryArray.push('searchType=' + searchType);
        }
        if(searchText){
            queryArray.push('searchText=' + searchText);
        }
        if (queryArray.length>0) {
            queryString = (isAppended?'&':'?') + queryArray.join('&');
        }
        return queryString;
    }
    next();
}

module.exports = util;