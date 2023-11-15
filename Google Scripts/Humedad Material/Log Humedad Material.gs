var ss = SpreadsheetApp.getActiveSpreadsheet();
var sheet = ss.getSheets()[0];

function doGet(e) {
  var humD1 = e.parameter.humD1;
  var humD2 = e.parameter.humD2;
  var humD3 = e.parameter.humD3;
  var currentdate = new Date();
  var dateTime = currentdate.getFullYear() + "-"
    + ('0' + (currentdate.getMonth() + 1)).slice(-2) + "-"
    + ('0' + currentdate.getDate()).slice(-2) + "T"
    + ('0' + currentdate.getHours()).slice(-2) + ":"
    + ('0' + currentdate.getMinutes()).slice(-2) + ":"
    + ('0' + currentdate.getSeconds()).slice(-2);
  var params = JSON.stringify(e);
  response = HtmlService.createHtmlOutput(params);

  var values = [
    [dateTime, humD1, humD2, humD3]
  ];

  var lastRow = sheet.getLastRow();
  var nextAvailableRow = lastRow + 1;
  var range = sheet.getRange("A" + nextAvailableRow + ":D" + nextAvailableRow);

  range.setValues(values);
  return response;
}

function doPost(){
  delAllChartsFromSheet();
  createChart();
  copyLogFile();
  clearLogFile();
  delAllChartsFromSheet();
  createHeaders();
}

function createHeaders() {
  sheet.setFrozenRows(1);
  var values = [
    ["Hora", 
    "Hum Deshidratador Sensor 1", 
    "Hum Deshidratador Sensor 2", 
    "Hum Deshidratador Sensor 3"]
  ];
  var range = sheet.getRange("A1:D1");
  range.setValues(values);
}

function copyLogFile(){
  var noArchivedFolder = DriveApp.getFolderById('1GbNYKoxRcKSZpCtfQFikFrPkeZj2M09m'); 
  var range = sheet.getRange("A1:B3");
  var currentdate = new Date();
  ss.setNamedRange('buildingNameAddress', range);
  var TestRange = ss.getRangeByName('buildingNameAddress').getValues();
  var currentdate = new Date();
  var dateTime = currentdate.getFullYear() + "-"
    + ('0' + (currentdate.getMonth() + 1)).slice(-2) + "-"
    + ('0' + currentdate.getDate()).slice(-2) + "T"
    + ('0' + currentdate.getHours()).slice(-2) + ":"
    + ('0' + currentdate.getMinutes()).slice(-2) + ":"
    + ('0' + currentdate.getSeconds()).slice(-2);  
  var fileToMove = DriveApp.getFileById(ss.getId()).makeCopy(dateTime.toString() + " Log Humedad Material Quantum");
  fileToMove.moveTo(noArchivedFolder); 
}

function clearLogFile(){
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange("A2:D" + lastRow);
  range.clearContent();
}

function createChart(){
  var app = SpreadsheetApp;
  var ss = app.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();

  var lastRow = sheet.getLastRow();
  var humMatChart = sheet.newChart().asLineChart()
  .addRange(sheet.getRange("A1:D" + lastRow))
  .setTitle('Humedad de Material')
  .setXAxisTitle('Hora')
  .setYAxisTitle('% Humedad')
  .setPosition(lastRow, 3, 0, 0)
  .setOption('hAxis.gridlines.count', 10)
  .setOption('vAxis.gridlines.count', 10)
  .setNumHeaders(1)
  .build();

  sheet.insertChart(humMatChart);
}

function delAllChartsFromSheet() {
  var chts=sheet.getCharts();
  for(var i=0;i<chts.length;i++){
    sheet.removeChart(chts[i]);
  }
}