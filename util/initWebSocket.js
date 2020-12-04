
export default async function (self,callBack){
	var APP = getApp().globalData
	APP.socket && !function(){ APP.socket.close();APP.socket=null}()
	return new Promise((resolve,reject)=>{
		
		setTimeout( async ()=>{
			let conectCount =0
			let conected = false
			do{
				console.log(1)
				APP.socket = await uni.connectSocket({
					url:'ws://47.116.2.59:2000',
					complete(res) {
						console.log(res)
					}
				})
				console.log(2)
				let res
				try{
					res = await new Promise((resolve_c,reject_c)=>{
						
						APP.socket.onOpen(res=>{
							console.log('websocket连接已经打开')
							conected = true
							let data ={type:'accept'}
							APP.userInfo.id && (data.uid = APP.userInfo.id)
							APP.socket.send({
							          data: JSON.stringify(data),
							        });
							
							APP.socketTimer = setInterval(()=>{
								APP.socket.send({
								          data: JSON.stringify({type:'ping'}),
								        });
							},3000)
							resolve_c(APP.socket)
						})
						console.log(3)
						APP.socket.onError(function(){
							console.log('websocket连接打开失败')
							conected = false
							APP.socket.close()
							APP.socket = null
							reject_c(false)
						})
						
					})
					
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
					
				if(res){
					resolve(res)
				}else{
					conectCount++
				}	
				
				console.log(4)
			}while(!conected && conectCount<3)
			reject(false)
			
			
		},3000)
	})
	
}