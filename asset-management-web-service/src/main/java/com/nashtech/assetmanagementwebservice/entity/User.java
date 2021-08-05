package com.nashtech.assetmanagementwebservice.entity;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name ="id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password")
    private String password;

    @Column(name ="first_name", nullable = false)
    private String firstName;

    @Column(name ="last_name", nullable = false)
    private String lastName;

    @Column(name ="dob")
//    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate dob;

    @Column(name ="gender")
    private String gender;

    @Column(name ="joined_date")
//    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate joinedDate;

    @Column(name = "location")
    private String location;

    @Column(name ="type")
    private String type;

    @Column(name ="status" )
    private String status;

    @Column(name = "staff_code")
    private String staffCode;

//    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
//    private List<Asset> assets;

//    @OneToOne(mappedBy = "user")
//    private Authority authority;

}
