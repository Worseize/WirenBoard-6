#!/bin/sh
message=$(split -b 2 --filter='cat;echo -n "\x"' <<< 'rrc0a80ae7534d415254434c4f5544aaaa'"$1" | sed 's/^..//;s/..$//')
ip="192.168.10.100"
port="6000"
echo -e -n "$message" | nc -u -w1 "$ip" "$port"
