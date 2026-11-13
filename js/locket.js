// Universal RevenueCat & Locket Gold
const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";
var obj = {};

try {
  obj = JSON.parse($response.body);
} catch (e) {
  obj = {};
}

if (!obj.subscriber) {
  obj.subscriber = {};
}
if (!obj.subscriber.subscriptions) {
  obj.subscriber.subscriptions = {};
}
if (!obj.subscriber.entitlements) {
  obj.subscriber.entitlements = {};
}

var subData = {
  is_sandbox: !1,
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

var entData = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "locket_1600_1y",
  expires_date: "2099-12-18T01:04:17Z"
};

const match = Object.keys(mapping).find(e => ua.toLowerCase().includes(e.toLowerCase()));

if (match) {
  let [e, s] = mapping[match];
  if (s) {
    entData.product_identifier = s;
    obj.subscriber.subscriptions[s] = subData;
  } else {
    obj.subscriber.subscriptions["locket_1600_1y"] = subData;
    obj.subscriber.subscriptions["locket_3600_1y"] = subData;
    obj.subscriber.subscriptions["com.locket.gold.yearly"] = subData;
    obj.subscriber.subscriptions["locket_gold"] = subData;
    obj.subscriber.subscriptions["Gold"] = subData;
  }
  obj.subscriber.entitlements[e] = entData;
} else {
  obj.subscriber.subscriptions["locket_1600_1y"] = subData;
  obj.subscriber.subscriptions["locket_3600_1y"] = subData;
  obj.subscriber.subscriptions["com.locket.gold.yearly"] = subData;
  obj.subscriber.subscriptions["locket_gold"] = subData;
  obj.subscriber.subscriptions["Gold"] = subData;
  obj.subscriber.entitlements["Gold"] = entData;
  obj.subscriber.entitlements["pro"] = entData;
}

$done({ body: JSON.stringify(obj) });
