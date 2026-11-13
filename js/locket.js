// Universal RevenueCat Unlock by Hpahm (compatible with Locket Gold)
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

const headers = ($request && $request.headers) ? $request.headers : {};
const ua = (headers["User-Agent"] || headers["user-agent"] || "");
const body = $response && $response.body;

try {
  let obj = {};
  try {
    obj = JSON.parse(body);
  } catch (err) {
    obj = {};
  }

  if (!obj || typeof obj !== "object") obj = {};
  if (!obj.subscriber) obj.subscriber = {};
  if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};
  if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};

  obj.Attention = "Universal RevenueCat Unlock by Hpahm";

  const pId = "com.hpahm.premium.yearly";
  const subData = {
    is_sandbox: false,
    ownership_type: "PURCHASED",
    billing_issues_detected_at: null,
    period_type: "normal",
    expires_date: "2099-12-18T01:04:17Z",
    grace_period_expires_date: null,
    unsubscribe_detected_at: null,
    original_purchase_date: "2024-07-28T01:04:18Z",
    purchase_date: "2024-07-28T01:04:17Z",
    store: "app_store"
  };

  const entData = {
    grace_period_expires_date: null,
    purchase_date: "2024-07-28T01:04:17Z",
    product_identifier: pId,
    expires_date: "2099-12-18T01:04:17Z"
  };

  const match = Object.keys(mapping).find(e => ua.toLowerCase().includes(e.toLowerCase()));
  if (match) {
    let [ent, s] = mapping[match];
    let customPid = s || pId;
    entData.product_identifier = customPid;

    obj.subscriber.subscriptions[customPid] = subData;
    obj.subscriber.subscriptions[pId] = subData;
    obj.subscriber.subscriptions["Gold"] = subData;
    obj.subscriber.subscriptions["locket_1600_1y"] = subData;
    obj.subscriber.subscriptions["com.locket.gold.yearly"] = subData;

    obj.subscriber.entitlements[ent] = entData;
  } else {
    const existingEnts = Object.keys(obj.subscriber.entitlements);
    if (existingEnts.length > 0) {
      for (const key of existingEnts) {
        const curPid = obj.subscriber.entitlements[key].product_identifier || pId;
        obj.subscriber.subscriptions[curPid] = subData;
        obj.subscriber.entitlements[key] = {
          ...entData,
          product_identifier: curPid
        };
      }
    } else {
      const common = ["pro", "premium", "Gold", "VIP", "membership", "plus", "all_access"];
      for (const k of common) {
        obj.subscriber.entitlements[k] = entData;
      }
      obj.subscriber.subscriptions[pId] = subData;
    }
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({ body });
}
