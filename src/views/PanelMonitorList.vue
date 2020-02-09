<template>
  <div class="dash-panel">
    <div class="caption">监控列表</div>
    <div class="context" style="margin-top: 25px;">
      <div class="list-caption">
        <el-row class="line-caption">
          <el-col :span="5">设备编号</el-col>
          <el-col :span="5">设备名称</el-col>
          <el-col :span="6">厂商名称</el-col>
          <el-col :span="3">监控状态</el-col>
          <el-col :span="5">监控</el-col>
        </el-row>
      </div>

      <div v-for="(item, index) in dataList" :key="index" class="list-box" style="height: 43px; line-height: 42px;">
        <div :class="index%2?'line-strip':''">
          <el-row class="line slide-left">
            <router-link :to="'/manufacturer/info/ddetail/' + item.id">
              <el-col :span="5">{{ item.serial }}</el-col>
              <el-col :span="5">{{ item.devicename }}</el-col>
              <el-col :span="6">{{ item.vendorname }}</el-col>
              <el-col :span="3" :class="[ item.status === 2 ? 'onlline':'offline' ]">
                <span class="dot" :class="[ item.status === 2 ? 'green-dot':'grey-dot' ]" />
                {{ formatStatus(item.status) }}
              </el-col>
            </router-link>
            <el-col v-if="item.camera && item.status === 2" :span="6" class="more" style="font-size: 14px;">
              <span @click="startRTC(item.id)"><i class="el-icon-location" /> 打开</span>
            </el-col>
            <!--
            <el-col :span="5" class="more" style="font-size: 14px;">
              <span @click="startRTC(4)"><i class="el-icon-location" /> TEST ONLY</span>
            </el-col>
            -->
          </el-row>
        </div>
      </div>
    </div>

    <div
      v-if="showVideo"
      v-loading="loading"
      v-draggable="draggableValue"
      :element-loading-text="loadingText"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="vid-div"
    >
      <div :ref="handleId">
        <div class="vid-close"><span @click="stopRTC"><i class="el-icon-circle-close" /></span></div>
        <div class="vid" style="margin: 0 auto;">
          <video id="rtcB" src="" width="480px" height="320px" style="padding: 20px;" autoplay muted playsinline />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import resize from './mixins/resize'
import { fetchDeviceMonitorList } from '@/api/device'
import { Draggable } from 'draggable-vue-directive'
import { mapGetters } from 'vuex'

export default {
  directives: {
    Draggable
  },
  mixins: [resize],
  props: {
    propdata: {
      type: Object,
      default: function() {
        return {}
      }
    },
    className: {
      type: String,
      default: 'PanelMonitorList'
    },
    id: {
      type: String,
      default: 'PanelMonitorList'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      sendMonitor: '',
      dataList: [],
      interval: null,

      handleId: 'handle-id',
      draggableValue: {
        handle: undefined
      },
      showVideo: false,
      loading: false,
      loadingText: '',
      rtcPeerConnection: null,
      dataChannel: null,
      pingTimes: {},
      pingLatency: {},
      isToPeer: false,
      isCall: false,
      localstream: null,

      uid: null,
      peer: null,

      peerConn: null,
      offerOption: {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
      }
    }
  },

  computed: {
    ...mapGetters([
      'roles',
      'websock',
      'wsmsg',
      'vendorid'
    ])
  },
  watch: {
    wsmsg: {
      handler(newVal, oldVal) {
        this.handleWsMsg(newVal.data)
        oldVal = null
      },
      immidiate: true,
      deep: true
    }
  },

  mounted() {
    this.draggableValue.handle = this.$refs[this.handleId]
    this.uid = this.vendorid
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  },
  Destroy() {

  },
  created() {
    this.preview = this.propdata.preview

    if (!this.preview) {
      this.interval = setInterval(() => {
        this.getMonitorList()
      }, 30000)

      this.getMonitorList()
    }
  },
  methods: {
    getMonitorList() {
      fetchDeviceMonitorList().then(response => {
        this.dataList = response.data.items
      })
    },

    formatStatus: function(val) {
      return val === 2 ? '在线' : '离线'
    },

    onIceCandidate(event) {
      if (event && event.candidate) {
        this.websock.send(
          JSON.stringify({
            type: 'candidate',
            peer: parseInt(this.peer),
            candidate: event.candidate.candidate,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
            sdpMid: event.candidate.sdpMid
          })
        )
      }
    },

    onOfferCreated(description) {
      var desc = JSON.stringify(description)
      desc = JSON.parse(desc)
      desc.peer = parseInt(this.peer)
      desc = JSON.stringify(desc)
      this.peerConn.setLocalDescription(description)
      this.websock.send(desc)
    },

    async createOffer() { // 创建并发送 offer
      try {
        // 创建offer
        const offer = await this.peerConn.createOffer(this.offerOption)
        // 呼叫端设置本地 offer 描述
        await this.peerConn.setLocalDescription(offer)
        // 给对方发送 offer
        this.onOfferCreated(offer)
      } catch (e) {
        console.log('createOffer: ', e)
      }
    },

    async createP2P(data) {
      this.loading = true
      this.loadingText = '正在建立通话连接...'
      await this.createMedia(data)
    },

    async createMedia(data) {
      // 保存本地流到全局
      try {
        /*
        this.localstream = await navigator.mediaDevices.getUserMedia({ audio: false, video: false })
        const video = document.querySelector('#rtcA')
        video.srcObject = this.localstream
        */
      } catch (e) {
        console.log('getUserMedia: ', e)
      }
      this.initPeer(data) // 获取到媒体流后，调用函数初始化 RTCPeerConnection
    },

    async onOffer(data) { // 接收offer并发送 answer
      try {
        // 接收端设置远程 offer 描述
        await this.peerConn.setRemoteDescription(data)
        // 接收端创建 answer
        const answer = await this.peer.createAnswer()
        // 接收端设置本地 answer 描述
        await this.peerConn.setLocalDescription(answer)
        // 给对方发送 answer
        var cmd = {
          'type': 'answer',
          'peer': parseInt(this.peer),
          'sdp': answer.sdp
        }
        this.websock.send(JSON.stringify(cmd))
      } catch (e) {
        console.log('onOffer: ', e)
      }
    },

    async onIce(data) { // 接收 ICE 候选
      try {
        await this.peerConn.addIceCandidate(data.sdp) // 设置远程 ICE
      } catch (e) {
        console.log('onIce: ', e)
      }
    },

    async onAnswer(data) { // 接收answer
      try {
        await this.peerConn.setRemoteDescription(data) // 呼叫端设置远程 answer 描述
      } catch (e) {
        console.log('onAnswer: ', e)
      }
    },

    initPeer(data) {
      // 创建输出端 PeerConnection
      const config = {
        iceServers: [
          { urls: 'stun:stun4.l.google.com:19302' },
          { urls: 'stun:47.103.100.2:3478' },
          {
            urls: 'turn:47.103.100.2:3478',
            username: 'demo',
            credential: 'demo'
          }
        ]
      }
      var pcOptions = {
        optional: [{ DtlsSrtpKeyAgreement: false }]
      }
      const PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
      this.peerConn = new PeerConnection(config, pcOptions) // new PeerConnection();

      /*
      for (const track of this.localstream.getTracks()) {
        this.peerConn.addTrack(track)
      }
      */

      // 监听ICE候选信息 如果收集到，就发送给对方
      this.peerConn.onicecandidate = this.onIceCandidate

      this.peerConn.ontrack = (event) => { // 监听是否有媒体流接入，如果有就赋值给 rtcB 的 src
        this.isToPeer = true
        this.loading = false
        const video = document.querySelector('#rtcB')
        video.srcObject = event.streams[0]
      }
    },

    handleWsMsg(data) {
      const msg = JSON.parse(data)
      switch (msg.type) {
        case 'answer':
          this.onAnswer(msg)
          break

        case 'reqvideo' : // 收到请求， 直接同意, 需要修改
          this.$confirm(msg.peer + ' 向你请求视频通话, 是否同意?', '提示', {
            confirmButtonText: '同意',
            cancelButtonText: '拒绝',
            type: 'warning'
          }).then(async() => {
            // await this.createP2P(data); // 同意之后创建自己的 peer 等待对方的 offer
            // this.isCall = data.self;
            await this.createP2P(msg) // 同意之后创建自己的 peer 等待对方的 offer
            // 通知对方
            var cmd = {
              'type': 'repvideo',
              'ret': 'OK',
              'uid': parseInt(this.uid),
              'monitor': true,
              'peer': parseInt(this.peer)
            }
            this.websock.send(JSON.stringify(cmd))
            // this.reply(data.self, '1');
          }).catch(() => {
            var cmd = {
              'type': 'repvideo',
              'ret': 'Reject',
              'uid': parseInt(this.uid),
              'monitor': true,
              'peer': parseInt(this.peer)
            }
            this.websock.send(JSON.stringify(cmd))
            // this.reply(data.self, '2');
          })
          break

        case 'offer': // 接收到 offer
          this.onOffer(msg)
          break

        case 'repvideo': // 收到回复
          console.log(msg)
          if (msg.ret === 'OK') { // 同意
            // 对方同意之后创建自己的 peer
            // console.log('repvideo ok')
            // await this.createP2P(msg)
            // 并给对方发送 offer
            // this.createOffer(msg)
            this.initAndSendOffer(msg)
          } else if (msg.ret === 'reject') { // 拒绝
            this.loading = false
            this.$message.error('对方已拒绝')
            this.isToPeer = false
            this.isCall = false
            this.showVideo = false
          } else if (msg.ret === 'nofound') { // 拒绝
            this.loading = false
            this.$message.error('设备不在线')
            this.isToPeer = false
            this.isCall = false
            this.showVideo = false
          } else if (msg.ret === 'busy') { // 拒绝
            this.loading = false
            this.$message.error('设备忙线中, 请稍后再试')
            this.isToPeer = false
            this.isCall = false
            this.showVideo = false
          } else {
            alert('其他错误')
          }
          break
      }
    },

    async initAndSendOffer(msg) {
      await this.createP2P(msg)
      // 并给对方发送 offer
      this.createOffer(msg)
    },

    hangup() {
      if (this.peerConn) {
        this.peerConn.close()
        this.peerConn = null
      }
      var cmd = {
        'type': 'leave',
        'peer': parseInt(this.peer)
      }
      this.websock.send(JSON.stringify(cmd))
      if (this.peerConn != null) {
        this.peerConn.close()
        this.peerConn = null
        this.localstream = null
      }
    },

    async apply() {
      var cmd = {
        'type': 'reqvideo',
        'uid': parseInt(this.uid),
        'monitor': true,
        'peer': parseInt(this.peer)
      }
      // 发起请求
      this.websock.send(JSON.stringify(cmd))
    },

    startRTC(id) {
      this.peer = id
      this.loading = true
      this.loadingText = '正在连接中...'
      this.showVideo = true
      if (!this.uid || !this.peer) return false
      this.apply()
    },

    stopRTC(id) {
      this.showVideo = false
      this.hangup()
    }

  }
}
</script>
<style lang="scss" scoped>
@keyframes slide-left {
  from {
    margin-left: 100%;
    width: 200%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}

.onlline {
  color: #00fbff;
}

.green-dot {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  display: inline-block;
  background: #00fbff;
}

.grey-dot {
  width: 6px;
  height: 6px;
  border-radius: 3px;
  display: inline-block;
  background: #BBB;
}

.offline {
  color: #BBB;
}

.more-device {
  width: 100%;
  height: 32px;
  background: #2f365a;
  text-align: center;
}

div.slide-left {
  animation: slide-left 2s;
}

.slide-left {
  width: 100%;
  overflow: hidden;
  animation: slide-left 2s;
}

@keyframes slide-left {
  from {
    margin-left: 100%;
    width: 200%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}

</style>
