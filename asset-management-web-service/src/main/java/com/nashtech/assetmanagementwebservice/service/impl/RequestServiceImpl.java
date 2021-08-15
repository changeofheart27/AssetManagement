package com.nashtech.assetmanagementwebservice.service.impl;

import com.nashtech.assetmanagementwebservice.entity.Assignment;
import com.nashtech.assetmanagementwebservice.entity.Request;
import com.nashtech.assetmanagementwebservice.model.dto.RequestDTO;
import com.nashtech.assetmanagementwebservice.model.mapper.AssignmentMapper;
import com.nashtech.assetmanagementwebservice.model.mapper.RequestMapper;
import com.nashtech.assetmanagementwebservice.repository.RequestRepository;
import com.nashtech.assetmanagementwebservice.service.RequestService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;

    public RequestServiceImpl(RequestRepository requestRepository , RequestMapper requestMapper) {
        this.requestRepository = requestRepository;
        this.requestMapper = requestMapper;
    }

    @Override
    public List<RequestDTO> getAllRequest() {
        List<Request> requests = requestRepository.findAll();
        return requests.stream().map(requestMapper::fromEntity).collect(Collectors.toList());
    }
}
