package com.nashtech.assetmanagementwebservice.service.impl;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.nashtech.assetmanagementwebservice.entity.Authority;
import com.nashtech.assetmanagementwebservice.entity.User;
import com.nashtech.assetmanagementwebservice.exception.CustomExceptionHandler;
import com.nashtech.assetmanagementwebservice.exception.DuplicateRecordException;
import com.nashtech.assetmanagementwebservice.exception.InternalServerException;
import com.nashtech.assetmanagementwebservice.exception.NotFoundException;
import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import com.nashtech.assetmanagementwebservice.model.mapper.UserMapper;
import com.nashtech.assetmanagementwebservice.model.request.ChangePasswordRequest;
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

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    CustomExceptionHandler customExceptionHandler;

    @Override
    public List<UserDTO> getAllUser() {

        List<User> users = userRepository.findByStatus("enabled");

        // List<User> users = userRepository.findUserEnabled();

        List<UserDTO> result = new ArrayList<>();
        for (User user : users) {
            result.add(UserMapper.toUserDTO(user));
        }
        return result;
    }

    @Override
    public UserDTO findUserByUsernameCustom(String username) {
        User user = userRepository.findByUsername(username);

        return UserMapper.toUserDTO(user);

    }


    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username);
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
        // int idAuthority = userRepository.findAuthorityByUserId(id);
        // User updateUser = UserMapper.toUser(request, id);
        // Authority updateAuthority = UserMapper.toAuthority(request, idAuthority );
        User updateUser = UserMapper.mergeUpdate(request, user.get());
        try {

            // updateAuthority.setUser(updateUser);
            // updateUser.setAuthority(updateAuthority);


            userRepository.save(updateUser);
        } catch (Exception ex) {
            throw new InternalServerException("Can't update user");
        }

        return UserMapper.toUserDTO(updateUser);
    }

    @Override
    public UserDTO ChangeUserStatus(UpdateUserRequest request, int id) {
        Optional<User> user = userRepository.findById(id);
        User changeUserStatus = UserMapper.mergeDisable(request, user.get());
        try {
            userRepository.save(changeUserStatus);
        } catch (Exception ex) {
            throw new InternalServerException("Can't change user status");
        }
        return UserMapper.toUserDTO(changeUserStatus);
    }


    @Override
    public UserDTO createUser(CreateUserRequest request) {

        User user = userRepository.findByUsername(request.getUsername());


        if (user != null) {
            throw new DuplicateRecordException("User name already exist !");
        }

        long count = userRepository.count() + 1;
        String staffCode = "SD" + String.format("%04d", count);
        user = UserMapper.toUser(request);
        StringBuilder username = new StringBuilder(user.getFirstName().toLowerCase());
        String lastName = user.getLastName().toLowerCase();
        String[] tmp = lastName.split("\\s+");
        for (String s : tmp) {
            username.append(s.charAt(0));
        }
        String finalUsername = username.toString();
        Integer countUsername = userRepository.countByDuplicateFullName(username.toString());
        if (countUsername > 0) {
            finalUsername = username.toString() + countUsername.toString();
            user.setUsername(finalUsername);
        } else {
            user.setUsername(finalUsername);
        }
        DateTimeFormatter formatters = DateTimeFormatter.ofPattern("ddMMyyyy");
        String dob = user.getDob().format(formatters);
        user.setStaffCode(staffCode);


    user.setStatus("enabled");
    user.setPassword(passwordEncoder.encode(finalUsername + "@" + dob));
    user.setDefaultPassword(finalUsername + "@" + dob);
    user.setFirstLogin("true");
    user.setLocation("HN");


        Authority authority = new Authority();
        authority.setAuthority(request.getAuthority());

        authority.setUser(user);


        user.setAuthority(authority);

        userRepository.saveAndFlush(user);

        return UserMapper.toUserDTO(user);
    }


    @Override
    public List<UserDTO> searchByNameOrStaffCode(String keyword) {
        List<User> users = userRepository.findByUsernameContainsOrStaffCodeContains(keyword, keyword);
        List<UserDTO> result = new ArrayList<>();
        for (User user : users) {
            result.add(UserMapper.toUserDTO(user));
        }
        return result;

    }

    @Override
    public UserDTO changePassword(ChangePasswordRequest request, String username) {

        User updateUser = UserMapper.toUser(request, username);




    try {
      updateUser.setFirstLogin("false");
      updateUser.setPassword(passwordEncoder.encode(request.getPassword()));
      userRepository.updatePassword(updateUser.getPassword(), username);
    } catch (Exception ex) {
      throw new InternalServerException("Can't update password");
    }

        return UserMapper.toUserDTO(updateUser);


    }


    @Override
    public List<UserDTO> getUserByType(String type, String keyword) {
        List<User> users = new ArrayList<>();
        if (type == null && keyword == null) {
            users = userRepository.findByStatus("enabled");
        } else if (type != null && keyword == null) {
            users = userRepository.getUserByType(type);
        } else if (type == null) {
            users = userRepository.findByUsernameContainsOrStaffCodeIs(keyword, null);
        } else {
            users = userRepository.findByUsernameContainsOrStaffCodeIs(keyword, type);
            users = users.stream().filter(user -> user.getAuthority().getAuthority().equals(type.toUpperCase())).collect(Collectors.toList());
        }

        return users.stream().map(UserMapper::toUserDTO).collect(Collectors.toList());

    }

}
