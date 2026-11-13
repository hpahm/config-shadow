// deleteHeader by Hpahm
function setHeaderValue(e, a, d) {
  var r = a.toLowerCase();
  r in e ? e[r] = d : e[a] = d;
}
var modifiedHeaders = ($request && $request.headers) ? Object.assign({}, $request.headers) : {};
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
$done({ headers: modifiedHeaders });
