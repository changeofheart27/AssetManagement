package com.nashtech.assetmanagementwebservice.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import com.nashtech.assetmanagementwebservice.model.request.CreateUserRequest;
import com.nashtech.assetmanagementwebservice.model.request.UpdateUserRequest;

@Service
public interface UserService {
  public List<UserDTO> getAllUser();

  public UserDTO getUserById(int id);

  public UserDTO updateUser(UpdateUserRequest request, int id);

  public UserDTO ChangeUserStatus(UpdateUserRequest request, int id);

  public UserDTO createUser(CreateUserRequest request);

  public List<UserDTO> searchByType(String keyword);

  public List<UserDTO> searchByNameOrStaffCode(String keyword);

  public List<UserDTO> getUserByType(String type);
}
