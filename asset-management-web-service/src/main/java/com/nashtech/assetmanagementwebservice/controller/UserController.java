package com.nashtech.assetmanagementwebservice.controller;

import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.nashtech.assetmanagementwebservice.model.dto.AssetDTO;
import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import com.nashtech.assetmanagementwebservice.model.request.CreateUserRequest;
import com.nashtech.assetmanagementwebservice.model.request.UpdateUserRequest;
import com.nashtech.assetmanagementwebservice.service.UserService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;


@RestController
@CrossOrigin
@RequestMapping("/api/v1/admin/users")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @ApiOperation(value = "Get All user", response = UserDTO.class)
  @ApiResponses({@ApiResponse(code = 404, message = "No user found"), @ApiResponse(code = 500, message = "500")})
  @GetMapping("")
  public ResponseEntity<?> getAllAuthors() {

    List<UserDTO> users = userService.getAllUser();

    return ResponseEntity.ok(users);
  }


  @ApiOperation(value = "Get user By ID", response = UserDTO.class)
  @ApiResponses({@ApiResponse(code = 404, message = "No user found"), @ApiResponse(code = 500, message = "500")})
  @GetMapping("/{id}")
  public ResponseEntity<?> getUserById(@PathVariable int id) {
    UserDTO result = userService.getUserById(id);
    return ResponseEntity.ok(result);
  }


  @ApiOperation(value = "Create user", response = UserDTO.class)
  @ApiResponses({@ApiResponse(code = 400, message = "Post already exists in the system"), @ApiResponse(code = 500, message = "500")})
  @PostMapping("")
  public ResponseEntity<?> createPost(@Valid @RequestBody CreateUserRequest request) {
    UserDTO result = userService.createUser(request);
    return ResponseEntity.ok(result);
  }


  @ApiOperation(value = "Update user", response = UserDTO.class)
  @ApiResponses({@ApiResponse(code = 404, message = "No user found"), @ApiResponse(code = 500, message = "")})
  @PutMapping("/{id}")
  public ResponseEntity<?> updateUser(@Valid @RequestBody UpdateUserRequest request, @PathVariable int id) {
    UserDTO result = userService.updateUser(request, id);
    return ResponseEntity.ok(result);
  }


  @ApiOperation(value = "Change user status", response = UserDTO.class)
  @ApiResponses({@ApiResponse(code = 404, message = "No user found"), @ApiResponse(code = 500, message = "")})
  @PutMapping("/status/{id}")
  public ResponseEntity<?> changeUserStatus(@Valid @RequestBody UpdateUserRequest request, @PathVariable int id) {
    UserDTO result = userService.ChangeUserStatus(request, id);
    return ResponseEntity.ok(result);
  }

  @ApiOperation(value = "Search by Type of User", response = AssetDTO.class, responseContainer = "List")
  @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<UserDTO>> searchAssetByAssetNameOrAssetCode(@RequestParam String keyword) {
    System.out.println(keyword != null);
    System.out.println(keyword);
    assert keyword != null;
    if (keyword.equals("")) {
      List<UserDTO> allUser = userService.getAllUser();
      return ResponseEntity.ok(allUser);
    } else {
      List<UserDTO> users = userService.searchByType(keyword);
      return ResponseEntity.ok(users);
    }
  }


  @ApiOperation(value = "Search User By name Or staffCode", response = UserDTO.class, responseContainer = "List")
  @GetMapping(value = "/searchby", produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<List<UserDTO>> searchAssetByNameOrStaffCode(@RequestParam(name = "keyword") String keyword) {
    List<UserDTO> users = userService.searchByNameOrStaffCode(keyword);

    return ResponseEntity.ok(users);
  }

//  @ApiOperation(value = "Filter By Type of User", response = UserDTO.class, responseContainer = "List")
//  @GetMapping(value = "/filter", produces = MediaType.APPLICATION_JSON_VALUE)
//  public ResponseEntity<List<UserDTO>> getBy(@RequestParam(name = "type") String type) {
//    List<UserDTO> users = userService.getUserByType(type);
//
//    return ResponseEntity.ok(users);
//  }

}
