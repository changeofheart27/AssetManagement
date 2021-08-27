package com.nashtech.assetmanagementwebservice.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.nashtech.assetmanagementwebservice.entity.User;
import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import com.nashtech.assetmanagementwebservice.model.request.ChangePasswordRequest;
import com.nashtech.assetmanagementwebservice.model.request.CreateUserRequest;
import com.nashtech.assetmanagementwebservice.model.request.UpdateUserRequest;

@Service
public interface UserService {
  public List<UserDTO> getAllUser();

  public UserDTO findByUserName(String username);

  public User findUserByUsername(String username);

  public UserDTO getUserById(int id);

  public UserDTO updateUser(UpdateUserRequest request, int id);

  public UserDTO disableUser(UpdateUserRequest request, int id);

  public UserDTO createUser(CreateUserRequest request);

  public List<UserDTO> searchByNameOrStaffCode(String keyword);

  public List<UserDTO> getUserByType(String type, String keyword);

  public UserDTO changePassword(ChangePasswordRequest request, String username);



}
