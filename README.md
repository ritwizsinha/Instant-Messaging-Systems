## Using different server PUSH methods to view UI performance difference in single channel burst chatting (high density live feed messages):

- polling
- long polling
- Websockets 
- server sent events

### Aim
The aim of the project is to simulate a stress testing situation for server push methods. 

### Procedure
The most stressed chat application I could think of was to have millions of
clients messaging each other in groups one to one something like a festival time on whatsapp or during new year's time. Creating that system would be very complex as it would involve creating users, groups many collections or tables in database etc which will just offroad the project. So here I will create a single room with millions of users sending messages, something like a very popular live stream feed.


Running client:
node should be installed on system
run
```
cd client
npm install
npm start
```

Running Server:
```
cd servers
npm install
cd ../
bash run.sh
```
