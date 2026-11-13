/**
 * CapCut Pro VIP Unlock
 */
let body = $response.body;
try {
  let obj = JSON.parse(body);
  const expireTime = 4092599349; // 2099-12-31

  if (obj.data) {
    obj.data.is_vip = true;
    obj.data.vip_type = 1;
    obj.data.end_time = expireTime;
    obj.data.expire_time = expireTime;
    obj.data.has_purchased = true;
    obj.data.subscription_status = 1;
    obj.data.is_pro = true;
    obj.data.status = 1;

    if (obj.data.user_info) {
      obj.data.user_info.is_vip = true;
      obj.data.user_info.vip_type = 1;
      obj.data.user_info.end_time = expireTime;
      obj.data.user_info.is_pro = true;
    }

    if (obj.data.sub_info) {
      obj.data.sub_info.is_vip = true;
      obj.data.sub_info.end_time = expireTime;
      obj.data.sub_info.status = 1;
    }

    if (obj.data.subs_info && Array.isArray(obj.data.subs_info)) {
      obj.data.subs_info.forEach(sub => {
        sub.is_vip = true;
        sub.end_time = expireTime;
        sub.status = 1;
      });
    }
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({ body });
}
