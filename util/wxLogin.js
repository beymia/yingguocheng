import {login, userSpace} from "@/request/api";
export default async function (data={confirm:function(){},cancel:function(){},showCancel:true}) {
				return new Promise((resolve,reject)=>{
					const APP = getApp().globalData
					uni.login({
					  provider: "weixin",
					  async success(wxCode) {
						try{
							APP.userToken = (await login({code: wxCode.code,})).data.token;
						}catch(e2){
							//TODO handle the exception
							uni.showModal({
								content: '您還沒有登錄，請先登錄',
								showCancel:data.showCancel,
								success: function (res) {
									if (res.confirm) {
										data.confirm()
									}else if (res.cancel) {
										data.cancel()
									}
									
								}
							});
							resolve(0)
						}
						uni.setStorageSync('token',APP.userToken)
						try{
							APP.userInfo = (await userSpace()).data
						}catch(e){
							//TODO handle the exception
							console.log(e)
						}
						resolve(1) 
					  },
					});
				})
				

}