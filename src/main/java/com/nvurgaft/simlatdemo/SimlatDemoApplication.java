package com.nvurgaft.simlatdemo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nvurgaft.simlatdemo.controllers.dao.DeviceMessageService;
import com.nvurgaft.simlatdemo.controllers.dao.DeviceService;
import com.nvurgaft.simlatdemo.models.Device;
import com.nvurgaft.simlatdemo.models.DeviceMessage;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SimlatDemoApplication implements CommandLineRunner {

    static final Logger logger = LoggerFactory.getLogger(SimlatDemoApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(SimlatDemoApplication.class, args);
    }

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private DeviceMessageService deviceMessageService;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Generating mock data");

        Device device1 = new Device();
        device1.setName("Ludwig");

        Device device2 = new Device();
        device2.setName("Murray");

        Device device3 = new Device();
        device3.setName("Hans");

        deviceService.addDevices(Arrays.asList(device1, device2, device3));

        List<DeviceMessage> messages = new ArrayList<>();
        int id = 745;
        for (Device device : deviceService.getAll()) {

            try {
                final int _id = id++;
                DeviceMessage statusMessage = new DeviceMessage();
                statusMessage.setDateCreated(ZonedDateTime.now());
                statusMessage.setDeviceId(device.getId());
                statusMessage.setType(DeviceMessage.MessageType.DEVICE_STATUS);

                Map<String, Object> statusJson = new HashMap<>();
                statusJson.put("type", DeviceMessage.MessageType.DEVICE_STATUS);
                statusJson.put("id", _id);
                Map<String, Object> statusData = new HashMap<>();
                statusData.put("timestamp", 60 * 60 * 1000);
                statusData.put("estimatedRemainingTime", 78 * 60);
                statusData.put("batteryPercentage", 64);
                statusJson.put("data", statusData);
                statusMessage.setMessage(objectMapper.writeValueAsString(statusJson));
                messages.add(statusMessage);

                DeviceMessage positionMessage = new DeviceMessage();
                positionMessage.setDateCreated(ZonedDateTime.now());
                positionMessage.setDeviceId(device.getId());
                positionMessage.setType(DeviceMessage.MessageType.DEVICE_GLOBAL_POSITION);

                Map<String, Object> positionJson = new HashMap<>();
                positionJson.put("type", DeviceMessage.MessageType.DEVICE_GLOBAL_POSITION);
                positionJson.put("id", _id);
                Map<String, Object> positionData = new HashMap<>();
                positionData.put("timestamp", 60 * 60 * 1000);
                positionData.put("lat", 40.36 + (Math.random()/100));
                positionData.put("lon", -111.90 + (Math.random()/100));
                positionData.put("alt", 0);
                positionJson.put("data", positionData);
                positionMessage.setMessage(objectMapper.writeValueAsString(positionJson));
                messages.add(positionMessage);

            } catch (JsonProcessingException jpe) {
                logger.error("Exception thrown while generating messages", jpe);
            }
            deviceMessageService.addMessages(messages);
        }
    }

    @PreDestroy
    private void shutdown() {
        logger.info("Clearning devices table");
        deviceMessageService.deleteAll();
        deviceService.deleteAll();
    }

}
