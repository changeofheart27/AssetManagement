package com.nashtech.assetmanagementwebservice.model.dto;

import com.nashtech.assetmanagementwebservice.entity.Asset;
import com.nashtech.assetmanagementwebservice.entity.Authority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.stereotype.Component;

import javax.persistence.*;
import java.util.Date;
import java.util.List;
@Component
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Integer id;


    private String username;


    private String firstName;


    private String lastName;


    private Date dob;


    private int gender;


    private String staffCode;


    private Date joinedDate;


    private String location;

}
