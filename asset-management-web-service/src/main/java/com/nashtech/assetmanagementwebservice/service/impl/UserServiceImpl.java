package com.nashtech.assetmanagementwebservice.service.impl;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.nashtech.assetmanagementwebservice.entity.User;
import com.nashtech.assetmanagementwebservice.exception.InternalServerException;
import com.nashtech.assetmanagementwebservice.exception.NotFoundException;
import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import com.nashtech.assetmanagementwebservice.model.mapper.UserMapper;
import com.nashtech.assetmanagementwebservice.model.request.CreateUserRequest;
import com.nashtech.assetmanagementwebservice.model.request.UpdateUserRequest;
import com.nashtech.assetmanagementwebservice.repository.UserRepository;
import com.nashtech.assetmanagementwebservice.service.UserService;

@Service
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;

  @Autowired
  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public List<UserDTO> getAllUser() {
    List<User> users = userRepository.findUserEnabled();
    List<UserDTO> result = new ArrayList<>();
    for (User user : users) {
      result.add(UserMapper.toUserDTO(user));
    }
    return result;
  }

  @Override
  public UserDTO getUserById(int id) {
    Optional<User> user = userRepository.findById(id);
    if (user.isEmpty()) {
      throw new NotFoundException("No user found");
    }
    return UserMapper.toUserDTO(user.get());
  }

  @Override
  public UserDTO updateUser(UpdateUserRequest request, int id) {
    Optional<User> user = userRepository.findById(id);
    if (user.isEmpty()) {
      throw new NotFoundException("No user found");
    }

    User updateUser = UserMapper.toUser(request, id);
    try {
      userRepository.save(updateUser);
    } catch (Exception ex) {
      throw new InternalServerException("Can't update user");
    }

    return UserMapper.toUserDTO(updateUser);
  }

  @Override
  public UserDTO ChangeUserStatus(UpdateUserRequest request, int id) {
    Optional<User> user = userRepository.findById(id);
    String status = user.get().getStatus();
    User changeUserStatus = UserMapper.toUser(request, id);
    try {
      if (status.equals("enabled")) {

        changeUserStatus.setStatus("disabled");
      } else {
        changeUserStatus.setStatus("enabled");
      }
      userRepository.save(changeUserStatus);
    } catch (Exception ex) {
      throw new InternalServerException("Can't change user status");
    }
    return UserMapper.toUserDTO(changeUserStatus);
  }



  @Override
  public UserDTO createUser(CreateUserRequest request) {
    long count = userRepository.count() + 1;
    String staffCode = "SD" + String.format("%04d", count);
    User user = UserMapper.toUser(request);
    String username = user.getFirstName().toLowerCase();
    String lastName = user.getLastName().toLowerCase();
    String[] tmp = lastName.split("\\s+");
    for (int i = 0; i < tmp.length; i++) {
      username = username + tmp[i].charAt(0);
    }
    Integer countUsername = userRepository.countByDuplicateFullName(username);
    if (countUsername > 0) {
      user.setUsername(username + countUsername.toString());
    } else {
      user.setUsername(username);
    }
    DateTimeFormatter formatters = DateTimeFormatter.ofPattern("ddMMuuuu");
    String dob = user.getDob().format(formatters);
    user.setStaffCode(staffCode);
    user.setStatus("enabled");
    user.setPassword(username + "@" + dob);
    user.setLocation("HN");
    userRepository.save(user);
    return UserMapper.toUserDTO(user);
  }

  @Override
  public List<UserDTO> searchByType(String keyword) {
    System.out.println("find user by type");
    List<User> users = userRepository.findUserByType(keyword);
    return users.stream().map(UserMapper::toUserDTO).collect(Collectors.toList());
  }

  @Override
  public List<UserDTO> searchByNameOrStaffCode(String keyword) {
    List<User> users = userRepository.findByNameOrStaffCode(keyword);
    List<UserDTO> result = new ArrayList<>();
    for (User user : users) {
      result.add(UserMapper.toUserDTO(user));
    }
    return result;

  }

  @Override
  public List<UserDTO> getUserByType(String type) {
    List<User> users = userRepository.getUserByType(type);
    List<UserDTO> result = new ArrayList<>();
    for (User user : users) {
      result.add(UserMapper.toUserDTO(user));
    }
    return result;

  }

}
