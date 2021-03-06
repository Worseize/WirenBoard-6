// Unit: MQTT
//Control
IR.AddListener(IR.EVENT_TAG_CHANGE, IR.GetDevice("MQTT"), function(name, value){
   switch (name) {
     case "OfficeVentStatus": //Вентиляция в подсобке офиса (OH Control)
       if(value == false){
          IR.GetDevice("Mix23 (stend)").Set("Relay Channel 06 Switch Off", 0);
          break;
       }else{
          IR.GetDevice("Mix23 (stend)").Set("Relay Channel 06 Switch On", 0);
          break;
       }
     case "LeftRollerShutterStatus": // Левая штора(OH Control)
         if(value == "UP"){//UP
            IR.GetDevice("Relay 3-channel").Set("Channel 01 Switch On", true);
            break;
         }else if(value == "DOWN"){//DOWN
            IR.GetDevice("Relay 3-channel").Set("Channel 02 Switch On", true);
            break;
         }else{//STOP
            IR.Log("STOP");
            IR.GetDevice("Relay 3-channel").Set("Channel 01 Switch Off", false);
            IR.GetDevice("Relay 3-channel").Set("Channel 02 Switch Off", false);
            break;
         }
     case "CentralRollerShutterStatus": // Центральная штора(OH Control)
         if(value == "UP"){//UP
            IR.GetDevice("Relay 2-channel2").Set("Channel 01 Switch On", true);
            break;
         }else if(value == "DOWN"){//DOWN
            IR.GetDevice("Relay 2-channel2").Set("Channel 02 Switch On", true);
            break;
         }else{//STOP
            IR.Log("STOP");
            IR.GetDevice("Relay 2-channel2").Set("Channel 01 Switch Off", false);
            IR.GetDevice("Relay 2-channel2").Set("Channel 02 Switch Off", false);
            break;
         }
     case "RightlRollerShutterStatus": // Правая штора(OH Control)
         if(value == "UP"){//UP
            IR.GetDevice("Relay 2-channel1").Set("Channel 02 Switch On", true);
            break;
         }else if(value == "DOWN"){//DOWN
            IR.GetDevice("Relay 2-channel1").Set("Channel 01 Switch On", true);
            break;
         }else{//STOP
            IR.Log("STOP");
            IR.GetDevice("Relay 2-channel1").Set("Channel 02 Switch Off", false);
            IR.GetDevice("Relay 2-channel1").Set("Channel 01 Switch Off", false);
            break;
         }
     case "OfficeLampStatus"://Свет в главной комнате офиса (OH Control)
         if(value == false){
            IR.GetDevice("Mix23").Set("Relay Channel 09 Switch Off", 0);
            break;
         }else{
            IR.GetDevice("Mix23").Set("Relay Channel 09 Switch On", 0);
            break;
         }
     case "OfficeLamp2Status": //Свет в подсобке офиса (OH Control)
         if(value == false){
            IR.GetDevice("Mix23").Set("Relay Channel 08 Switch Off", 0);
            break;
         }else{
            IR.GetDevice("Mix23").Set("Relay Channel 08 Switch On", 0);
            break;
         }
   }
});
//Control FB
IR.AddListener(IR.EVENT_TAG_CHANGE, IR.GetDevice("Mix23 (stend)"), function(name, value){
   switch (name) {
     case "Relay Channel 06": //Вентиляция в подсобке офиса (OH Control FB)
       if(value){
          IR.GetDevice("MQTT").Set("OfficeVentControl", 1); //on
          break;
       }else{
          IR.GetDevice("MQTT").Set("OfficeVentControl", 0); //off
          break;
       }
   }
});

//Control FB
IR.AddListener(IR.EVENT_TAG_CHANGE, IR.GetDevice("Relay 3-channel"), function(name, value){
    switch (name) { //LEFT ROLLERSHUTTER
       case "Channel 01": //UP
          IR.Log("UP On = " + value);
          break;
       case "Channel 02": //DOWN
          IR.Log("DOWN On = " + value);
          break;
    }
});
//Control FB
IR.AddListener(IR.EVENT_TAG_CHANGE, IR.GetDevice("Mix23"), function(name, value){
   switch (name) {
     case "Relay Channel 09": //Свет в главной комнате офиса (OH Control FB)
       if(value){
          IR.GetDevice("MQTT").Set("OfficeLampControl", 1); //on
          break;
       }else{
          IR.GetDevice("MQTT").Set("OfficeLampControl", 0); //off
          break;
       }
     case "Relay Channel 08": //Свет в подсобке офиса (OH Control FB)
       if(value){
          IR.GetDevice("MQTT").Set("OfficeLamp2Control", 1); //on
          break;
       }else{
          IR.GetDevice("MQTT").Set("OfficeLamp2Control", 0); //off
          break;
       }
   }
});
