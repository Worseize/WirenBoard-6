Adding Devices and communicate with them via Smartbus Protocol 
1) Put Rules.js file on web UI rules web page

You should create additionally communication files in linux (wirenBoard controller)
1) Control file (/mnt/Smartbus/smartbusControl.sh)

2) Feedback file (/mnt/Smartbus/smartbusFeedback.sh)
kills all sockets on 6000 ports (if something was there before or got errors while configuring) 

fuser -k 6000/udp  

3) Bus streaming file (/mnt/Smartbus/streamingData.txt) 
(create empty file it going to be filled automattically after configuration is finished)

4) Troubleshoot
Rules.js has in protocol time that equal 0001 in hex format meaning 1 second ,  
but in reality I got many times error when trying to make channel off with that time ,  
soo change time to 0002 if you got same error.  
I think it could be soo , because we have wrong crc table probably  
or just channels can`t set off soo quickly it does not matter why because we have solution on that problem. 

5) smartbusFeedback.service must be in /lib/systemd/system/smartbusFeedback.service directory  
systemctl daemon-reload  
systemctl enable smartbusFeedback.service  
systemctl start smartbusFeedback.service  
