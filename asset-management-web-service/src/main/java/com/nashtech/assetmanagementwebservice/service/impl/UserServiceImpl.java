package com.nashtech.assetmanagementwebservice.service.impl;

import com.nashtech.assetmanagementwebservice.entity.User;
import com.nashtech.assetmanagementwebservice.exception.DuplicateRecordException;
import com.nashtech.assetmanagementwebservice.exception.InternalServerException;
import com.nashtech.assetmanagementwebservice.exception.NotFoundException;
import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import com.nashtech.assetmanagementwebservice.model.mapper.UserMapper;
import com.nashtech.assetmanagementwebservice.model.request.CreateUserRequest;
import com.nashtech.assetmanagementwebservice.model.request.UpdateUserRequest;
import com.nashtech.assetmanagementwebservice.repository.UserRepository;
import com.nashtech.assetmanagementwebservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public List<UserDTO> getAllUser() {
        List<User> users = userRepository.findAll();
        List<UserDTO> result = new ArrayList<>();
        for (User user:users){
            result.add(UserMapper.toUserDTO(user));
        }
        return result;
    }

    @Override
    public UserDTO getUserById(int id) {
        Optional<User> user = userRepository.findById(id);
        if(user.isEmpty()) {
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
    public void deleteUser(int id) {

    }

    @Override
    public UserDTO createUser(CreateUserRequest request) {
        User user = userRepository.findByUsername(request.getUsername());
        if (user != null) {
            throw new DuplicateRecordException("User name already exist !");
        }
        long count = userRepository.count();
        String staffCode = "SD" + String.format("%04d", count);

        user = UserMapper.toUser(request);
        user.setStaffCode(staffCode);
        userRepository.save(user);
        return UserMapper.toUserDTO(user);
    }
}