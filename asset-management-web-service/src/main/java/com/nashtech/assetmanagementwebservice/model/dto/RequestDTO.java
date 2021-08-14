package com.nashtech.assetmanagementwebservice.model.dto;

import com.nashtech.assetmanagementwebservice.entity.User;

import java.time.LocalDate;

public class RequestDTO {
    private int id;
    private AssignmentDTO assignmentDTO;
    private UserDTO userDTO;
    private LocalDate returned_date;
    private int state;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public AssignmentDTO getAssignmentDTO() {
        return assignmentDTO;
    }

    public void setAssignmentDTO(AssignmentDTO assignmentDTO) {
        this.assignmentDTO = assignmentDTO;
    }

    public UserDTO getUserDTO() {
        return userDTO;
    }

    public void setUserDTO(UserDTO userDTO) {
        this.userDTO = userDTO;
    }

    public LocalDate getReturned_date() {
        return returned_date;
    }

    public void setReturned_date(LocalDate returned_date) {
        this.returned_date = returned_date;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }

}