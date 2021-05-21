/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nvurgaft.simlatdemo.controllers;

import com.nvurgaft.simlatdemo.controllers.dao.DeviceMessageService;
import com.nvurgaft.simlatdemo.models.DeviceMessage;
import java.util.List;
import java.util.UUID;
import javax.validation.constraints.NotNull;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nick
 */
@RestController
@Path("messages")
public class DeviceMessageController {

    static final Logger logger = LoggerFactory.getLogger(DeviceMessageController.class);

    @Autowired
    private DeviceMessageService deviceMessageService;

    @GET
    @Path("get-for-device")
    @Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})
    public List<DeviceMessage> getAllMessages(
            @QueryParam("id") @NotNull(message="device id cannot be null") UUID deviceId) {

        List<DeviceMessage> deviceMessages = deviceMessageService.getMessagesForDevice(deviceId);
        return deviceMessages;
    }
}
