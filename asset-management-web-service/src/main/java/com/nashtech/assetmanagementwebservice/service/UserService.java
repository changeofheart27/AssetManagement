package com.nashtech.assetmanagementwebservice.service;

import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import com.nashtech.assetmanagementwebservice.model.request.CreateUserRequest;
import com.nashtech.assetmanagementwebservice.model.request.UpdateUserRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public List<UserDTO> getAllUser();
    public UserDTO getUserById(int id);
    public UserDTO updateUser(UpdateUserRequest request, int id);
    public UserDTO ChangeUserStatus(UpdateUserRequest request, int id);

    public UserDTO createUser(CreateUserRequest request);
}
