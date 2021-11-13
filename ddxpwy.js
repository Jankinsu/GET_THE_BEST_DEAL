/*
自动喂鱼

返回饲料数目
[task local]
17 21 * * * https://raw.githubusercontent.com/Jankinsu/GET_THE_BEST_DEAL/main/ddxpwy.js, tag=自动喂鱼, img-url=https://raw.githubusercontent.com/Jankinsu/GET_THE_BEST_DEAL/main/image/dingdong.png, enabled=true 

*/



//只需要把 ddwy 批量替换成你想取的名字
// 把  喂鱼  改成软件名  

const $ = new Env('叮咚喂鱼');
let status;

status = (status = ($.getval("ddwystatus") || "1")) > 1 ? `${status}` : "";

const ddwyurlArr = [], ddwyhdArr = [], ddwycount = ''


// 使用ddxpsum 的url和hd
let ddwyurl = $.getdata('ddxpsumurl')
$.log(ddwyurl)
let ddwyhd = $.getdata('ddxpsumhd')

let remain;
let uid = "";
let latitude = "";
let longitude = "";
let station_id = "";
// let baseSeed = {};
let seedId = "";
let propsId = "";
let seedId2 = "";
let propsId2 = "";



!(async () => {
    if (typeof $request !== "undefined") {

        ddwyck()

    } else {
        ddwyurlArr.push($.getdata('ddxpsumurl'))
        ddwyhdArr.push($.getdata('ddxpsumhd'))


        let ddwycount = ($.getval('ddwycount') || '1');

        for (let i = 2; i <= ddwycount; i++) {

            ddwyurlArr.push($.getdata(`ddwyurl${i}`))
            ddwyhdArr.push($.getdata(`ddwyhd${i}`))


        }

        console.log(
            `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ===============================================\n`);

        for (let i = 0; i < ddwyhdArr.length; i++) {

            if (ddwyhdArr[i]) {

                ddwyurl = ddwyurlArr[i];
                ddwyhd = ddwyhdArr[i];


                $.index = i + 1;
                console.log(`\n\n开始【叮咚喂鱼${$.index}】`)
				
				setp(ddwyurl);//设置若干参数
				await fwmm();
				await $.wait(1000);

                //循环运行
                for (let c = 0; c < 10; c++) {
                    $.index = c + 1
                    await ytwy()//你要执行的版块  
                    await $.wait(3000)//你要延迟的时间  1000=1秒

                }
            }
        }
    }
})()

    .catch((e) => $.logErr(e))
    .finally(() => $.done())



// 生成公共header
function pubheader(){
	
	return {"Accept": "*/*",
	"Accept-Encoding": "gzip, deflate, br",
	"Accept-Language": "en-us",
	"Connection": "keep-alive",
	"Cookie": ddwyhd,
	"Host": "farm.api.ddxq.mobi",
	"Origin": "https://game.m.ddxq.mobi",
	"Referer": "https://game.m.ddxq.mobi/index.html",
	"User-Agent": `Mozilla/5.0 (iPad; CPU OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 xzone/9.36.2 station_id/${station_id}`}
}



// 设置若干参数
function setp(ddwyurl){
	let s = ddwyurl.split('?');
	let ss = s[s.length-1].split('&');
	let info = {};
	for(let val of ss){
		k = val.split('=')[0];
		v = val.split('=')[1];
		info[k] = v;
	}
	uid = info['uid'];
	latitude = info['latitude'];
	longitude = info['longitude'];
	station_id = info['station_id'];	
}












//此脚本使用ddxpsum.js 的url和hd
function ddwyck() {
    if ($request.url.indexOf("此脚本无需获取ck") > -1) {
        const ddwyurl = $request.url
        if (ddwyurl) $.setdata(ddwyurl, `ddwyurl${status}`)
        $.log(ddwyurl)

        const ddwyhd = JSON.stringify($request.headers)
        if (ddwyhd) $.setdata(ddwyhd, `ddwyhd${status}`)
        $.log(ddwyhd)

        $.msg($.name, "", `教程${status}获取headers成功`)

    }
}

// 访问门面(userguide) ,获取鱼塘seedId
function fwmm(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
		let baseSeed = {};
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/userguide/detail?api_version=9.1.0&app_client_id=1&native_version=&app_version=9.39.0&latitude=${latitude}&longitude=${longitude}&gameId=1&guideCode=FISHPOND_NEW`,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					seedId = data["data"]["baseSeed"]["seedId"];
					propsId = data["data"]["feed"]["propsId"];
					console.log(`访问门面成功，seedId:${seedId}   propsId:${propsId}`);


                } else {
					console.log(`访问门面失败，${data.msg}`);


                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//鱼塘喂鱼
function ytwy(timeout = 0) {
    return new Promise((resolve) => {
		let remain;
		let headers = pubheader();
		

        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/props/feed?api_version=9.1.0&app_client_id=1&native_version=&app_version=9.39.0&latitude=${latitude}&longitude=${longitude}&gameId=1&propsId=${propsId}&seedId=${seedId}&cityCode=0101&feedPro=0&triggerMultiFeed=1`,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					remain = data.data.props.amount;
					console.log(`喂鱼一次成功，剩余数目：${remain},${data.data.msg}`);
					


                } else {
					console.log(`喂鱼失败，${data.msg}`)


                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


// 果园浇水
function gyjs(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: ``,
            headers: JSON.parse(ddwyhd),
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {


                } else {


                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}





//env模块    不要动  
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
