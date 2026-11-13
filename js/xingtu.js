/**
 * Xingtu (醒图) VIP Unlock
 */
let body = $response.body;
try {
  let obj = JSON.parse(body);
  const expireTime = 4092599349; // 2099-12-31
  const startTime = 1680000000;

  if (obj.data) {
    obj.data.flag = true;
    obj.data.start_time = startTime;
    obj.data.end_time = expireTime;
    obj.data.status = 1;
    obj.data.is_vip = true;
    obj.data.vip_type = 1;
    obj.data.sub_type = 1;
    obj.data.is_free_trial = true;
    obj.data.left_time = 99999999;
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({ body });
}
