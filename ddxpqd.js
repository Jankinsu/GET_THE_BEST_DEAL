/*

17 7 * * * https://raw.githubusercontent.com/Jankinsu/GET_THE_BEST_DEAL/main/ddxpqd.js, tag=签到领积分, img-url=https://raw.githubusercontent.com/Jankinsu/GET_THE_BEST_DEAL/main/image/dingdong.png, enabled=true


*/



//只需要把 ddxpsum 批量替换成你想取的名字
// 把  签到领积分  改成软件名

const $ = new Env('签到领积分');
let status;

status = (status = ($.getval("ddxpsumstatus") || "1")) > 1 ? `${status}` : "";

const ddxpsumurlArr = [],
  ddxpsumhdArr = [],
//  ddxpsumbodyArr = [],
  ddxpsumcount = ''

let ddxpsumurl = $.getdata('ddxpsumurl')
let ddxpsumhd = $.getdata('ddxpsumhd')
//let ddxpsumbody = $.getdata('ddxpsumbody')


let uid = "";
let latitude = "";
let longitude = "";
let station_id = "";
let userTaskLogId1 = "";
let userTaskLogId1 = "";
let userTaskLogId_receive = "";
let userTaskLogId_luckyDraw = "";
let uuid_gy;
let uuid_yt;

  !(async () => {
    if (typeof $request !== "undefined") {

      ddxpsumck()

    } else {
      ddxpsumurlArr.push($.getdata('ddxpsumurl'))
      ddxpsumhdArr.push($.getdata('ddxpsumhd'))
//      ddxpsumbodyArr.push($.getdata('ddxpsumbody'))

      let ddxpsumcount = ($.getval('ddxpsumcount') || '1');

      for (let i = 2; i <= ddxpsumcount; i++) {

        ddxpsumurlArr.push($.getdata(`ddxpsumurl${i}`))
        ddxpsumhdArr.push($.getdata(`ddxpsumhd${i}`))
//        ddxpsumbodyArr.push($.getdata(`ddxpsumbody${i}`))

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
//          ddxpsumbody = ddxpsumbodyArr[i];

          $.index = i + 1;
          console.log(`\n\n开始【签到领积分${$.index}】`)


          //循环运行
          for (let c = 0; c < 1; c++) {
            $.index = c + 1
            //设置参数
            setp(ddxpsumurl);
            // 签到领积分
            await ddxpqd();
            await $.wait(1000*(1+ Math.round(2*Math.random()))) ;
            // 获取task receive 和 lucky draw id
            await TaskId();
            await $.wait(1000*(1+ Math.round(2*Math.random())));
            // 翻牌
            await ddxpfp();
            await $.wait(1000*(1+ Math.round(2*Math.random())));
            // 领取下单任务
            await ddxplqxd();
            await $.wait(1000*(1+ Math.round(2*Math.random())));
            // 翻牌领赏
            await ddxpfpls();
            await $.wait(1000*(1+ Math.round(2*Math.random())));
            // 鱼塘浏览
            await llsp();
            await $.wait(1000*(1+ Math.round(2*Math.random())));
            await $.wait(30000);
            // 收获鱼塘浏览奖励
            await shjl();


          }
        }
      }
    }
  })()

  .catch((e) => $.logErr(e))
  .finally(() => $.done())


//使用ddxpsum 的ck
function ddxpsumck() {
  if ($request.url.indexOf("不用管") > -1) {
    const ddxpsumurl = $request.url
    if (ddxpsumurl) $.setdata(ddxpsumurl, `ddxpsumurl${status}`)
    $.log(ddxpsumurl)

    const ddxpsumhd = JSON.stringify($request.headers)
    if (ddxpsumhd) $.setdata(ddxpsumhd, `ddxpsumhd${status}`)
    $.log(ddxpsumhd)

    const ddxpsumbody = $request.body
    if (ddxpsumbody) $.setdata(ddxpsumbody, `ddxpsumbody${status}`)
    $.log(ddxpsumbody)

    $.msg($.name, "", `签到领积分${status}获取headers成功`)

  }
}


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



//功能 1
//签到领积分
function ddxpqd(timeout = 0) {
  return new Promise((resolve) => {
    headers = pubheader();
    headers["Host"] = "sunquan.api.ddxq.mobi";
    headers["Origin"] = "https://activity.m.ddxq.mobi";
    headers["Referer"] = "https://activity.m.ddxq.mobi";
    headers["Content-Length"] = 166;


    let url = {
      url: `https://sunquan.api.ddxq.mobi/api/v2/user/signin/`,
      headers: headers,
      body:{
                api_version: "9.7.3",
                app_version: "1.0.0",
                app_client_id: 3,
                native_version: "9.39.0",
                city_number: 0101,
                latitude: latitude,
                longitude: longitude,
            },
    }
    $.post(url, async (err, resp, data) => {
      try {

        data = JSON.parse(data)

        if (data.success) {
          console.log(`签到成功，获得积分数目：${data.data.point}`);
          console.log(`获得ticket_money : ${data.data.ticket_money}`);


        } else {
          console.log(`签到失败， ${data.msg}`);



        }
      } catch (e) {

      } finally {

        resolve()
      }
    }, timeout)
  })
}


// 访问task list
function TaskId(timeout = 0) {
  return new Promise((resolve) => {
    let link,paras;
    let headers = pubheader()
    let url = {
      url: `https://farm.api.ddxq.mobi/api/v2/task/list?api_version=9.1.0&app_client_id=1&native_version=&app_version=9.39.0&latitude=${latitude}&longitude=${longitude}&gameId=1&cityCode=0101`,
      headers: headers,
    }

    $.get(url, async (err, resp, data) => {
      try {

        data = JSON.parse(data)

        if (data.code == 0) {
          userTaskLogId_luckyDraw = data.data.userTasks[8].taskCode;
          userTaskLogId_receive = data.data.userTasks[0].userTaskLogId;
          link = data.data.userTasks[1].cmsLink;
          paras = link.search.slice(1,-1).split("&")
          for(para of paras){
            if (para.split("=")[0] == "uuid"){uuid_yt = para.split("=")[1];break};
          }
          console.log(`访问taskid成功，获得receive_task_id:${userTaskLogId_receive}   luckyDrawId:${userTaskLogId_luckyDraw}`);
          console.log(`browse_user_id uuid获取成功:${uuid_yt}`);


        } else {
          console.log(`访问taskid失败，${data.msg}`);


        }
      } catch (e) {

      } finally {

        resolve()
      }
    }, timeout)
  })
}

// 功能 2
// 翻翻牌
function ddxpfp(timeout = 0) {
  return new Promise((resolve) => {
    headers = pubheader();
    headers["Origin"] = "https://activity.m.ddxq.mobi";
    headers["Referer"] = "https://activity.m.ddxq.mobi";
    headers["DDMC-GAME-TID"] = 1;

    let url = {
      url: `https://farm.api.ddxq.mobi/api/v2/lucky-draw-activity/draw?api_version=9.7.3&app_version=1.0.0&app_client_id=3&native_version=9.39.0&city_number=0101&latitude=${latitude}&longitude=${longitude}&gameId=1`,
      headers: headers,
      body:{
                api_version: "9.7.3",
                app_version: "1.0.0",
                app_client_id: 3,
                native_version: "9.39.0",
                city_number: 0101,
                latitude: latitude,
                longitude: longitude,
            },
    }
    $.get(url, async (err, resp, data) => {
      try {

        data = JSON.parse(data)

        if (data.success) {
          console.log(`${data.msg}, ${data.data.msg}, ${data.data.chosen.rewardText}`);


        } else {
          console.log(`翻牌失败， ${data.msg}`);

        }
      } catch (e) {

      } finally {

        resolve()
      }
    }, timeout)
  })
}

// 功能 3
// 翻牌领赏
function ddxpfpls(timeout = 0) {
  return new Promise((resolve) => {
    let headers = pubheader()
    let url = {
      url: `https://farm.api.ddxq.mobi/api/v2/task/reward?api_version=9.1.0&app_client_id=1&native_version=&app_version=9.39.0&latitude=${latitude}&longitude=${longitude}&gameId=1&userTaskLogId=${userTaskLogId_luckyDraw}`,
      headers: headers,
    }

    $.get(url, async (err, resp, data) => {
      try {

        data = JSON.parse(data)

        if (data.code == 0) {
          console.log(`翻牌领赏成功，领赏数目:${data.data.rewards[0].amount}`);


        } else {
          console.log(`翻牌领赏失败，${data.msg}`);


        }
      } catch (e) {

      } finally {

        resolve()
      }
    }, timeout)
  })
}

// 功能 4
// 领取下单任务
function ddxplqxd(timeout = 0) {
  return new Promise((resolve) => {
    let headers = pubheader()
    let url = {
      url: `https://farm.api.ddxq.mobi/api/v2/task/receive?api_version=9.1.0&app_client_id=1&native_version=&app_version=9.39.0&latitude=${latitude}&longitude=${longitude}&gameId=1&taskCode=ANY_ORDER`,
      headers: headers,
    }

    $.get(url, async (err, resp, data) => {
      try {

        data = JSON.parse(data)

        if (data.code == 0) {
          console.log(`领取下单任务成功，userTaskLogId:${data.data.userTaskLogId}`);


        } else {
          console.log(`领取下单任务失败，${data.msg}`);


        }
      } catch (e) {

      } finally {

        resolve()
      }
    }, timeout)
  })
}

// 功能 5
// 鱼塘浏览商品
function llsp(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
		headers["Referer"] = `https://cms.api.ddxq.mobi/cms-service/client/page/v1/getPageInfo?uuid=${uuid_yt}&themeColor=72b1ff&hideShare=true&gameType=Farm&gameTask=BROWSE_GOODS&s=mine_farm_new&native_city_number=0101`;
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


// 功能6
// 鱼塘浏览收获
function shjl(timeout = 0) {
    return new Promise((resolve) => {
		let headers = pubheader()
        let url = {
            url: `https://farm.api.ddxq.mobi/api/v2/task/reward?api_version=9.1.0&app_client_id=1&uid=${uid}&native_version=&latitude=${latitude}&longitude=${longitude}&gameId=1&userTaskLogId=` + userTaskLogId1,
            headers: headers,
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {
					console.log(`鱼塘收获奖励成功`)
					console.log(`获得${data.data.rewards[0].amount}`)

                } else {
					console.log(`鱼塘收获奖励失败,${data.msg}`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}






// 环境模块，支持多账号
//env模块    不要动
function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t
    }
    send(t, e = "GET") {
      t = "string" == typeof t ? {
        url: t
      } : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s)
        })
      })
    }
    get(t) {
      return this.send.call(this.env, t)
    }
    post(t) {
      return this.send.call(this.env, t, "POST")
    }
  }
  return new class {
    constructor(t, e) {
      this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
    }
    isNode() {
      return "undefined" != typeof module && !!module.exports
    }
    isQuanX() {
      return "undefined" != typeof $task
    }
    isSurge() {
      return "undefined" != typeof $httpClient && "undefined" == typeof $loon
    }
    isLoon() {
      return "undefined" != typeof $loon
    }
    toObj(t, e = null) {
      try {
        return JSON.parse(t)
      } catch {
        return e
      }
    }
    toStr(t, e = null) {
      try {
        return JSON.stringify(t)
      } catch {
        return e
      }
    }
    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) try {
        s = JSON.parse(this.getdata(t))
      } catch {}
      return s
    }
    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e)
      } catch {
        return !1
      }
    }
    getScript(t) {
      return new Promise(e => {
        this.get({
          url: t
        }, (t, s, i) => e(i))
      })
    }
    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"), a = {
          url: `http://${h}/v1/scripting/evaluate`,
          body: {
            script_text: t,
            mock_type: "cron",
            timeout: r
          },
          headers: {
            "X-Key": o,
            Accept: "*/*"
          }
        };
        this.post(a, (t, e, i) => s(i))
      }).catch(t => this.logErr(t))
    }
    loaddata() {
      if (!this.isNode()) return {}; {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e);
        if (!s && !i) return {}; {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i))
          } catch (t) {
            return {}
          }
        }
      }
    }
    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile),
          e = this.path.resolve(process.cwd(), this.dataFile),
          s = this.fs.existsSync(t),
          i = !s && this.fs.existsSync(e),
          r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
      }
    }
    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i)
        if (r = Object(r)[t], void 0 === r) return s;
      return r
    }
    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
    }
    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e
        } catch (t) {
          e = ""
        }
      }
      return e
    }
    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
        }
      } else s = this.setval(t, e);
      return s
    }
    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
    }
    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
    }
    initGotEnv(t) {
      this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
    }
    get(t, e = (() => {})) {
      t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
        try {
          if (t.headers["set-cookie"]) {
            const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
            this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
          }
        } catch (t) {
          this.logErr(t)
        }
      }).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => {
        const {
          message: s,
          response: i
        } = t;
        e(s, i, i && i.body)
      }))
    }
    post(t, e = (() => {})) {
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
        "X-Surge-Skip-Scripting": !1
      })), $httpClient.post(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      });
      else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
        hints: !1
      })), $task.fetch(t).then(t => {
        const {
          statusCode: s,
          statusCode: i,
          headers: r,
          body: o
        } = t;
        e(null, {
          status: s,
          statusCode: i,
          headers: r,
          body: o
        }, o)
      }, t => e(t));
      else if (this.isNode()) {
        this.initGotEnv(t);
        const {
          url: s,
          ...i
        } = t;
        this.got.post(s, i).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o)
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body)
        })
      }
    }
    time(t) {
      let e = {
        "M+": (new Date).getMonth() + 1,
        "d+": (new Date).getDate(),
        "H+": (new Date).getHours(),
        "m+": (new Date).getMinutes(),
        "s+": (new Date).getSeconds(),
        "q+": Math.floor(((new Date).getMonth() + 3) / 3),
        S: (new Date).getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
      return t
    }
    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
          "open-url": t
        } : this.isSurge() ? {
          url: t
        } : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"],
              s = t.mediaUrl || t["media-url"];
            return {
              openUrl: e,
              mediaUrl: s
            }
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl,
              s = t["media-url"] || t.mediaUrl;
            return {
              "open-url": e,
              "media-url": s
            }
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {
              url: e
            }
          }
        }
      };
      this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
      let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
      h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
    }
    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
    }
    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
    }
    wait(t) {
      return new Promise(e => setTimeout(e, t))
    }
    done(t = {}) {
      const e = (new Date).getTime(),
        s = (e - this.startTime) / 1e3;
      this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
    }
  }(t, e)
}
