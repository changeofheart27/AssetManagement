package com.nashtech.assetmanagementwebservice.repository;

import com.nashtech.assetmanagementwebservice.entity.User;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


import java.util.List;
import java.util.Optional;

import org.hibernate.annotations.Parameter;
import org.junit.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;

import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.List;
@ExtendWith(SpringExtension.class)
@DataJpaTest
@Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "/user.sql")
public class UserRepositoryIntTests {
    @Autowired

    private UserRepository userRepository;

    @Test
    public void testGetAllUsers() {
        List<User> users = userRepository.findAll();
        assertEquals(12, users.size());
    }



    @ParameterizedTest(name = "Test find user by username equal {0} should return 1 record")
    @ValueSource(strings = {"daoninhthai"})
    public void testFindByUserNameLikeShouldReturn1Record(String username) {
        User user = userRepository.findByUsername(username);
        assertEquals("daoninhthai",user.getUsername());
        assertEquals("NV3333",user.getStaffCode());
    }

    @Test
    public void testUpdatePost() {
        User user =userRepository.findByUsername("daoninhthai");
        user.setUsername("anaconda");
        userRepository.save(user);
        assertEquals("anaconda",user.getUsername());

    }

    @Test
    public void testCreatePost() {
        User user = new User();
        user.setUsername("mudamuda");
        user.setFirstName("hehe");
        user.setLastName("datebaiyo");
        userRepository.save(user);
        Assertions.assertNotNull(userRepository.findByUsername("mudamuda"));

    }
}
