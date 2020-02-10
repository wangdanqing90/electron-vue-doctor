
/**   
 * api接口统一管理
 */
import { get, post } from './http'
export const apiAddress = p => post('https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=13816946233', p);

export const apiget = () => get('/api/cc/json/mobile_tel_segment.htm?tel=13816946233');
//登录
export const apiLogin = p => post('/api/login/', p);
//获取用户信息
export const apigetUserInfo = p => get('/api/user/info/?token='+p);
//获取手机验证码
export const apiPhoneCode = p => post('/api/phonecode/', p)

//验证手机验证码
export const apiVerifyCode = p => post('/api/verifycode/', p)
//修改密码
export const apiModifypassword = p => post('/api/modifypassword/', p)
//获取医院列表
export const apiHospitallist= () => get('/api/hospitallist/')
//获取医院列表
export const apiDepartment= p => get('/api/department/', p)

