/**
 * TikTok Unlock Region & Remove Watermark & Remove Ads
 */
let body = $response.body;
try {
  let obj = JSON.parse(body);

  function cleanVideo(item) {
    if (!item) return;
    if (item.prevent_download_type !== undefined) {
      item.prevent_download_type = 0;
    }
    if (item.video) {
      if (item.video.download_addr && item.video.download_addr.url_list) {
        item.video.play_addr = item.video.download_addr;
      }
      if (item.video.download_suffix_logo_addr) {
        delete item.video.download_suffix_logo_addr;
      }
      if (item.video.bit_rate && item.video.download_addr) {
        item.video.bit_rate.forEach(rate => {
          if (rate.play_addr) {
            rate.play_addr.url_list = item.video.download_addr.url_list;
          }
        });
      }
    }
  }

  if (obj.aweme_list && Array.isArray(obj.aweme_list)) {
    obj.aweme_list = obj.aweme_list.filter(item => !item.is_ads && !item.ad_info);
    obj.aweme_list.forEach(cleanVideo);
  } else if (obj.aweme_detail) {
    cleanVideo(obj.aweme_detail);
  }

  $done({ body: JSON.stringify(obj) });
} catch (e) {
  $done({ body });
}
