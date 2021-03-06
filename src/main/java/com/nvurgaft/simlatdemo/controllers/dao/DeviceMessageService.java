/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nvurgaft.simlatdemo.controllers.dao;

import com.nvurgaft.simlatdemo.models.DeviceMessage;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import static java.util.stream.Collectors.toList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

/**
 *
 * @author Nick
 */
@Service
public class DeviceMessageService {

    @Autowired
    private DeviceMessageRepository deviceMessageRepository;

    public DeviceMessage addMessage(DeviceMessage message) {
        return this.deviceMessageRepository.save(message);
    }

    public List<DeviceMessage> addMessages(Iterable<DeviceMessage> messages) {
        return this.deviceMessageRepository.saveAll(messages);
    }

    public List<DeviceMessage> getMessagesForDevices(List<UUID> deviceIds) {
        if (deviceIds == null || deviceIds.isEmpty()) {
            throw new IllegalArgumentException("list of device ids is blank");
        }
        // TODO: improve
        return this.deviceMessageRepository.findAll().stream()
                .filter((DeviceMessage message) -> {
                    return deviceIds.contains(message.getDeviceId());
                })
                .collect(toList());
    }

    public List<DeviceMessage> getDeviceStatusForDevice(UUID deviceId) {
        if (deviceId == null) {
            throw new IllegalArgumentException("deviceId is null");
        }

        // TODO: improve
        return this.deviceMessageRepository.findAll(Sort.by(Sort.Direction.DESC, "date_created")).stream()
                .filter((DeviceMessage message) -> {
                    return Objects.equals(deviceId, message.getDeviceId());
                })
                .filter((DeviceMessage message) -> {
                    return DeviceMessage.MessageType.DEVICE_STATUS.equals(message.getType());
                })
                .collect(toList());
    }

    public void deleteAll() {
        this.deviceMessageRepository.deleteAll();
    }
}
