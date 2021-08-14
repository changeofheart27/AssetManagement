package com.nashtech.assetmanagementwebservice.repository;

import java.util.List;
import java.util.Optional;

import com.nashtech.assetmanagementwebservice.entity.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.nashtech.assetmanagementwebservice.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  public User findByUsername(String username);

//  public List<User> findUserByType(String type);

  @Query(value = "SELECT * from user u where u.username LIKE %:keyword% or u.staff_code LIKE %:keyword%", nativeQuery = true)
  public List<User> findByNameOrStaffCode(String keyword);

  @Query(value = "SELECT id from authorities a where a.user_id = ?1", nativeQuery = true)
  public Integer findAuthorityByUserId (int id);


//  @Query(value = "SELECT * from user u where u.type LIKE %:type%", nativeQuery = true)
//  public List<User> getUserByType(String type);

}
