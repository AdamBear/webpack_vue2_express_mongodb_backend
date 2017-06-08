const db = require('../../conf/db')

const removeRole = (req, callback) => {

	let name = req.body.name;
	if( !name ){
		callback({
			status: 0,
			msg: '参数错误'
		})
		return;
	}
	const role = db.get('t_role')
	role.findOne({ename: name}, '-_id').then((result) => {
		if( result ){
			result.flag = 0;
			role.update({ename: name}, result).then((result)=>{
				if( result ){
					callback({
						status: 1,
						msg: 'success'
					})
				}else{
					callback({
						status: 0,
						msg: '删除失败'
					})
				}
			}).then(() => db.close())
		}else{
			callback({
				status: 0,
				msg: '未找到该角色'
			})
		}
	})
	.catch((error) => {
		callback({
			status: 0,
			msg: error
		})
	})
}

module.exports = removeRole