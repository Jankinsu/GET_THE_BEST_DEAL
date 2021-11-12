

// 时间：2021/11/11

const $ = new Env('叮咚鱼塘整合');
let status;

status = (status = ($.getval("ddxpsumstatus") || "1")) > 1 ? `${status}` : "";

const ddxpsumurlArr = [], ddxpsumhdArr = [], ddxpsumcount = ''

let ddxpsumurl = $.getdata('ddxpsumurl')
let ddxpsumhd = $.getdata('ddxpsumhd')




!(async () => {
    if (typeof $request !== "undefined") {

        ddxpsumck()

    } else {
        ddxpsumurlArr.push($.getdata('ddxpsumurl'))
        ddxpsumhdArr.push($.getdata('ddxpsumhd'))


        let ddxpsumcount = ($.getval('ddxpsumcount') || '1');

        for (let i = 2; i <= ddxpsumcount; i++) {

            ddxpsumurlArr.push($.getdata(`ddxpsumurl${i}`))
            ddxpsumhdArr.push($.getdata(`ddxpsumhd${i}`))


        }

        console.log(
            `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ===============================================\n`);

        for (let i = 0; i < ddxpsumhdArr.length; i++) {

            if (ddxpsumhdArr[i]) {

                ddxpsumurl = ddxpsumurlArr[i];
                ddxpsumhd = ddxpsumhdArr[i];
				


                $.index = i + 1;
                console.log(`\n\n开始【叮咚鱼塘整合${$.index}】`)
				setp(ddxpsumurl);
				await rcqd()
				// 随机休息1-3秒
				await $.wait(1000*(1+ Math.round(2*Math.random())))
				await lxqd()
				await $.wait(1000*(1+ Math.round(2*Math.random())))
				await fdqd()
				await $.wait(1000*(1+ Math.round(2*Math.random())))
				await rcqd2()
				await $.wait(1000*(1+ Math.round(2*Math.random())))
				await lxqd2()
				await $.wait(1000*(1+ Math.round(2*Math.random())))
				await fdqd2()
				
				
				

                //循环运行喂鱼或者浇水
                for (let c = 0; c < 1; c++) {
                    $.index = c + 1


                    await bankuai()//你要执行的版块  
                    await $.wait(1000)//你要延迟的时间  1000=1秒




                }
            }
        }
    }
})()

    .catch((e) => $.logErr(e))
    .finally(() => $.done())


//获取ck
function ddxpsumck() {
    if ($request.url.indexOf("userguide/orchard") > -1) {
        const ddxpsumurl = $request.url
        if (ddxpsumurl) $.setdata(ddxpsumurl, `ddxpsumurl${status}`)
        $.log(ddxpsumurl)

        const ddxpsumhd = $request.headers.Cookie
        if (ddxpsumhd) $.setdata(ddxpsumhd, `ddxpsumhd${status}`)
        $.log(ddxpsumhd)
	/// $.log($request.headers)

        $.msg($.name, "", `叮咚鱼塘整合${status}获取headers成功`)

    }
}


uid = ""
latitude = ""
longitude = ""
station_id = ""
userTaskLogId1 = ""
userTaskLogId2 = ""



// 生成公共header
function pubheader(){
	
	return {"Accept": "*/*",
	"Accept-Encoding": "gzip, deflate, br",
	"Accept-Language": "en-us",
	"Connection": "keep-alive",
	"Cookie": ddxpsumhd,
	"Host": "farm.api.ddxq.mobi",
	"Origin": "https://game.m.ddxq.mobi",
	"Referer": "https://game.m.ddxq.mobi/index.html",
	"User-Agent": `Mozilla/5.0 (iPad; CPU OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 xzone/9.36.2 station_id/${station_id}`}
}



// 设置若干参数
function setp(ddxpsumurl){
	let s = ddxpsumurl.split('?');
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






//鱼塘日常签到
function rcqd(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/task/achieve?api_version=9.1.0&app_client_id=1&native_version=&app_version=9.39.0&latitude=${latitude}&longitude=${longitude}&gameId=1&taskCode=DAILY_SIGN`,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					console.log(`鱼塘日常签到成功`)
					console.log(`获得${data.data.rewards.amount}`)

                } else {
					console.log(`鱼塘日常签到失败,${data.msg}`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)		
    })
}





//鱼塘连续签到
function lxqd(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/task/achieve?api_version=9.1.0&app_client_id=1&native_version=&app_version=9.39.0&latitude=${latitude}&longitude=${longitude}&gameId=1&taskCode=CONTINUOUS_SIGN`,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					console.log(`鱼塘连续签到成功`)
					console.log(`获得${data.data.rewards.amount}`)

                } else {
					console.log(`鱼塘连续签到失败,${data.msg}`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)		
    })
}



// 鱼塘饭点签到
function fdqd(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/task/achieve?api_version=9.1.0&app_client_id=1&native_version=&latitude=${latitude}&longitude=${longitude}&gameId=1&taskCode=LOTTERY`,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					console.log(`鱼塘饭点签到成功`)
					console.log(`获得${data.data.rewards.amount}`)

                } else {
					console.log(`鱼塘饭点签到失败,${data.msg}`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)		
    })
}



// 鱼塘浏览商品
function llsp(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
		headers["Referer"] = "https://cms.api.ddxq.mobi/cms-service/client/page/v1/getPageInfo?uuid=8a367b8bd5d448dc&themeColor=72b1ff&hideShare=true&gameType=Farm&gameTask=BROWSE_GOODS&s=mine_farm_new&native_city_number=0101";
		headers["Origin"] = "https://cms.api.ddxq.mobi";
		headers["DDMC-GAME-TID"]="1";
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/task/achieve?api_version=9.28.0&app_client_id=3&native_version=9.39&city_number=0101&page_type=2&env=PE&latitude=${latitude}&longitude=${longitude}&gameId=1&taskCode=BROWSE_GOODS`,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					console.log(`鱼塘浏览商品成功`);
					console.log(`获得${data.data.userTaskLogId}`);
					userTaskLogId1 = data.data.userTaskLogId;

                } else {
					console.log(`鱼塘浏览商品失败,${data.msg}`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)		
    })
}



// 鱼塘收获奖励
function shjl(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/task/achieve?api_version=9.1.0&app_client_id=1&uid=${uid}&native_version=&latitude=${latitude}&longitude=${longitude}&gameId=1&userTaskLogId=` + userTaskLogId1, 
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					console.log(`连续签到成功`)
					console.log(`获得${data.data.rewards.amount}`)

                } else {
					console.log(`连续签到失败,${data.msg}`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)		
    })
}






// 果园签到
function rcqd2(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
		headers["Origin"] = "https://orchard-m.ddxq.mobi";
		headers["Referer"] = "https://orchard-m.ddxq.mobi/?is_nav_hide=true&isResetAudio=true&s=mine_orchard";
		headers["DDMC-GAME-TID"] = "2";
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/task/achieve?api_version=9.1.0&app_client_id=1&native_version=&uid=${uid}&latitude=${latitude}&longitude=${longitude}&taskCode=DAILY_SIGN`,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					console.log(`果园签到成功`)
					console.log(`获得${data.rewards.amount}`)

                } else {
					console.log(`果园签到失败,${data.msg}`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)		
    })
}



// 果园连续签到
function lxqd2(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
		headers["Origin"] = "https://orchard-m.ddxq.mobi";
		headers["Referer"] = "https://orchard-m.ddxq.mobi/?is_nav_hide=true&isResetAudio=true&s=mine_orchard";
		headers["DDMC-GAME-TID"] = "2";
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/task/achieve?api_version=9.1.0&app_client_id=1&native_version=&uid=${uid}&latitude=${latitude}&longitude=${longitude}&taskCode=CONTINUOUS_SIGN`,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					console.log(`果园连续签到成功`)
					console.log(`获得${data.rewards.amount}`)

                } else {
					console.log(`果园连续签到失败,${data.msg}`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)		
    })
}

// 果园饭点签到

function fdqd2(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
		headers["Origin"] = "https://orchard-m.ddxq.mobi";
		headers["Referer"] = "https://orchard-m.ddxq.mobi/?is_nav_hide=true&isResetAudio=true&s=mine_orchard";
		headers["DDMC-GAME-TID"] = "2";
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/task/achieve?api_version=9.1.0&app_client_id=1&native_version=&uid=${uid}&latitude=${latitude}&longitude=${longitude}&taskCode=LOTTERY`,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					console.log(`果园饭点签到成功`)
					console.log(`获得${data.rewards.amount}`)

                } else {
					console.log(`果园饭点签到失败,${data.msg}`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)		
    })
}

//果园浏览商品
function llsp2(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
		headers["Referer"] = "https://cms.api.ddxq.mobi/cms-service/client/page/v1/getPageInfo?uuid=e5029b59a37c48d7&themeColor=e7fbd6&hideShare=true&gameType=Farm&gameTask=BROWSE_GOODS&s=mine_orchard&native_city_number=0101";
		headers["Origin"] = "https://cms.api.ddxq.mobi";
		headers["DDMC-GAME-TID"]="2";
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/task/achieve?api_version=9.28.0&app_client_id=3&native_version=9.39&city_number=0101&page_type=2&env=PE&latitude=${latitude}&longitude=${longitude}&gameId=2&taskCode=BROWSE_GOODS`,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					console.log(`鱼塘浏览商品成功`);
					console.log(`获得${data.data.userTaskLogId}`);
					userTaskLogId1 = data.data.userTaskLogId;

                } else {
					console.log(`鱼塘浏览商品失败,${data.msg}`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)		
    })
}



// 果园收获奖励
function shjl2(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
		headers["Origin"] = "https://orchard-m.ddxq.mobi";
		headers["Referer"] = "https://orchard-m.ddxq.mobi/?is_nav_hide=true&isResetAudio=true&s=mine_orchard";
		headers["DDMC-GAME-TID"] = "2";
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/task/achieve?api_version=9.1.0&app_client_id=1&native_version=&uid=${uid}&latitude=${latitude}&longitude=${longitude}&userTaskLogId` + userTaskLogId2,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					console.log(`果园收获奖励成功`)
					console.log(`获得${data.data.rewards.amount}`)

                } else {
					console.log(`果园收获奖励失败,${data.msg}`)
					
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
