//Создать openhab устройства
defineVirtualDevice("0131", {
  title: "HDL-R131",
  cells: {
    "Channel1" : {type: "switch", value: false, readonly: false},
    "Channel2" : {type: "switch", value: false, readonly: false},
    "Channel3" : {type: "switch", value: false, readonly: false},
    "Channel4" : {type: "switch", value: false, readonly: false},
    "Channel5" : {type: "switch", value: false, readonly: false},
    "Channel6" : {type: "switch", value: false, readonly: false}
  }
});

defineVirtualDevice("0132", {
  title: "HDL-R132",
  cells: {
    "Channel1" : {type: "switch", value: false, readonly: false},
    "Channel2" : {type: "switch", value: false, readonly: false},
    "Channel3" : {type: "switch", value: false, readonly: false},
    "Channel4" : {type: "switch", value: false, readonly: false},
    "Channel5" : {type: "switch", value: false, readonly: false},
    "Channel6" : {type: "switch", value: false, readonly: false},
    "Channel7" : {type: "switch", value: false, readonly: false},
    "Channel8" : {type: "switch", value: false, readonly: false},
    "Channel9" : {type: "switch", value: false, readonly: false},
    "Channel10" : {type: "switch", value: false, readonly: false},
    "Channel11" : {type: "switch", value: false, readonly: false},
    "Channel12" : {type: "switch", value: false, readonly: false}
  }
});

defineVirtualDevice("0133", {
  title: "HDL-R133",
  cells: {
    "Channel1" : {type: "switch", value: false, readonly: false},
    "Channel2" : {type: "switch", value: false, readonly: false},
    "Channel9" : {type: "switch", value: false, readonly: false},
    "Channel11" : {type: "switch", value: false, readonly: false}
  }
});

var hexSwitchCommand = "0031";
var hexTime = "0001";
var messageLength = "0F";
var whoControlAddress = "03FE"; //Check if it is free (openhab address)
var hexControlOn = "64";
var hexControlOff = "00";

//Создать Виртуальную control шину HDL
defineVirtualDevice("hdl", {
  title: "wb-hdl",
  cells: {
    "data"		   : {type: "string" , value: "0F03FEFFFE0031015505640001D673", readonly: false}
  }
});

//По изменению виртуальной control шины HDL: Отправить в UDP по порту(в баш скрипте) команду по протоколу HDL
defineRule("hdl_incoming", {
  whenChanged: "hdl/data",
  then: function(newValue, devName, cellName) {
    runShellCommand('bash /var/udp/hdludpControl.sh ' +newValue);
  }
});

//Создать виртуальную feedback шину HDL
defineVirtualDevice("hdl-listen", {
  title: "wb-hdl-listen",
  cells: {
    "data"		   : {type: "string" , value: "c0a80a64534d415254434c4f5544aaaa", readonly: false}
  }
});
var hexSwitchFeedback = "0032";
//По изменению виртуальной feedback шины HDL: Отправить в Openhab channels
defineRule("hdl_listen", {
  whenChanged: "hdl-listen/data",
  then: function(newValue, devName, cellName) {
    log("контрольная сумма (CRC is not checked) не проверялась");
    var crcIsOk = true;
    if(crcIsOk){
      //Адресс устройства
      var msgAddress = parseInt(newValue.substring(2, 6), 16);
      //Команда ответа
      var msgCommand = newValue.substring(10, 14);
      switch(msgCommand){
        case "0032": //Single Channell Status
          var msgValue = parseInt(newValue.substring(22, 24), 16);
          var msgChannel = parseInt("" + newValue.substring(18, 20), 16);
          var msgSuccess = "" + newValue.substring(20, 22);
          log("msgValue = " + msgValue + ", msgChannel = " + msgChannel + ", msgSuccess = " + msgSuccess); 
          if(msgSuccess == "f8"){
            //Switch State == 1
            if(msgValue > 0){
            	dev[""+msgAddress]["Channel" + msgChannel] = true;
            }else{
              	dev[""+msgAddress]["Channel" + msgChannel] = false;
            }
          }else if(msgSuccess == "f5"){
            //Switch State == 0
            dev[msgAddress]["channel" + msgChannel] = false;
          }else{
          	log("Unexpected msgSuccess");
          }
          break;
        case "efff": //Scene state
          log("some data is going scene control");
          break;
        default:
          log("Unable command");
      }
    }
  }
});
//control Rule prototype
function makeRules(channelName, hexChannel, decDeviceAddress, hexDeviceAddress){
	var devCh = decDeviceAddress + "/" + channelName;
  	defineRule(devCh, {
    	whenChanged: devCh,
      	then: function(newValue, devName, cellName){
        	var hexAddress = hexDeviceAddress;
          	var temp = "";
          	if(newValue){
            	temp = messageLength + whoControlAddress + "FFFE" + hexSwitchCommand + hexAddress + hexChannel + hexControlOn + hexTime;
            }else{
            	temp = messageLength + whoControlAddress + "FFFE" + hexSwitchCommand + hexAddress + hexChannel + hexControlOff + hexTime;
            }
          	var sendingData = "" + temp + Pack_crc(temp);
          	dev["hdl"]["data"] = sendingData;
        }
    });
}
//Создать правило объединяющее битовое управление из Openhab и устройства HDL buspro
makeRules("Channel1", "01", "0131", "011F");
makeRules("Channel2", "02", "0131", "011F");
makeRules("Channel3", "03", "0131", "011F");
makeRules("Channel4", "04", "0131", "011F");
makeRules("Channel5", "05", "0131", "011F");
makeRules("Channel6", "06", "0131", "011F");

makeRules("Channel1", "01", "0132", "0120");
makeRules("Channel2", "02", "0132", "0120");
makeRules("Channel3", "03", "0132", "0120");
makeRules("Channel4", "04", "0132", "0120");
makeRules("Channel5", "05", "0132", "0120");
makeRules("Channel6", "06", "0132", "0120");
makeRules("Channel7", "07", "0132", "0120");
makeRules("Channel8", "08", "0132", "0120");
makeRules("Channel9", "09", "0132", "0120");
makeRules("Channel10", "0A", "0132", "0120");
makeRules("Channel11", "0B", "0132", "0120");
makeRules("Channel12", "0C", "0132", "0120");

makeRules("Channel1", "01", "0133", "0121");
makeRules("Channel2", "02", "0133", "0121");
makeRules("Channel3", "03", "0133", "0121");
makeRules("Channel4", "04", "0133", "0121");
