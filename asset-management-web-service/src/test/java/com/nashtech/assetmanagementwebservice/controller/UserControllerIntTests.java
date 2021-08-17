package com.nashtech.assetmanagementwebservice.controller;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nashtech.assetmanagementwebservice.config.JwtTokenUtil;
import com.nashtech.assetmanagementwebservice.model.request.CreateUserRequest;
import com.nashtech.assetmanagementwebservice.model.request.UpdateUserRequest;

import org.hamcrest.collection.IsCollectionWithSize;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.TestPropertySource;
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
@TestPropertySource("/application-test.properties")
@ComponentScan(value = {"com.nashtech.assetmanagementwebservice.service", "com.nashtech.assetmanagementwebservice.repository"})
@Sql(executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD, scripts = "/user.sql")
@SpringBootTest
@AutoConfigureTestDatabase
@Transactional
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
    
    @Autowired
	private UserDetailsService userService;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	private String token;

	@BeforeEach
	public void setUp() {
		UserDetails user = userService.loadUserByUsername("duongmh");
		
		if (user != null) {
			this.token = jwtTokenUtil.generateToken(user);
			authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), "duongmh@11111111"));	
		}

	}
    
    @Test
    public void getAllUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/admin/users")
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .header("Authorization", "Bearer " + token))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$", IsCollectionWithSize.hasSize(7)));
//                .andExpect(jsonPath("$[*].id").isNotEmpty());
    }



    @ParameterizedTest(name = "Test get user with id {0} found")
    @ValueSource(ints = {3})
    public void getByIdFound(int id) throws Exception {
        mockMvc.perform(MockMvcRequestBuilders
                        .get("/api/v1/admin/users/" + id)
                        .accept(MediaType.APPLICATION_JSON_VALUE)
                        .header("Authorization", "Bearer " + token))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(id))
                .andExpect(jsonPath("$.username").value("daoninhthai"));
    }

//    @Test
//    public void updateUserWithAdminAccount() throws Exception {
//        UpdateUserRequest updateUserRequest = new UpdateUserRequest();
//        updateUserRequest.setFirstName("first name updated");
//        updateUserRequest.setLastName("last name updated");
//        mockMvc.perform(MockMvcRequestBuilders
//                        .put("/api/v1/admin/users/1")
//                        .content(asJsonString(updateUserRequest))
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .header("Authorization", "Bearer " + token))
//                        .andDo(print())
//                        .andExpect(status().isOk())
//                        .andExpect(jsonPath("$.firstName").value("first name updated"))
//                        .andExpect(jsonPath("$.lastName").value("last name updated"));
//    }


//    @Test
//    public void createPostWithAuthorAccount() throws Exception {
//        CreateUserRequest createUserRequest = new CreateUserRequest();
//        createUserRequest.setUsername("daz");
//        createUserRequest.setFirstName("a");
//        createUserRequest.setLastName("b");
//        mockMvc.perform(MockMvcRequestBuilders
//                        .post("/api/v1/users")
//                        .content(asJsonString(createUserRequest))
//                        .contentType(MediaType.APPLICATION_JSON))
//                .andDo(print())
//                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.username").value("daz"))
//                .andExpect(jsonPath("$.firstName").value("a"))
//                .andExpect(jsonPath("$.lastName").value("b"));
//    }
}
