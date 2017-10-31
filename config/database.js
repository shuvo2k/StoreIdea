if(process.env.NODE_ENV === 'production'){
	module.exports = {
		mongoURI: 'mongodb://shuvo2k:ms707473@ds243325.mlab.com:43325/store_idea'
	}
}else{
	module.exports = {
		mongoURI: 'mongodb://localhost/idea-dev'
	}
}