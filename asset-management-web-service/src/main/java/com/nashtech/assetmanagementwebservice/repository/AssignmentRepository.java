package com.nashtech.assetmanagementwebservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nashtech.assetmanagementwebservice.entity.Assignment;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Integer> {

    @Transactional
    @Modifying
    @Query(value = "UPDATE Assignment a set a.asset.id = :assetID , a.user.id =:userID where a.id=:assignID")
    void saveAssign(@Param("assetID") Integer assetID
            ,@Param("userID") Integer userID
            ,@Param("assignID") Integer assignID );
}
