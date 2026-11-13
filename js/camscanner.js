/**
 * CamScanner SVIP Unlock
 */
const body = $response.body;

try {
  let obj = JSON.parse(body);
  if (!obj || typeof obj !== "object") {
    $done({ body });
  } else {
    const vipa = '/purchase/cs/query_property';
    const vipb = '/queryProperty';
    const tqzx = '/getPrivilegeItem';
    const url = ($request && $request.url) ? $request.url : "";

    const vip = {
      group1_paid: 1,
      ms_first_pay: 0,
      vip_type: "svip",
      auto_renewal: true,
      in_trial: 1,
      members_page: 0,
      pc_vip: 1,
      renew_type: "year",
      renew_method: "appstore",
      ys_first_pay: 0,
      initial_tm: "4092599349",
      product_id: "com.intsig.camscanner.premiums.oneyear.autorenewable.free.test1",
      vip_level_info: {
        score: 0,
        level: 0,
        next_score: 1,
        start_score: 0,
        create_time: 0
      },
      nxt_renew_tm: "4092599349",
      last_payment_method: "appstore",
      grade: 2,
      svip: 1,
      expiry: 4092599349,
      pending: 0,
      level_info: {
        level: 1,
        end_days: 30,
        days: 1
      },
      inherited_flag: 0,
      group2_paid: 0
    };

    if (url.includes(vipa)) {
      if (!obj.data) obj.data = {};
      obj.data["psnl_vip_property"] = vip;
      obj.data["fax_balance"] = "99999";
      obj.data["used_points"] = "99999";
      obj.data["points"] = "99999";
      obj.data["pdfword_balance"] = "100010";
      obj.data["bookmode_balance"] = 100010;
      obj.data["immt_expy_points"] = "99999";
      obj.data["ocr_balance"] = 99999;
      obj.data["no_login_ocr_balance"] = "99999";
      obj.data["CamScanner_RoadMap"] = 100000;
    }

    if (url.includes(vipb)) {
      if (!obj.data) obj.data = {};
      if (!obj.data.ar_property) obj.data.ar_property = {};
      obj.data.ar_property["psnl_vip_property"] = vip;
    }

    if (url.includes(tqzx)) {
      if (!obj.data) obj.data = {};
      obj.data.data = {
        document: [
          { balance: -1, item: "CamScanner_Pic2pdf" },
          { balance: -1, item: "CamScanner_PdfCompress" },
          { balance: -1, item: "CamScanner_PdfEncrypt" },
          { balance: -1, item: "CamScanner_FileMerge" },
          { balance: -1, item: "CamScanner_PdfExtract" },
          { balance: -1, item: "CamScanner_PdfWatermark" },
          { balance: -1, item: "CamScanner_PdfSign" },
          { balance: 99999, item: "CamScanner_Intellect_Erase" }
        ],
        transfer: [
          { balance: -1, item: "CamScanner_ExcelRecoginze" },
          { balance: -1, item: "CamScanner_RoadMap" },
          { balance: -1, item: "CamScanner_Pdf2ppt" },
          { balance: 99999, item: "CamScanner_CloudOCR" }
        ],
        other: [
          { balance: 99999, item: "CamScanner_Translation" },
          { balance: -1, item: "CamScanner_DirNum" },
          { balance: -1, item: "CamScanner_IP_REMOVEAD" },
          { balance: -1, item: "CamScanner_PingTu" },
          { balance: 99999, item: "CamScanner_Points" },
          { balance: 99999, item: "CamScanner_Fax_Balance" }
        ],
        scaner: [
          { balance: 99999, item: "CamScanner_ImageRestore" },
          { balance: -1, item: "CamScanner_Patting" },
          { balance: 99999, item: "CamScanner_Profile_Card_Format" },
          { balance: -1, item: "CamScanner_BookMode" },
          { balance: -1, item: "CamScanner_CertMode" },
          { balance: -1, item: "CamScanner_HDScan" },
          { balance: 99999, item: "CamScanner_CloudOCR" }
        ],
        pure: [
          { balance: -1, item: "CamScanner_IP_REMOVEAD" }
        ]
      };
    }

    $done({ body: JSON.stringify(obj) });
  }
} catch (e) {
  $done({ body });
}
