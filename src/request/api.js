
/**   
 * api接口统一管理
 */
import { get, post,put,deletefun} from './http'
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
//获取科室列表
export const apiDepartment= p => get('/api/department/', p)
//获取医生列表
export const apiDoctorlist= p => get('/api/doctorlist/', p)
//医生注册
export const apiRegister= p => post('/api/register/', p)
//获取患者列表
export const apiPatientlist= (p) => get('/api/patientlist/?page='+p.page+'&limit='+p.limit+'&search='+p.search)
//获取医生信息
export const apiDoctorinfo= () => get('/api/doctorinfo/')
//修改医生信息
export const apichangeDoctorinfo= p => put('/api/doctorinfo/', p)
//获取患者信息
export const apiGetPatientinfo= (p) =>get('/api/patientinfo/?patientid='+p.patientid)
//新增患者
export const apiAddPatientinfo = p => post('/api/patientinfo/', p)
//修改患者
export const apiChangePatientinfo = p => put('/api/patientinfo/', p)
//审批患者通过申请
export const apiVerifypatient = p => put('/api/verifypatient/', p)
//删除患者
export const apiDeletepatient = p => deletefun('/api/patientinfo/', p)
//获取训练报告
export const apiReportinfo = (p) => get('/api/reportinfo/', p)


