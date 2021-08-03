package com.nashtech.assetmanagementwebservice.model.mapper;

import com.nashtech.assetmanagementwebservice.entity.User;
import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import com.nashtech.assetmanagementwebservice.model.request.CreateUserRequest;
import com.nashtech.assetmanagementwebservice.model.request.UpdateUserRequest;

public class UserMapper {
    public static UserDTO toUserDTO(User user) {
        UserDTO tmp = new UserDTO();
        tmp.setId(user.getId());
        tmp.setUsername(user.getUsername());
        tmp.setFirstName(user.getFirstName());
        tmp.setLastName(user.getLastName());
        tmp.setGender(user.getGender());
        tmp.setJoinedDate(user.getJoinedDate());
        tmp.setDob(user.getDob());
        tmp.setLocation(user.getLocation());
        tmp.setStaffCode(user.getStaffCode());
        return tmp;
    }
    public static User toUser(CreateUserRequest request) {
        User user = new User();
        user.setUsername(request.getUsername());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setGender(request.getGender());
        user.setDob(request.getDob());
        user.setJoinedDate(request.getJoinedDate());


        user.setLocation(request.getLocation());
        user.setStaffCode(request.getStaffCode());
        return user;
    }

    public static User toUser(UpdateUserRequest request, int id) {
        User user = new User();
        user.setId(id);
        user.setUsername(request.getUsername());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setGender(request.getGender());
        user.setDob(request.getDob());
        user.setJoinedDate(request.getJoinedDate());

        user.setLocation(request.getLocation());
        user.setStaffCode(request.getStaffCode());
        return user;

    }
}
