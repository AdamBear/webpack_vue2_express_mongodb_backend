/**
 * 计算月份
 */
const getMonth = (startTime, endTime) => {

	let start = new Date(startTime)
	let startYear = start.getFullYear()
	let startMonth = start.getMonth()
	let startDay = start.getDate()

	let end = new Date(endTime)
	let endYear = end.getFullYear()
	let endMonth = end.getMonth()
	let endDay = end.getDate()

	let February = startYear%4==0 ? 29 : 28
	let smonthDay = [31, February, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
			 // 月份 [1,  2,        3,  4,  5,  6,  7,  8,  9,  10, 11, 12]
	let month = 0
	
	// 同年
	if( startYear == endYear ){
		// 同月
		if( startMonth == endMonth ){
			month = Number( ( (endDay-startDay)/smonthDay[startMonth] ).toFixed(2) )
		}else{
		// 不同月
			// 中间的整月
			month = (endMonth-startMonth-1)
			// 补足第一月
			let shortDay = smonthDay[startMonth]-startDay
			if(  shortDay <= endDay ){
				month = month + 1 + Number( ( (endDay-shortDay)/smonthDay[endMonth] ).toFixed(2) )
			}else{
				month = month + 1 + Number( ( (smonthDay[endMonth-1]+endDay-shortDay)/smonthDay[endMonth-1] ).toFixed(2) )
			}
		}
	}else{
	// 不同年
		let February = endYear%4==0 ? 29 : 28
		let emonthDay = [31, February, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
		// 同月
		if( startMonth == endMonth ){
			
			if( endDay == startDay ){
			// 整12月
				month = (endYear-startYear)*12
			}else if( endDay > startDay ){
			// 满12月
				month = (endYear-startYear)*12 + Number( ( (endDay-startDay)/emonthDay[endMonth] ).toFixed(2) )
			}else{
			// 不足12月
				let shortDay = smonthDay[startMonth]-startDay
				//month = (endYear-startYear)*12-1 + Number( ( (30-startDay+endDay)/30 ).toFixed(2) )
				month = (endYear-startYear)*12-1 + Number( ( (emonthDay[endMonth-1]+endDay-shortDay)/emonthDay[endMonth-1] ).toFixed(2) )
			}
		}else if( endMonth > startMonth ){
		// 大于12月
			// 中间的整月
			month = (endYear-startYear)*12 + (endMonth-startMonth-1)
			// 补足第一月
			let shortDay = smonthDay[startMonth]-startDay
			if(  shortDay <= endDay ){
				month = month + 1 + Number( ( (endDay-shortDay)/emonthDay[endMonth] ).toFixed(2) )
			}else{
				month = month + 1 + Number( ( (emonthDay[endMonth-1]+endDay-shortDay)/emonthDay[endMonth-1] ).toFixed(2) )
			}
		}else{
		// 小于12月
			// 中间的整月
			month = (11-startMonth) + (endMonth)
			// 补足第一月
			let shortDay = smonthDay[startMonth]-startDay
			if(  shortDay <= endDay ){
				month = month + 1 + Number( ( (endDay-shortDay)/emonthDay[endMonth] ).toFixed(2) )
			}else{
				month = month + 1 + Number( ( (emonthDay[endMonth-1]+endDay-shortDay)/emonthDay[endMonth-1] ).toFixed(2) )
			}
		}
	}

	return month
}

module.exports = getMonth