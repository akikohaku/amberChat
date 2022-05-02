class kohakuchat {
    constructor(url) {
        this.url = url
        this.seq = 1
        this.funcMap = new Map()
        this.connectstatus="disconnected"
    }
    Connect() {
        var funcs = this.funcMap
        this.ws = new WebSocket(this.url)
        this.ws.onopen = function() {
            console.log("[kohakuchat]websocket已连接")
        }
        this.ws.onclose = function() {
            console.log("[kohakuchat]websocket已关闭")
            this.connectstatus="disconnected"
        }
        this.ws.onmessage = function(evt) {
            console.log(evt)
            var result = eval(evt).data
            if (eval(JSON.parse(result)).cmd === "recMsg") {
                console.log("[kohakuchat]收到消息")
            } else {
                var todo = funcs.get("" + eval(JSON.parse(result)).seq)
                todo(result)
                funcs.delete("" + eval(JSON.parse(result)).seq)
            }

        }
        this.ws.onerror = function(evt) {
            console.log("[kohakuchat]websocket异常 " + evt)
        }
        this.connectstatus="connected"
    }
    Send(message) {
        this.ws.send(message)
        console.log("[kohakuchat]发送数据" + message)
        this.seq = this.seq + 1
    }
    SetFunc(func) {
        this.funcMap.set("" + this.seq, func)
    }
    SendMsg(userId, msg, func) {
        var tosend = {
            seq: "" + this.seq,
            cmd: "msg",
            data: {
                UserId: userId,
                Type: "msg",
                Content: msg
            }
        }
        this.SetFunc(func)
        this.Send(JSON.stringify(tosend))
    }
    Login(userId, func) {
        var tosend = {
            seq: "" + this.seq,
            cmd: "login",
            data: {
                userId: userId
            }
        }
        this.SetFunc(func)
        this.Send(JSON.stringify(tosend))
    }
    GetConnectStatus(){
        return this.connectstatus
    }
	GetInstant(){
		return this
	}
}
export default new kohakuchat("ws://code.kohaku.xin:11731/ws");