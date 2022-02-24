Openhab is going to woks as a service (that means we could shut it down and restore without loosing any critical data)  
-----
Aware to shoot WirenBoard down !!! Before shoot it down you need to shoot down openhab first (or you gonna get homekit connection error after restart)  
-----
to do soo easily you need make openhab service  
-----
before we start I show you few commands that gonna control our services  
-----
Make this once  
    systemctl enable openhab.service
    systemctl daemon-reload
    systemctl start openhab.service
    
Before every shoot down wirenBoard use this command 
    systemctl stop openhab.service
