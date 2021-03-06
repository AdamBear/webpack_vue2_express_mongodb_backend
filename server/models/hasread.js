const async = require('async')
const db = require('../conf/db')

const hasread = (req, callback) => {

	const id = req.body.id
		  uid = req.session.user._id
	const notice = db.get('t_notice')

	if( !id || !uid ){
		callback({
			status: 0,
			msg: '参数错误'
		})
		return
	}
	
	async.eachSeries(id, function(item, cb){
		notice.findOne({_id: item}, '-_id')
		.then((result) => {
			if( result ){
				notice.update({_id: item},{
					userId: result.userId,
					content: result.content,
					haveRead: 1
				})
				.then((result) => {
					cb()
				})
			}else{ cb() }
		})
	},function(err, result){
		// 获取通知信息
		notice.find({userId: uid}, '-_id')
		.then((notices) => {
			if( notices && notices.length ){
				let n = notices.map(function(item){
					item.haveRead = 1
					return item
				})

				req.session.notice = n
			}
			callback({
				status: 1,
				msg: 'success'
			})
		})
		
	})
	
}

module.exports = hasread