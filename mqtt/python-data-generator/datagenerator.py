import paho.mqtt.client as mqttClient
import time
import random
import time
from timeloop import Timeloop
from datetime import timedelta
 
def on_connect(client, userdata, flags, rc):
 
    if rc == 0:
        print("Connected to broker")
        global Connected                
        Connected = True                 
    else:
        print("Connection failed")
 
Connected = False   
 
broker_address= "m24.cloudmqtt.com"
port = 10174
user = "zwfxzaip"
password = "8rQqi99icKka"
 
client = mqttClient.Client("Python")               
client.username_pw_set(user, password=password)    
client.on_connect= on_connect                      
client.connect(broker_address, port=port)          
 
client.loop_start()        
 
while Connected != True:    
    time.sleep(0.1)
 
try:
    tl = Timeloop()

    @tl.job(interval=timedelta(seconds=5))
    def sample_job_every_10s():
        temp = random.uniform(15,30)
        humidity = random.uniform(20,50)
        pressure = random.uniform(1.0,1.2)
        val_list = [temp, humidity, pressure]
        print("Published Value : ", val_list)
        client.publish("python/temp",temp)
        client.publish("python/humid",humidity)
        client.publish("python/press",pressure)
        
    tl.start(block=True)
 
except KeyboardInterrupt:
 
    client.disconnect()
    client.loop_stop()
