#!/bin/bash
while : ;do socat -T1 -u udp-recvfrom:6000 exec:"/usr/bin/xxd -p - /mnt/Smartbus/streamingData.txt";msg=$(cat /mnt/Smartbus/streamingData.txt | cut -b33-99);mosquitto_pub -t "/devices/hdl-listen/controls/data/on" -m "$msg";done;
