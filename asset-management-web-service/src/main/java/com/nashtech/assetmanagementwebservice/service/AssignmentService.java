package com.nashtech.assetmanagementwebservice.service;

import java.time.LocalDate;
import java.util.List;

import com.nashtech.assetmanagementwebservice.entity.Assignment;
import com.nashtech.assetmanagementwebservice.model.dto.AssignmentDTO;

public interface AssignmentService {
  List<AssignmentDTO> getAssignmentList();

  AssignmentDTO findAssignmentById(int id);

  AssignmentDTO createAssignment(AssignmentDTO payload);

  void delete(Integer id);

  AssignmentDTO edit(Integer id, AssignmentDTO payload);

  List<AssignmentDTO> findAssignmentsByUsername(String username);

  List<AssignmentDTO> searchAssetByAssetNameOrAssetCode(String keyword);

  List<AssignmentDTO> filterBy(Integer state, LocalDate assignedDate);

  List<AssignmentDTO> test(String keyword, Integer state, LocalDate date);
}
