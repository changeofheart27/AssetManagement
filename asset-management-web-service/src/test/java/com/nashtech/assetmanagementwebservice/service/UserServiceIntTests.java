package com.nashtech.assetmanagementwebservice.service;
import com.nashtech.assetmanagementwebservice.entity.User;
import com.nashtech.assetmanagementwebservice.exception.NotFoundException;
import com.nashtech.assetmanagementwebservice.model.dto.UserDTO;
import com.nashtech.assetmanagementwebservice.repository.UserRepository;
import com.nashtech.assetmanagementwebservice.service.impl.UserServiceImpl;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
@ExtendWith(SpringExtension.class)
public class UserServiceIntTests {
    @Mock
    private UserRepository userRepository;

    @Captor
    private ArgumentCaptor<User> captor;

    @InjectMocks
    private UserServiceImpl underTest;


    @Test
    public void testFindUserByIdGivenIdNotExistInDatabaseShouldThrowNotFoundException() {
        NotFoundException exception = assertThrows(NotFoundException.class, () -> underTest.getUserById(1));
        assertEquals("No user found", exception.getMessage());
    }

    @Test
    public void testFindUserByIdGivenIdExistInDatabaseShouldReturnDataSuccessfully() {
        User mockUser = mock(User.class);
        when(mockUser.getId()).thenReturn(1);
        when(mockUser.getUsername()).thenReturn("daoninhthai");
        when(mockUser.getStaffCode()).thenReturn("DS1234");
        Mockito.when(userRepository.findById(Mockito.anyInt())).thenReturn(java.util.Optional.of(mockUser));
        UserDTO user = underTest.getUserById(1);
        assertEquals(mockUser.getUsername(), user.getUsername());
        assertEquals(mockUser.getStaffCode(), user.getStaffCode());
    }



    @Test
    public void testGetAllUserListGivenUserExistShouldReturnDataSuccessfully() {
        User User1 = mock(User.class);
        User User2 = mock(User.class);
        when(User1.getId()).thenReturn(1);
        when(User1.getUsername()).thenReturn("thai1");
        when(User1.getFirstName()).thenReturn("Dao");
        when(User1.getLastName()).thenReturn("Thai");
        when(User1.getStaffCode()).thenReturn("DS1211");

        when(User2.getId()).thenReturn(2);
        when(User2.getUsername()).thenReturn("thai2");
        when(User2.getFirstName()).thenReturn("Dao");
        when(User2.getLastName()).thenReturn("Ninh");
        when(User2.getStaffCode()).thenReturn("DS1212");
        List<User> ListUsers = new ArrayList<>();
        ListUsers.add(User1);
        ListUsers.add(User2);
        when(userRepository.findAll()).thenReturn(ListUsers);


        List<UserDTO> usersDTO= underTest.getAllUser();
        assertEquals(2, usersDTO.size());
        assertEquals("thai1", usersDTO.get(0).getUsername());
        assertEquals("Dao", usersDTO.get(0).getFirstName());
        assertEquals("Thai", usersDTO.get(0).getLastName());
        assertEquals("DS1211", usersDTO.get(0).getStaffCode());

        assertEquals("thai2", usersDTO.get(1).getUsername());
        assertEquals("Dao", usersDTO.get(1).getFirstName());
        assertEquals("Ninh", usersDTO.get(1).getLastName());
        assertEquals("DS1212", usersDTO.get(1).getStaffCode());
    }


    @Test
    public void testGetAllUserGivenNullShouldReturnEmpty() {
        when(userRepository.findAll()).thenReturn(new ArrayList<User>());
        List<UserDTO> emptyListUser = underTest.getAllUser();
        assertEquals(emptyListUser.size(), 0);
        verify(userRepository, times(1)).findAll();
    }
}
