package com.nashtech.assetmanagementwebservice.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.nashtech.assetmanagementwebservice.entity.Assignment;
import com.nashtech.assetmanagementwebservice.entity.Request;
import com.nashtech.assetmanagementwebservice.exception.NotFoundException;
import com.nashtech.assetmanagementwebservice.model.dto.RequestDTO;
import com.nashtech.assetmanagementwebservice.model.mapper.RequestMapper;
import com.nashtech.assetmanagementwebservice.repository.AssignmentRepository;
import com.nashtech.assetmanagementwebservice.repository.RequestRepository;
import com.nashtech.assetmanagementwebservice.service.RequestService;

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

  @Override
  public List<RequestDTO> filterRequests(Integer state, LocalDate returnedDate, String keyword) {
    List<Request> requests;
    if (state == null && returnedDate == null && keyword == null) {
      requests = requestRepository.findAll();
      return requests.stream().map(requestMapper::fromEntity).collect(Collectors.toList());
    } else if (state != null && returnedDate == null && keyword == null) {
      requests = requestRepository.findRequestsByState(state);
      return requests.stream().map(requestMapper::fromEntity).collect(Collectors.toList());
    } else if (state == null && returnedDate != null && keyword == null) {
      requests = requestRepository.findRequestsByReturnedDate(returnedDate);
      return requests.stream().map(requestMapper::fromEntity).collect(Collectors.toList());
    } else if (state != null && returnedDate != null && keyword == null) {
      requests = requestRepository.findRequestsByReturnedDate(returnedDate);
      List<Request> results = requests.stream().filter(request -> request.getState() == state).collect(Collectors.toList());
      return results.stream().map(requestMapper::fromEntity).collect(Collectors.toList());
    } else if (state != null && returnedDate != null && keyword != null) {
      requests = requestRepository.findRequestsByAssetNameContainsOrAssetCode(keyword, keyword);
      List<Request> results = requests.stream().filter(request -> request.getState() == state && request.getReturnedDate() == returnedDate).collect(Collectors.toList());
      return results.stream().map(requestMapper::fromEntity).collect(Collectors.toList());
    } else if (state == null && returnedDate != null && keyword != null) {
      requests = requestRepository.findRequestsByAssetNameContainsOrAssetCode(keyword, keyword);
      List<Request> results = requests.stream().filter(request -> request.getReturnedDate() == returnedDate).collect(Collectors.toList());
      return results.stream().map(requestMapper::fromEntity).collect(Collectors.toList());
    } else if (state == null && returnedDate == null && keyword != null) {
      requests = requestRepository.findRequestsByAssetNameContainsOrAssetCode(keyword, keyword);
      return requests.stream().map(requestMapper::fromEntity).collect(Collectors.toList());
    } else if (state != null && returnedDate == null && keyword != null) {
      requests = requestRepository.findRequestsByAssetNameContainsOrAssetCode(keyword, keyword);
      List<Request> results = requests.stream().filter(request -> request.getState() == state).collect(Collectors.toList());
      return results.stream().map(requestMapper::fromEntity).collect(Collectors.toList());
    }
    return null;
  }

  @Override
  public void deleteById(Integer id) {
    Request request = requestRepository.getById(id);

    if (request == null) {
      throw new NotFoundException("No record found with id " + id);
    }
    requestRepository.delete(request);
  }

  @Override
  public RequestDTO edit(Integer id, RequestDTO payload) {
    Request oldRequest = requestRepository.getById(id);
    Assignment oldAssignment = oldRequest.getAssignment();
    if (oldAssignment.getId() != payload.getAssignmentDTO().getId()) {
      assignmentRepository.save(oldAssignment);
    }
    Request newRequest = requestRepository.getById(payload.getId());
    newRequest.setState(1);
    newRequest.setReturnedDate(LocalDate.now());
    requestRepository.save(newRequest);
    return payload;
  }
}
