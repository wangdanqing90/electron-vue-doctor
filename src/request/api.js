
/**   
 * api接口统一管理
 */
import { get, post } from './http'
//现在，例如我们有这样一个接口，是一个post请求：http://www.baiodu.com/api/v1/users/my_address/address_edit_before
export const apiAddress = p => post('https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=13816946233', p);

export const apiget = () => get('/api/cc/json/mobile_tel_segment.htm?tel=13816946233');


