export const during = function(beginDate,endDate,type="String"){
	if(type.toLowerCase() == "string"){
		let bb = beginDate.split(':')
		let ee = endDate.split(':')
		bb.forEach(item=>{
			if(item.length<2){
				item = '0' + item
			}
		})
		ee.forEach(item=>{
			if(item.length<2){
				item = '0' + item
			}
		})
		let bbs = bb.join('')
		let ees = ee.join('')
		var cur = new Date()
		let cur_h = cur.getHours() < 10 ? '0' + cur.getHours() : cur.getHours()
		let cur_m = cur.getMinutes() < 10 ? '0' + cur.getMinutes() : cur.getMinutes()
		let cur_s = cur.getSeconds() < 10 ? '0' + cur.getSeconds() : cur.getSeconds()
		let curs = cur_h + cur_m + cur_s
		if(curs >= bbs && curs <= ees)return true
		return false
		
		
	}
}