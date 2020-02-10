
/**   
 * api接口统一管理
 */
import { get, post } from './http'
export const apiAddress = p => post('https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=13816946233', p);

export const apiget = () => get('/api/cc/json/mobile_tel_segment.htm?tel=13816946233');

export const apiLogin = p => post('/api/login/', p);
export const apigetUserInfo = p => get('/api/user/info/');


