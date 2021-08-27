package com.nashtech.assetmanagementwebservice.service.impl;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.nashtech.assetmanagementwebservice.entity.Assignment;
import com.nashtech.assetmanagementwebservice.exception.*;
import com.nashtech.assetmanagementwebservice.repository.AssignmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.nashtech.assetmanagementwebservice.entity.Authority;
import com.nashtech.assetmanagementwebservice.entity.User;
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
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final AssignmentRepository assignmentRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, AssignmentRepository assignmentRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.assignmentRepository = assignmentRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<UserDTO> getAllUser() {

        List<User> users = userRepository.findByStatus("enabled");
        List<UserDTO> result = new ArrayList<>();
        for (User user : users) {
            result.add(UserMapper.toUserDTO(user));
        }
        return result;
    }

    @Override
    public UserDTO findByUserName(String username) {
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
        User updateUser = UserMapper.mergeUpdate(request, user.get());
        userRepository.save(updateUser);
        return UserMapper.toUserDTO(updateUser);
    }

    @Override
    public UserDTO disableUser(UpdateUserRequest request, int id) {
        Optional<User> user = userRepository.findById(id);
        List<Assignment> assignment = assignmentRepository.findByUser_UsernameAndStateNot(request.getUsername(), -1);
        if (assignment.size() > 0) {
            throw new BusinessException("This user got some assignment");
        }
        User changeUserStatus = UserMapper.mergeDisable(request, user.get());
        try {
            userRepository.save(changeUserStatus);
        } catch (Exception ex) {
            throw new BadRequestException("Can't change user status");
        }
        return UserMapper.toUserDTO(changeUserStatus);
    }
    @Override
    public UserDTO createUser(CreateUserRequest request) {

        User user = userRepository.findByUsername(request.getUsername());
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
    	String fullName = "%" + keyword + "%";
    	String staffCode = keyword;
        List<User> users = userRepository.findUserByFullNameOrStaffCode(fullName, staffCode);
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
        String fullName = "%" + keyword + "%";
        String staffCode = keyword;
        if (type == null && keyword == null) {
            users = userRepository.findByStatus("enabled");
        } else if (type != null && keyword == null) {
            users = userRepository.getUserByType(type);
        } else if (type == null) {
            users = userRepository.findUserByFullNameOrStaffCode(fullName, staffCode);
        } else {
            users = userRepository.findUserByFullNameOrStaffCode(fullName, staffCode);
            users = users.stream().filter(user -> user.getAuthority().getAuthority().equals(type.toUpperCase())).collect(Collectors.toList());
        }
        return users.stream().map(UserMapper::toUserDTO).collect(Collectors.toList());

    }

}
