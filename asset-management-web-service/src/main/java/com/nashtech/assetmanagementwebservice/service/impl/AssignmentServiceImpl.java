package com.nashtech.assetmanagementwebservice.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import com.nashtech.assetmanagementwebservice.exception.InternalServerException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nashtech.assetmanagementwebservice.entity.Asset;
import com.nashtech.assetmanagementwebservice.entity.Assignment;
import com.nashtech.assetmanagementwebservice.entity.User;
import com.nashtech.assetmanagementwebservice.exception.NotFoundException;
import com.nashtech.assetmanagementwebservice.model.dto.AssignmentDTO;
import com.nashtech.assetmanagementwebservice.model.mapper.AssetMapper;
import com.nashtech.assetmanagementwebservice.model.mapper.AssignmentMapper;
import com.nashtech.assetmanagementwebservice.model.mapper.UserMapper;
import com.nashtech.assetmanagementwebservice.repository.AssetRepository;
import com.nashtech.assetmanagementwebservice.repository.AssignmentRepository;
import com.nashtech.assetmanagementwebservice.repository.UserRepository;
import com.nashtech.assetmanagementwebservice.service.AssignmentService;

@Service
@Transactional
public class AssignmentServiceImpl implements AssignmentService {
    private final AssignmentRepository assignmentRepository;
    private final AssetRepository assetRepository;
    private final UserRepository userRepository;
    private final AssignmentMapper assignmentMapper;
    private final AssetMapper assetMapper;
    private final Logger log = LoggerFactory.getLogger(AssignmentServiceImpl.class);

    @Autowired
    public AssignmentServiceImpl(AssignmentRepository assignmentRepository, AssetRepository assetRepository, UserRepository userRepository, AssetMapper assetMapper) {
        this.assignmentRepository = assignmentRepository;
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
        this.assetMapper = assetMapper;
        assignmentMapper = new AssignmentMapper();
    }

    @Override
    public List<AssignmentDTO> getAssignmentList() {
        List<Assignment> assignments = assignmentRepository.findAll();
        return assignments.stream().map(assignmentMapper::fromEntity).collect(Collectors.toList());
    }

    @Override
    public AssignmentDTO findAssignmentById(int id) {
        Assignment assignment = assignmentRepository.getById(id);
        if (assignment == null) {
            throw new NotFoundException("No record found with id " + id);
        }
        return assignmentMapper.fromEntity(assignment);
    }

    @Override
    public AssignmentDTO createAssignment(AssignmentDTO payload) {
        User user = userRepository.getById(payload.getUserDTO().getId());
        Asset asset = assetRepository.getById(payload.getAssetDTO().getId());
        Assignment assignment = assignmentMapper.fromDTO(payload);
        assignment.setAsset(asset);
        assignment.setUser(user);
        assignmentRepository.save(assignment);
        return assignmentMapper.fromEntity(assignment);
    }

    @Override
    public void delete(Integer id) {
        Assignment assignment = assignmentRepository.getById(id);
        if (assignment.getState() == 4) {
            throw new InternalServerException("Asset is current assigned to someone");
        }
        assignmentRepository.delete(assignment);
    }

    @Override
    public AssignmentDTO edit(AssignmentDTO payload) {
        assignmentRepository.saveAssign(payload.getAssetDTO().getId(),payload.getUserDTO().getId(),payload.getId());
        return payload;
    }


}
