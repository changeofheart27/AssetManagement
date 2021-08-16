package com.nashtech.assetmanagementwebservice.service.impl;

import com.nashtech.assetmanagementwebservice.entity.Request;
import com.nashtech.assetmanagementwebservice.model.dto.AssignmentDTO;
import com.nashtech.assetmanagementwebservice.model.dto.RequestDTO;
import com.nashtech.assetmanagementwebservice.model.mapper.AssignmentMapper;
import com.nashtech.assetmanagementwebservice.model.mapper.RequestMapper;
import com.nashtech.assetmanagementwebservice.repository.AssignmentRepository;
import com.nashtech.assetmanagementwebservice.repository.RequestRepository;
import com.nashtech.assetmanagementwebservice.service.RequestService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RequestServiceImpl implements RequestService {

    private final RequestRepository requestRepository;
    private final RequestMapper requestMapper;
    private final AssignmentRepository assignmentRepository;

    public RequestServiceImpl(RequestRepository requestRepository, RequestMapper requestMapper, AssignmentRepository assignmentRepository) {
        this.requestRepository = requestRepository;
        this.requestMapper = requestMapper;
        this.assignmentRepository = assignmentRepository;
    }

    @Override
    public List<RequestDTO> getAllRequest() {
        List<Request> requests = requestRepository.findAll();
        return requests.stream().map(requestMapper::fromEntity).collect(Collectors.toList());
    }

    @Override
    public RequestDTO create(RequestDTO requestDTO) {
        int assignID = requestDTO.getAssignmentDTO().getId();
        Request r = requestRepository.findByAssignment_Id(assignID);
        if (r != null) {
            throw new RuntimeException("Assignment ID exist");
        }
        Request request = requestMapper.fromDTO(requestDTO);
        request.setAssignment(assignmentRepository.getById(assignID));
        requestRepository.save(request);
        return requestMapper.fromEntity(request);

    }
}
