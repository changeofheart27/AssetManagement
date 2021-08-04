package com.nashtech.assetmanagementwebservice.controller;

import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import com.nashtech.assetmanagementwebservice.model.request.CreateUserRequest;
import com.nashtech.assetmanagementwebservice.model.request.UpdateUserRequest;
import com.nashtech.assetmanagementwebservice.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "Get All user", response = UserDTO.class)
    @ApiResponses({
            @ApiResponse(code=404,message = "No user found"),
            @ApiResponse(code=500,message = "500")
    })
    @GetMapping("")
    public ResponseEntity<?> getAllAuthors(){

        List<UserDTO> users = userService.getAllUser();

        return ResponseEntity.ok(users);
    }



    @ApiOperation(value = "Get user By ID", response = UserDTO.class)
    @ApiResponses({
            @ApiResponse(code=404,message = "No user found"),
            @ApiResponse(code=500,message = "500")
    })
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id){
        UserDTO result = userService.getUserById(id);
        return ResponseEntity.ok(result);
    }



    @ApiOperation(value = "Create user", response = UserDTO.class)
    @ApiResponses({
            @ApiResponse(code=400,message = "Post already exists in the system"),
            @ApiResponse(code=500,message = "500")
    })
    @PostMapping("")
    public ResponseEntity<?> createPost(@Valid @RequestBody CreateUserRequest request){
        UserDTO result = userService.createUser(request);
        return ResponseEntity.ok(result);
    }




    @ApiOperation(value = "Update user", response = UserDTO.class)
    @ApiResponses({
            @ApiResponse(code=404,message = "No user found"),
            @ApiResponse(code=500,message = "")
    })
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateUserRequest request, @PathVariable int id) {
        UserDTO result = userService.updateUser(request, id);
        return ResponseEntity.ok(result);
    }
}
