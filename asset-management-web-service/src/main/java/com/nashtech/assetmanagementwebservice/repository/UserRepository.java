package com.nashtech.assetmanagementwebservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.nashtech.assetmanagementwebservice.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  @Query(value = "SELECT user.id ,user.staff_code ,user.first_name,user.last_Name," +
          "          user.joined_date,user.dob,user.location,user.gender,user.password," +
          "          user.username ,user.status ,authorities.authority" +
          "          from user  INNER JOIN  authorities " +
          "          on user.id = authorities.user_id where user.status = 'enabled' " , nativeQuery = true)
  public List<User> findAllUser();

  @Query(value = "SELECT user.id ,user.staff_code ,user.first_name,user.last_Name," +
          "          user.joined_date,user.dob,user.location,user.gender,user.password," +
          "          user.username ,user.status ,authorities.authority" +
          "          from user  INNER JOIN  authorities " +
          "          on user.id = authorities.user_id where user.id= ?1 " , nativeQuery = true)
  public Optional<User> findUserByUserId(int id);

  public User findByUsername(String username);


  @Query(value = "SELECT * from user u where u.username LIKE %:keyword% or u.staff_code LIKE %:keyword%", nativeQuery = true)
  public List<User> findByNameOrStaffCode(String keyword);

  @Query(value = "SELECT id from authorities a where a.user_id = ?1", nativeQuery = true)
  public Integer findAuthorityByUserId (int id);



  @Query(value = "SELECT user.id ,user.staff_code ,user.first_name,user.last_Name," +
          " user.joined_date,user.dob,user.location,user.gender,user.password," +
          " user.username ,user.status ,authorities.authority" +
          " from user  INNER JOIN  authorities " +
          " on user.id = authorities.user_id " +
          " where authorities.authority= ?1 ", nativeQuery = true)
  public List<User> getUserByType(String type);

  @Query(value = "SELECT COUNT(*) FROM user u WHERE u.username LIKE :username% ", nativeQuery = true)
  public Integer countByDuplicateFullName(String username);

//  @Query(value = "SELECT * FROM user u WHERE u.status = 'enabled'", nativeQuery = true)
//  public List<User> findUserEnabled();
}
