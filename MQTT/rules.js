var deviceNames = ["OfficeLamp", "OfficeLamp2", "OfficeVent", "LeftRollerShutter", "RightRollerShutter", "CentralRollerShutter"];
var titleNames = ["Office"];

defineVirtualDevice(deviceNames[0], {
  title: titleNames[0],
  cells: {
    'OfficeLampControl': {type: "switch", value: false}, //Control
    'OfficeLampStatus' : {type: "switch", value: false}, //Status
  }
});
defineVirtualDevice(deviceNames[1], {
  title: titleNames[0],
  cells: {
    'OfficeLamp2Control': {type: "switch", value: false}, //Control
    'OfficeLamp2Status' : {type: "switch", value: false}, //Status
  }
});

defineVirtualDevice(deviceNames[2], {
  title: titleNames[0],
  cells: {
    'OfficeVentControl': {type: "switch", value: false}, //Control
    'OfficeVentStatus' : {type: "switch", value: false}, //Status
  }
});

defineVirtualDevice(deviceNames[3], {
  title: titleNames[0],
  cells: {
    'LeftRollerShutterControl': {type: "text", value: ""}, //Control
    'LeftRollerShutterStatus' : {type: "text", value: ""}, //Status
  }
});

defineVirtualDevice(deviceNames[4], {
  title: titleNames[0],
  cells: {
    'RightRollerShutterControl': {type: "text", value: ""}, //Control
    'RightRollerShutterStatus' : {type: "text", value: ""}, //Status
  }
});

defineVirtualDevice(deviceNames[5], {
  title: titleNames[0],
  cells: {
    'CentralRollerShutterControl': {type: "text", value: ""}, //Control
    'CentralRollerShutterStatus' : {type: "text", value: ""}, //Status
  }
});
