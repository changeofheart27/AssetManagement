package com.nashtech.assetmanagementwebservice.controller;

import com.nashtech.assetmanagementwebservice.model.dto.AssignmentDTO;
import com.nashtech.assetmanagementwebservice.model.dto.RequestDTO;
import com.nashtech.assetmanagementwebservice.service.RequestService;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @ApiOperation(value = "Create Returning request")
    @PostMapping(value = "/request/create")
    public ResponseEntity<RequestDTO> create(@RequestBody RequestDTO requestDTO){
        requestService.create(requestDTO);
        return ResponseEntity.ok(requestDTO);
    }
}
