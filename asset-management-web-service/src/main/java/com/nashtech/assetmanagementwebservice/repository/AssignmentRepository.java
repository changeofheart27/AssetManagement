package com.nashtech.assetmanagementwebservice.repository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.nashtech.assetmanagementwebservice.entity.Assignment;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Integer>, AssignmentRepositoryCustom {

  List<Assignment> findByUser_UsernameAndStateNot(String name, int state);

  List<Assignment> findByStateNot(int state);
  
  Assignment findByAsset_IdAndStateNot(Integer id, int state);

  List<Assignment> findByUser_UsernameAndStateNotAndStateNot(String name, int state1, int state2);
  
}
