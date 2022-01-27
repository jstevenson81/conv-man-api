export const ServerConfig = {
  ords: {
    url: "https://etvwbwij8jdtzoz-hcmconversion1.adb.us-phoenix-1.oraclecloudapps.com/ords/admin/",
    customMethods: {
      podsByDomain: "api/pods/:email",
      processedData: {
        errorsByBatch: "api/cnvdata/:batchName",
        allDataByBatch: "api/cnvdata/all/:batchName",
      },
    },
    pod: "uxpods/",
    conversionTypes: "uxconvtypes/",
    podEmails: "uxpodemails/",
    spreadsheetRows: "cnvsp/",
  },
};
