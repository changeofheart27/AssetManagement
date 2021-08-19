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
public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE Assignment a set a.asset.id = :assetID , a.user.id =:userID, a.state=:state, a.assignedDate=:assignedDate, a.note=:note " +
            "where a.id=:assignID")
    void saveAssign(@Param("assetID") Integer assetID
            ,@Param("userID") Integer userID
            ,@Param("assignID") Integer assignID
            ,@Param("state") Integer state
            ,@Param("assignedDate") LocalDate assignedDate
            ,@Param("note") String note);

  List<Assignment> findByUser_Username(String name);

  // search by assetcode or assetname
  @Query(value = "SELECT a FROM Assignment a WHERE a.asset.assetName LIKE :assetName OR a.asset.assetCode = :assetCode")
  List<Assignment> findAssignmentsByAssetNameContainsOrAssetCode(String assetName, String assetCode);

  List<Assignment> findAssignmentsByState(Integer state);

  List<Assignment> findAssignmentsByAssignedDate(LocalDate assignedDate);
}
