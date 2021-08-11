package com.nashtech.assetmanagementwebservice.service;

import java.util.List;

import com.nashtech.assetmanagementwebservice.model.dto.AssetDTO;
import com.nashtech.assetmanagementwebservice.model.dto.AssignmentDTO;
import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;

public interface AssignmentService {
	List<AssignmentDTO> getAssignmentList();
	
	AssignmentDTO findAssignmentById(int id);
	
	AssignmentDTO createAssignment(AssignmentDTO payload);
}
