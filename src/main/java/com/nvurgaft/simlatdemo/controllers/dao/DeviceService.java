/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nvurgaft.simlatdemo.controllers.dao;

import com.nvurgaft.simlatdemo.models.Device;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Nick
 */
@Service
public class DeviceService {
    
    @Autowired
    private DeviceRepository deviceRepository;
    
    public List<Device> getAll() {
        return deviceRepository.findAll();
    }
}
