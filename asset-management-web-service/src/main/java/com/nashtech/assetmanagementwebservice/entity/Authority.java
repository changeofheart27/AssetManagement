package com.nashtech.assetmanagementwebservice.entity;

import lombok.*;
//import org.springframework.data.annotation.Id;
import javax.persistence.Id;
import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "authorities")
public class Authority {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "authority")
    private String authority;

}
