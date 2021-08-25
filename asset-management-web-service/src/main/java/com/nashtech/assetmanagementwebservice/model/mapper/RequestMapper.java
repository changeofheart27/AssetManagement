package com.nashtech.assetmanagementwebservice.model.mapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.nashtech.assetmanagementwebservice.entity.Assignment;
import com.nashtech.assetmanagementwebservice.entity.Request;
import com.nashtech.assetmanagementwebservice.model.dto.RequestDTO;

@Component
public class RequestMapper {
  @Autowired
  private AssignmentMapper assignmentMapper;

  public RequestDTO fromEntity(Request entity) {
    RequestDTO dto = new RequestDTO();
    dto.setId(entity.getId());
    // dto.setState(entity.getState());
    dto.setReturnedDate(entity.getReturnedDate());
    dto.setAccepted_by(entity.getUsername());
    Assignment assignment = entity.getAssignment();
    dto.setAssignmentDTO(assignmentMapper.fromEntity(assignment));
    return dto;
  }

  public Request fromDTO(RequestDTO payload) {
    Request request = new Request();
    Assignment assignment = new Assignment();
    request.setUsername(payload.getAccepted_by());
    request.setId(payload.getId());
    request.setReturnedDate(payload.getReturnedDate());
    // request.setState(payload.getState());
    request.setAssignment(assignmentMapper.fromDTO(payload.getAssignmentDTO()));
    return request;
  }
}
