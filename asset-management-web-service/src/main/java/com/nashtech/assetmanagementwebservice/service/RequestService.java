package com.nashtech.assetmanagementwebservice.service;

import com.nashtech.assetmanagementwebservice.model.dto.AssignmentDTO;
import com.nashtech.assetmanagementwebservice.model.dto.RequestDTO;

import java.util.List;


public interface RequestService {
    List<RequestDTO> getAllRequest();
}
