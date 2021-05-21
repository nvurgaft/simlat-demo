/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nvurgaft.simlatdemo;

import com.nvurgaft.simlatdemo.controllers.DeviceController;
import com.nvurgaft.simlatdemo.controllers.DeviceMessageController;
import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

/**
 *
 * @author Nick
 */
@Configuration
@ApplicationPath("/api")
public class JerseyConfig extends ResourceConfig {

    public JerseyConfig() {
        register(DeviceController.class);
        register(DeviceMessageController.class);
    }
}
