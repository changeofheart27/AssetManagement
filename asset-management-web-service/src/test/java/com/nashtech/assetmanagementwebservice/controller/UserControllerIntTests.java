package com.nashtech.assetmanagementwebservice.controller;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.nashtech.assetmanagementwebservice.model.request.CreateUserRequest;
import com.nashtech.assetmanagementwebservice.model.request.UpdateUserRequest;
import org.hamcrest.collection.IsCollectionWithSize;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@ComponentScan(value = {"com.nashtech.assetmanagementwebservice.service", "com.nashtech.assetmanagementwebservice.repository"})
@Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "/user.sql")
@SpringBootTest
public class UserControllerIntTests {
    @Autowired
    private MockMvc mockMvc;
    private static String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    public void getAllUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/users")
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", IsCollectionWithSize.hasSize(7)))
                .andExpect(jsonPath("$[*].id").isNotEmpty());
    }



    @ParameterizedTest(name = "Test get user with id {0} found")
    @ValueSource(ints = {3})
    public void getByIdFound(int id) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/users/" + id)
                        .accept(MediaType.APPLICATION_JSON_VALUE))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.username").value("daoninhthai"));
    }

    @Test
    public void updateUserWithAdminAccount() throws Exception {
        UpdateUserRequest updateUserRequest = new UpdateUserRequest();
        updateUserRequest.setUsername("username updated");
        updateUserRequest.setFirstName("first name updated");
        updateUserRequest.setLastName("last name updated");
        mockMvc.perform(MockMvcRequestBuilders
                        .put("/api/v1/users/1")
                        .content(asJsonString(updateUserRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                        .andDo(print())

                        .andExpect(jsonPath("$.username").value("username updated"))
                        .andExpect(jsonPath("$.firstName").value("first name updated"))
                        .andExpect(jsonPath("$.lastName").value("last name updated"));
    }


    @Test
    public void createPostWithAuthorAccount() throws Exception {
        CreateUserRequest createUserRequest = new CreateUserRequest();
        createUserRequest.setUsername("daz");
        createUserRequest.setFirstName("a");
        createUserRequest.setLastName("b");


        mockMvc.perform(MockMvcRequestBuilders
                        .post("/api/v1/users")
                        .content(asJsonString(createUserRequest))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                //.andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("daz"))
                .andExpect(jsonPath("$.firstName").value("a"))
                .andExpect(jsonPath("$.lastName").value("b"));
    }
}
