var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];

function doGet(e) {
  var arg = e.parameter.par;
  var datum = [];
  switch (arg){
    case 'temp':
      datum = getDataFromSheet('Temp Sensor1');
      break;
    case 'amb':
      var n1Data = getDataFromSheet('Temp Aire');
      datum.push(n1Data);
      var n2Data = getDataFromSheet('Hum Aire');
      datum.push(n2Data);
      break;
  }
  var data = JSON.stringify(datum);
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}

function getDataFromSheet(column_name) {
  try {
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    data_column = headers.indexOf(column_name);
    time_column = 0;
    
    var data = [];
    if (data_column !== -1) {
      time = sheet.getRange(2, time_column + 1, sheet.getLastRow(), 1).getValues();
      data = sheet.getRange(2, data_column + 1, sheet.getLastRow(), 1).getValues();
    }

    var results = [];

    for (row in data) {
      t = time[row][0];
      y = data[row][0];    
      results.push({
        "t": t,
        "y": Math.round(y * 100) / 100
      })
    }
    results.pop();
    return results;
  }
  catch (e) {
    return []
  }
}