/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nvurgaft.simlatdemo.controllers;

import com.nvurgaft.simlatdemo.controllers.dao.DeviceService;
import com.nvurgaft.simlatdemo.models.Device;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nick
 */
@RestController
@Path("devices")
public class DeviceController {

    static final Logger logger = LoggerFactory.getLogger(DeviceController.class);

    @Autowired
    private DeviceService deviceService;

    @GET
    @Path("get-all")
    @Produces({MediaType.APPLICATION_JSON, MediaType.TEXT_PLAIN})
    public Response getAllDevices() {
        try {
            List<Device> devices = deviceService.getAll();
            return Response.ok(devices)
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (Throwable ex) {
            return Response.serverError()
                    .entity("something went wrong")
                    .type(MediaType.TEXT_PLAIN).build();
        }
    }
}
