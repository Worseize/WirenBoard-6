#!/bin/bash

# Используем socat с fork для параллельной обработки
exec socat -T1 -u UDP-RECVFROM:6000,fork SYSTEM:'
    # Конвертируем данные в hex
    data=$(cat - | xxd -p)
    
    # Извлекаем нужную часть
    msg=$(echo -n "$data" | cut -b33-99)
    
    # Отправляем в MQTT если сообщение не пустое
    if [ -n "$msg" ]; then
        # Лимит времени отправки (5 секунд)
        timeout 5 mosquitto_pub -t "/devices/hdl-listen/controls/data/on" -m "$msg" || \
        echo "$(date): MQTT timeout: $msg" >> /var/log/smartbus.log
    fi
'
