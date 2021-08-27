package com.nashtech.assetmanagementwebservice.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.nashtech.assetmanagementwebservice.exception.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.nashtech.assetmanagementwebservice.entity.Asset;
import com.nashtech.assetmanagementwebservice.entity.Assignment;
import com.nashtech.assetmanagementwebservice.entity.User;
import com.nashtech.assetmanagementwebservice.model.dto.AssignmentDTO;
import com.nashtech.assetmanagementwebservice.model.mapper.AssignmentMapper;
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
    private final Logger log = LoggerFactory.getLogger(AssignmentServiceImpl.class);

    @Autowired
    public AssignmentServiceImpl(AssignmentRepository assignmentRepository, AssetRepository assetRepository, UserRepository userRepository) {
        this.assignmentRepository = assignmentRepository;
        this.assetRepository = assetRepository;
        this.userRepository = userRepository;
        assignmentMapper = new AssignmentMapper();
    }

    @Override
    public List<AssignmentDTO> getAssignmentList() {
        List<Assignment> assignments = assignmentRepository.findByStateNot(-1);
        return assignments.stream().map(assignmentMapper::fromEntity).collect(Collectors.toList());
    }

    @Override
    public AssignmentDTO findAssignmentById(int id) {
        Assignment assignment = assignmentRepository.getById(id);
        return assignmentMapper.fromEntity(assignment);
    }

    @Override
    public AssignmentDTO createAssignment(AssignmentDTO payload) {
        Assignment a = assignmentRepository.findByAsset_Id(payload.getAssetDTO().getId());
        if (a != null && a.getState() != -1){
            throw new BadRequestException("Asset id exist & not complete yet");
        }
        User user = userRepository.getById(payload.getUserDTO().getId());
        Asset asset = assetRepository.getById(payload.getAssetDTO().getId());
        asset.setState(4);
        assetRepository.save(asset);
        Assignment assignment = assignmentMapper.fromDTO(payload);
        assignment.setAsset(asset);
        assignment.setUser(user);
        assignment.setAssignedBy(payload.getAssignedBy());
        assignmentRepository.save(assignment);
        return assignmentMapper.fromEntity(assignment);
    }

    @Override
    public void delete(Integer id) {
        Assignment assignment = assignmentRepository.getById(id);
        if (assignment.getState() == 4) {
            throw new BadRequestException("Asset is current assigned to someone");
        }
        Asset asset = assetRepository.getById(assignment.getAsset().getId());
        asset.setState(0);
        assetRepository.save(asset);
        assignmentRepository.delete(assignment);
    }

    @Override
    public AssignmentDTO edit(Integer id, AssignmentDTO payload) {
        Assignment oldAssignment = assignmentRepository.getById(id);
        Asset oldAsset = oldAssignment.getAsset();
        if (oldAsset.getId() != payload.getAssetDTO().getId()) {
            oldAsset.setState(0);
            assetRepository.save(oldAsset);
        }
        log.info(payload.getAssetDTO().getId() + " " + payload.getUserDTO().getId() + " " + id);
        Asset newAsset = assetRepository.getById(payload.getAssetDTO().getId());
        newAsset.setState(4);
        assetRepository.save(newAsset);
        assignmentRepository.saveAssign(payload.getAssetDTO().getId(), payload.getUserDTO().getId(), id, payload.getState(), payload.getAssignedDate(), payload.getNote());
        return payload;
    }

    @Override
    public List<AssignmentDTO> findAssignmentsByUsername(String username) {
        List<Assignment> assignments = assignmentRepository.findByUser_UsernameAndStateNot(username,-1);
        return assignments.stream().map(assignmentMapper::fromEntity).collect(Collectors.toList());
    }

    @Override
    public List<AssignmentDTO> searchAssetByAssetNameOrAssetCode(String keyword) {
        String assetName = "%" + keyword + "%";
        String assetCode = keyword;
        List<Assignment> assets = assignmentRepository.findAssignmentsByAssetNameContainsOrAssetCode(assetName, assetCode);
        return assets.stream().map(assignmentMapper::fromEntity).collect(Collectors.toList());
    }


    @Override
    public List<AssignmentDTO> filterBy(Integer state, LocalDate assignedDate) {
        List<Assignment> assignments = new ArrayList<>();
        if (assignedDate == null && state == null) {
            assignments = assignmentRepository.findAll();
        } else if (assignedDate == null && state != null) {
            assignments = assignmentRepository.findAssignmentsByState(state);
        } else if (assignedDate != null && state == null) {
            assignments = assignmentRepository.findAssignmentsByAssignedDate(assignedDate);
        } else if (assignedDate != null && state != null) {
            assignments = assignmentRepository.findAssignmentsByAssignedDate(assignedDate);
            assignments = assignments.stream().filter(assignment -> assignment.getState() == state).collect(Collectors.toList());
        }
        return assignments.stream().map(assignmentMapper::fromEntity).collect(Collectors.toList());
    }

}
