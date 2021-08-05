package com.nashtech.assetmanagementwebservice.repository;

import com.nashtech.assetmanagementwebservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Integer> {
    public User findByUsername(String username);
    public List<User> findUserByType(String type);

}
