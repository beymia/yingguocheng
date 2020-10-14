export default function(){//已經登錄則返回token，沒有登錄去登錄或者返回false
	try {
	    const token = uni.getStorageSync('token');
	    if (!token) {
			uni.showModal({
			    content: '您還沒有登錄，請先登錄',
			    success: function (res) {
					if(res.confirm){
						uni.navigateTo({
							url:'/pages/addUserAdress/addUserAdress'
						})
					}
					if(res.cancel){
						
					}
			    }
			});
	        
	    }else{
			return token;
		}
		
	} catch (e) {
	    // error
	}
}