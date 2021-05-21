/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nvurgaft.simlatdemo.controllers.dao;

import com.nvurgaft.simlatdemo.models.DeviceMessage;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Nick
 */
@Repository
public interface DeviceMessageRepository extends JpaRepository<DeviceMessage, UUID> {
    
}
