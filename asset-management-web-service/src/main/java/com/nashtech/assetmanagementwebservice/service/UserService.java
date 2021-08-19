package com.nashtech.assetmanagementwebservice.service;

import java.util.List;
import java.util.Optional;

import com.nashtech.assetmanagementwebservice.entity.User;
import com.nashtech.assetmanagementwebservice.model.request.ChangePasswordRequest;
import org.springframework.stereotype.Service;
import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import com.nashtech.assetmanagementwebservice.model.request.CreateUserRequest;
import com.nashtech.assetmanagementwebservice.model.request.UpdateUserRequest;

@Service
public interface UserService {
  public List<UserDTO> getAllUser();

  public UserDTO findUserByUsernameCustom(String username);

  public User findUserByUsername(String username);

  public UserDTO getUserById(int id);

  public UserDTO updateUser(UpdateUserRequest request, int id);

  public UserDTO ChangeUserStatus(UpdateUserRequest request, int id);

  public UserDTO createUser(CreateUserRequest request);

  public List<UserDTO> searchByNameOrStaffCode(String keyword);

  public List<UserDTO> getUserByType(String type);

  public UserDTO changePassword(ChangePasswordRequest request , String username);




}
