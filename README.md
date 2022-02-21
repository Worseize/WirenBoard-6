# WirenBoard Computer and Controller
Voice control via Openhab + Homekit integration

-----
Место на диске ограничено , поэтому WB6 должен иметь больше памяти для этого переносим системные файлы на флэш USB1
clear wirenboard 
fdisk -l
df -h

mount /usr and /var
chmod -R 754 /usr and /var
/etc/fstab.wb редактируем добавляя требование автоматического монтирования флэшки при перезагрузках и выключениях
-----

apt install -y openjdk-11-jre

# В /etc/profile записываем текст ниже (ссылка на текущую версию Java и путь к папке bin той # же Java)

JAVA_HOME=/usr/lib/jvm/java-11-openjdk-armhf/
PATH=$PATH:$JAVA_HOME/bin

В консоле прописываем 
source /etc/profile
reboot

apt install -y openhab
/bin/systemctl daemon-reload
/bin/systemctl enable openhab.service
/bin/systemctl start openhab.service

файл конфигурации openHab.service лежит тут:
/usr/lib/systemd/system/openhab.service
Его надо переместить сюда:
/lib/systemd/system

/bin/systemctl daemon-reload
/bin/systemctl stop openhab.service
/bin/systemctl disable openhab.service

Теперь для запуска OH пользуемся сокращённой командой
systemctl daemon-reload
systemctl enable openhab.service
systemctl start openhab.service
===========================
Вот это убрать внутри файла: ПОКА ЧТО ЭТО НЕ ТОЧНО , ЛУЧШЕ ОСТАВИТЬ ПОКА НЕ БУДУТ ПРОБЛЕМЫ (ЕСЛМ ОТВАЛИВАЕТСЯ ПОСТОЯННО СЕРВИС , ТО УБРАТЬ)
After=network-online.target
===========================

Возможны ошибки с загрузкой скриптов из за разного формата данных openhab отправляет всегда string , а wirenboard хочет bolean для switch 
лечил такой командой в течении 5 минут вылечилось:

systemctl restart wb-rules



-------
RESET PAIRINGS
https://www.openhab.org/docs/administration/console.html
ssh -p 8101 openhab@localhost
1) pass for root
2) The default username/password is openhab:habopen, so enter habopen at the password prompt.
