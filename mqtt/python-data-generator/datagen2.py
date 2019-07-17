import paho.mqtt.client as mqttClient
import time
import random
import time
from timeloop import Timeloop
from datetime import timedelta
from datetime import datetime
 
nodeID = str(2)

def on_connect(client, userdata, flags, rc):
 
    if rc == 0:
        print("Connected to broker")
        global Connected                
        Connected = True                 
    else:
        print("Connection failed")
 
Connected = False   
 
broker_address= "localhost"
port = 1883
#user = "zwfxzaip"
#password = "8rQqi99icKka"
 
client = mqttClient.Client("NodeData")               
#client.username_pw_set(user, password=password)    
client.on_connect= on_connect                      
client.connect(broker_address, port=port)          
 
client.loop_start()        
 
while Connected != True:    
    time.sleep(0.1)
 
try:
    tl = Timeloop()

    @tl.job(interval=timedelta(seconds=5))
    def sample_job_every_10s():
        temp = str(round(random.uniform(15,30),3))
        humidity = str(round(random.uniform(20,50),3))
        pressure = str(round(random.uniform(1.0,1.2),3))
        now = str(datetime.now())
        val_list = nodeID + ',' + temp + ',' + humidity + ',' + pressure + ',' + now
        publish_list = str(val_list)
        print("Published Value : ", publish_list)
        client.publish("nodeData", publish_list)
        
    tl.start(block=True) 
 
except KeyboardInterrupt:
 
    client.disconnect()
    client.loop_stop()
