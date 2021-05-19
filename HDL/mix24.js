var hexSwitchCommand = "0031";
//channels
defineVirtualDevice("mix24", {
  title: "HDL-mix24",
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

function makeMix24Rules(chanelName, hexChannel){
  defineRule(chanelName , {
    whenChanged: "mix24/" + chanelName,
    then: function(newValue, devName, cellName) {
      var hexAdress = "0155";
      if(newValue){
          var hexControlOn = "64";
          var temp = "0F03FEFFFE" + hexSwitchCommand + hexAdress + hexChannel + hexControlOn + "0002";
          var sendingData = temp + Pack_crc(temp);
          dev["hdl"]["data"] = sendingData;
      }else{
          var hexControlOff = "00";
          var temp = "0F03FEFFFE" + hexSwitchCommand + hexAdress + hexChannel + hexControlOff + "0002";
          var sendingData = temp + Pack_crc(temp);
          dev["hdl"]["data"] = sendingData;
      }
    }
  });
}

makeMix24Rules("Channel1", "01");
makeMix24Rules('Channel2', "02");
makeMix24Rules('Channel3', "03");
makeMix24Rules('Channel4', "04");
makeMix24Rules('Channel5', "05");
makeMix24Rules('Channel6', "06");
makeMix24Rules('Channel7', "07");
makeMix24Rules('Channel8', "08");
makeMix24Rules('Channel9', "09");
makeMix24Rules('Channel10', "0A");
makeMix24Rules('Channel11', "0B");
makeMix24Rules('Channel12', "0C");
