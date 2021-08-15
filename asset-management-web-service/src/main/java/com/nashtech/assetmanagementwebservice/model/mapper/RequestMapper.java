package com.nashtech.assetmanagementwebservice.model.mapper;

import com.nashtech.assetmanagementwebservice.entity.Assignment;
import com.nashtech.assetmanagementwebservice.entity.Request;
import com.nashtech.assetmanagementwebservice.entity.User;
import com.nashtech.assetmanagementwebservice.model.dto.AssignmentDTO;
import com.nashtech.assetmanagementwebservice.model.dto.RequestDTO;
import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RequestMapper {
    @Autowired
    private AssignmentMapper assignmentMapper;

    public RequestDTO fromEntity(Request entity) {
        RequestDTO dto = new RequestDTO();
        dto.setId(entity.getId());
        dto.setState(entity.getState());
        dto.setReturned_date(entity.getReturned_date());
        Assignment assignment = entity.getAssignment();
        User user = entity.getUser();
        dto.setUserDTO(UserMapper.toUserDTO(user));
        dto.setAssignmentDTO(assignmentMapper.fromEntity(assignment));
        return dto;
    }

    public Request fromDTO(RequestDTO payload) {
        Request request = new Request();
        Assignment assignment = new Assignment();
        User user = new User();
        request.setId(payload.getId());
        request.setReturned_date(payload.getReturned_date());
        request.setState(payload.getState());
        request.setAssignment(assignmentMapper.fromDTO(payload.getAssignmentDTO()));
//        request.setUser(UserMapper.);

        return request;
    }
}
