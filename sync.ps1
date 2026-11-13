# ========================================================
# Script tu dong hoa cap nhat aio.conf su dung GitHub Raw Links
# Repo: https://github.com/hpahm/config-shadow
# ========================================================
$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent $MyInvocation.MyCommand.Definition
if (-not $workspace) { $workspace = "f:\Module-Conf" }

$confPath = Join-Path $workspace "aio.conf"
$bakPath = Join-Path $workspace "aio.conf.bak"
$baseUrl = "https://raw.githubusercontent.com/hpahm/config-shadow/main/js"
$updateUrl = "https://raw.githubusercontent.com/hpahm/config-shadow/main/aio.conf"

Write-Host "-> Dang sao luu aio.conf sang aio.conf.bak..." -ForegroundColor Cyan
Copy-Item -Path $confPath -Destination $bakPath -Force

Write-Host "-> Dang tao file aio.conf chuan Shadowrocket voi script URL tu $baseUrl..." -ForegroundColor Cyan

$sb = New-Object System.Text.StringBuilder

[void]$sb.AppendLine("[General]")
[void]$sb.AppendLine("bypass-system = true")
[void]$sb.AppendLine("skip-proxy = *.local, *.crashlytics.com")
[void]$sb.AppendLine("tun-excluded-routes = 192.168.0.0/16, 10.0.0.0/8, 172.16.0.0/12")
[void]$sb.AppendLine("update-url = " + $updateUrl)
[void]$sb.AppendLine("")
[void]$sb.AppendLine("[Rule]")
[void]$sb.AppendLine("AND,((DOMAIN-SUFFIX,googlevideo.com),(PROTOCOL,UDP)),REJECT")
[void]$sb.AppendLine("AND,((DOMAIN,youtubei.googleapis.com),(PROTOCOL,UDP)),REJECT")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("[Header Rewrite]")
[void]$sb.AppendLine("^https?:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/?[^\/]*$) header-del X-RevenueCat-ETag")
[void]$sb.AppendLine("^https:\/\/(spclient\.wg\.spotify\.com|.*-spclient\.spotify\.com(:443)?)\/user-customization-service\/v1\/customize$ header-del if-none-match")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("[URL Rewrite]")
[void]$sb.AppendLine("# Chan quang cao YouTube & Google Video")
[void]$sb.AppendLine("^https?:\/\/[\w-]+\.googlevideo\.com\/(?!(dclk_video_ads|videoplayback\?)).+&oad _ reject-200")
[void]$sb.AppendLine("^https?:\/\/(www|s)\.youtube\.com\/api\/stats\/ads _ reject-200")
[void]$sb.AppendLine("^https?:\/\/(www|s)\.youtube\.com\/(pagead|ptracking) _ reject-200")
[void]$sb.AppendLine("^https?:\/\/s\.youtube\.com\/api\/stats\/qoe\?adcontext _ reject-200")
[void]$sb.AppendLine("(^https?:\/\/[\w-]+\.googlevideo\.com\/(?!dclk_video_ads).+?)&ctier=L(&.+?),ctier,(.+) `$1`$2`$3 302")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# TikTok - Mo khoa vung & chan quang cao (Chuan Shadowrocket)")
[void]$sb.AppendLine("(?<=_region=)CN(?=&) JP 307")
[void]$sb.AppendLine("(?<=&mcc_mnc=)460[0-9]{2} 44001 307")
[void]$sb.AppendLine("(^https?:\/\/(tnc|dm)[\w-]+\.\w+\.com\/.+)(\?)(.+) `$1`$3 302")
[void]$sb.AppendLine("^https?:\/\/.*\.musical\.ly\/(.*\/)?api\/ad\/ _ reject-200")
[void]$sb.AppendLine("^https?:\/\/.*\.tiktokv\.com\/(.*\/)?api\/ad\/ _ reject-200")
[void]$sb.AppendLine("^https?:\/\/.*\.tiktokv\.com\/aweme\/v\d\/ad\/ _ reject-200")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("[Map Local]")
[void]$sb.AppendLine('^https?:\/\/[\w-]+\.googlevideo\.com\/initplayback.+&oad data-type=text data="" status-code=200')
[void]$sb.AppendLine("")
[void]$sb.AppendLine("[Script]")
[void]$sb.AppendLine("# Sub-Store")
[void]$sb.AppendLine("Sub-Store Core = type=http-request,pattern=^https?:\/\/sub\.store\/((download)|api\/(preview|sync|(utils\/node-info))),script-path=https://github.com/sub-store-org/Sub-Store/releases/latest/download/sub-store-1.min.js,requires-body=true,timeout=120")
[void]$sb.AppendLine("Sub-Store Simple = type=http-request,pattern=^https?:\/\/sub\.store,script-path=https://github.com/sub-store-org/Sub-Store/releases/latest/download/sub-store-0.min.js,requires-body=true")
[void]$sb.AppendLine("Sub-Store Sync = type=cron,cronexp=0 0 * * *,wake-system=1,timeout=120,script-path=https://github.com/sub-store-org/Sub-Store/releases/latest/download/cron-sync-artifacts.min.js")
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# YouTube")
[void]$sb.AppendLine('youtube.response = type=http-response,pattern=^https:\/\/youtubei\.googleapis\.com\/(youtubei\/v1\/(browse|next|player(\/ad_break)?|search|reel\/reel_watch_sequence|guide|account\/get_setting|get_watch|log_event|config))(\?(.*))?$,requires-body=1,max-size=-1,binary-body-mode=1,argument="{\"captionLang\":\"vi\",\"blockUpload\":true,\"blockImmersive\":true,\"blockShorts\":false,\"debug\":false}",script-path=' + $baseUrl + '/youtube_response.js')
[void]$sb.AppendLine('youtube.request.init = type=http-request,pattern=^https?:\/\/[\w-]+\.googlevideo\.com\/initplayback.+&ack.*,requires-body=1,max-size=-1,binary-body-mode=1,argument="{\"captionLang\":\"vi\"}",script-path=' + $baseUrl + '/youtube_request.js')
[void]$sb.AppendLine('youtube.request.log_event = type=http-request,pattern=^https:\/\/youtubei\.googleapis\.com\/youtubei\/v1\/log_event(\?(.*))?$,requires-body=1,max-size=-1,binary-body-mode=1,script-path=' + $baseUrl + '/youtube_request.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# Spotify")
[void]$sb.AppendLine('spotify-json = type=http-request,pattern=^https:\/\/(spclient\.wg\.spotify\.com|.*-spclient\.spotify\.com(:443)?)\/user-customization-service\/v1\/customize$,requires-body=1,max-size=-1,script-path=' + $baseUrl + '/spotify_json.js')
[void]$sb.AppendLine('spotify-proto = type=http-response,pattern=^https:\/\/(spclient\.wg\.spotify\.com|.*-spclient\.spotify\.com(:443)?)\/(bootstrap\/v1\/bootstrap|melody\/v1\/product_state|user-customization-service\/v1\/customize)$,requires-body=1,max-size=-1,binary-body-mode=1,script-path=' + $baseUrl + '/spotify_proto.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# Universal RevenueCat (Locket Gold & Apps)")
[void]$sb.AppendLine('deleteHeader = type=http-request,pattern=^https:\/\/api\.revenuecat\.com\/.+\/(receipts|subscribers),script-path=' + $baseUrl + '/deleteHeader.js,timeout=60')
[void]$sb.AppendLine('revenuecat = type=http-response,pattern=^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/[^/]+$),requires-body=true,max-size=-1,timeout=60,script-path=' + $baseUrl + '/locket.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# SoundCloud Go+")
[void]$sb.AppendLine('SoundCloudGo+ = type=http-response,pattern=https://api-mobile.soundcloud.com/configuration/ios,requires-body=1,max-size=-1,script-path=' + $baseUrl + '/soundcloud.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# PicsArt")
[void]$sb.AppendLine('PicsArt = type=http-response,pattern=^https?:\/\/api\.(meiease\.cn|picsart\.com)\/shop\/subscription\/(validate|apple\/purchases),requires-body=1,script-path=' + $baseUrl + '/picsart.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# CamScanner")
[void]$sb.AppendLine('Camscanner = type=http-response,pattern=^https?:\/\/.*\.(intsig\.net|camscanner\.com),requires-body=1,script-path=' + $baseUrl + '/camscanner.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# Meitu & Wink")
[void]$sb.AppendLine('Meitu = type=http-response,pattern=^https?:\/\/((h5|api)\.xiuxiu|api-sub|api\.posters)\.meitu\.com\/.+\/(vip|user|h\d|center|home),requires-body=1,script-path=' + $baseUrl + '/meitu.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# Snow")
[void]$sb.AppendLine('Snow = type=http-response,pattern=^https?:\/\/.*\.snow\.me\/v\d\/purchase\/subscription\/subscriber\/status,requires-body=1,script-path=' + $baseUrl + '/snow.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# iTunes (VerifyReceipt Apps)")
[void]$sb.AppendLine('iTunes = type=http-response,pattern=^https?:\/\/buy\.itunes\.apple\.com\/verifyReceipt$,requires-body=true,max-size=-1,timeout=60,script-path=' + $baseUrl + '/itunes.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# CapCut Pro")
[void]$sb.AppendLine('CapCut = type=http-response,pattern=^https?:\/\/.*\.capcut\.com\/commerce\/v\d\/(subscription|user),requires-body=1,max-size=-1,script-path=' + $baseUrl + '/capcut.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# Xingtu (XingTu) VIP")
[void]$sb.AppendLine('Xingtu = type=http-response,pattern=^https:\/\/commerce-api\.faceu\.mobi\/commerce\/v\d\/subscription\/user_info,requires-body=1,max-size=-1,script-path=' + $baseUrl + '/xingtu.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("# TikTok Watermark & Ad Clean")
[void]$sb.AppendLine('TikTok = type=http-response,pattern=^https?:\/\/.*\.tiktokv\.com\/aweme\/v\d\/(feed|detail),requires-body=1,max-size=-1,script-path=' + $baseUrl + '/tiktok.js')
[void]$sb.AppendLine("#************************************#")
[void]$sb.AppendLine("")
[void]$sb.AppendLine("[MITM]")
[void]$sb.AppendLine("enable = true")
[void]$sb.AppendLine("hostname = %APPEND% sub.store, *.googlevideo.com, youtubei.googleapis.com, www.youtube.com, s.youtube.com, -redirector*.googlevideo.com, spclient.wg.spotify.com, *spclient.spotify.com, api.revenuecat.com, api-mobile.soundcloud.com, api.meiease.cn, api.picsart.com, *.camscanner.com, *.intsig.net, *.xiuxiu.meitu.com, api-sub.meitu.com, api.posters.meitu.com, *.snow.me, buy.itunes.apple.com, *.capcut.com, commerce-api.faceu.mobi, api*.tiktokv.com, api*.musical.ly, -*pull*.tiktokv.com")

# Luu file dang UTF-8 khong BOM
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($confPath, $sb.ToString(), $utf8NoBom)

$len = (Get-Item $confPath).Length
Write-Host "-> THANH CONG: Da cap nhat aio.conf ve dang GitHub Raw Script URL (MITM sach)!" -ForegroundColor Green
Write-Host "   Dung luong moi: $len bytes" -ForegroundColor Yellow
