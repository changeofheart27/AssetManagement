package com.nashtech.assetmanagementwebservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nashtech.assetmanagementwebservice.entity.Assignment;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {

}
