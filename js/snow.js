/**
 * SNOW & EPIK VIP Unlock
 */
const body = $response.body;

try {
  const obj = JSON.parse(body);
  const ua = ($request.headers && ($request.headers["User-Agent"] || $request.headers["user-agent"])) || "";
  const times = Date.now();

  const list = {
    "iphoneapp.epik": { id: "com.snowcorp.epik.subscribe.plan.oneyear" },
    "iphoneapp.snow": { id: "com.campmobile.snow.subscribe.oneyear" }
  };

  for (const key of Object.keys(list)) {
    if (new RegExp(`^${key}`, "i").test(ua)) {
      obj.result = {
        products: [
          {
            managed: true,
            status: "ACTIVE",
            startDate: times,
            productId: list[key].id,
            expireDate: 4092599349000
          }
        ],
        tickets: [
          {
            managed: true,
            status: "ACTIVE",
            startDate: times,
            productId: list[key].id,
            expireDate: 4092599349000
          }
        ],
        activated: true
      };
      break;
    }
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({ body });
}
