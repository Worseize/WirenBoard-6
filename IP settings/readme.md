Connect to Wifi IP address by default 192.168.42.1  
Settings-->Configuration-->/etc/network/interfaces--> set static local IP (for example 192.168.10.238 , with gateway 192.168.10.1 and mask 255.255.255.0)  
Connect via mobaXterm  
Check current lan IP address (eth0 or eth1)  
-----
    ifconfig  




Manual that didn`t work:
/etc/network/interfaces  
-----
    auto lo  
    iface lo inet loopback  

    allow-hotplug wlan0  
    iface wlan0 inet static  
      address 192.168.42.1  
      netmask 255.255.255.0  

    auto eth0  
    iface eth0 inet static  
      address 192.168.10.238  
      gateway 192.168.10.1  
      mtu 1500  
      netmask 255.255.255.0  

    allow-hotplug eth1  
    iface eth1 inet dhcp  
      hostname WirenBoard  
      pre-up wb-set-mac  
