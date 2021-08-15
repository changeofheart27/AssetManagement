package com.nashtech.assetmanagementwebservice.controller;

import com.nashtech.assetmanagementwebservice.model.dto.AssignmentDTO;
import com.nashtech.assetmanagementwebservice.model.dto.RequestDTO;
import com.nashtech.assetmanagementwebservice.service.RequestService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/v1")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @ApiOperation(value = "get all request assignment")
    @GetMapping(value = "/request")
    public ResponseEntity<List<RequestDTO>> getAll() {
        List<RequestDTO> requests = requestService.getAllRequest();
        return ResponseEntity.ok(requests);
    }
}
