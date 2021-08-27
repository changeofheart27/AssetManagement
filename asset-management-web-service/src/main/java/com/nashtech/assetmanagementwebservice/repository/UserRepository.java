package com.nashtech.assetmanagementwebservice.repository;

import java.util.List;
import java.util.Optional;

import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.nashtech.assetmanagementwebservice.entity.User;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

  public List<User> findByStatus(String status);

  public User findByUsername(String username);

  @Transactional
  @Modifying
  @Query(value = "UPDATE user SET password = ?1 ,first_login =?2 WHERE username = ?3", nativeQuery = true)
  public void updatePassword(String password,String firstLogin, String username);

  public List<User> findByUsernameContainsOrStaffCodeIs(String username, String staffCode);

  public List<User> findByUsernameContainsOrStaffCodeContains(String userName,String staffCode);





  @Query(value = "SELECT user.id ,user.staff_code ,user.first_name,user.last_Name," +
          " user.joined_date,user.dob,user.location,user.gender,user.password," +
          " user.username ,user.status ,user.default_password,authorities.authority" +
          " from user  INNER JOIN  authorities " +
          " on user.id = authorities.user_id " +
          " where authorities.authority= ?1 and user.status = 'enabled' ", nativeQuery = true)
  public List<User> getUserByType(String type);

  @Query(value = "SELECT COUNT(*) FROM user u WHERE u.username LIKE :username% ", nativeQuery = true)
  public Integer countByDuplicateFullName(String username);
  
  @Query(value = "Select user.id ,user.staff_code ,user.first_name,user.last_Name,"
      + "user.joined_date,user.dob,user.location,user.gender,user.password,"
      + "user.username ,user.status ,user.default_password,authorities.authority"
      + "   from user  INNER JOIN  authorities"
      + " on user.id = authorities.user_id"
      + "   where user.first_name LIKE :firstName and user.status = 'enabled' and user.last_name LIKE %:lastName%"
      + "    or user.staff_code = :keyword and user.status = 'enabled'" , nativeQuery = true)
  public List<User> findByNameOrStaffCode(String firstName, String lastName, String keyword);

//  @Query(value = "SELECT * FROM user u WHERE u.status = 'enabled'", nativeQuery = true)
//  public List<User> findUserEnabled();
  
  
  @Query(value = "SELECT * FROM user WHERE CONCAT(first_name, \" \", last_name) LIKE :fullName "
  		+ "OR staff_code = :staffCode", nativeQuery = true)
  public List<User> findUserByFullNameOrStaffCode(String fullName, String staffCode);
}
