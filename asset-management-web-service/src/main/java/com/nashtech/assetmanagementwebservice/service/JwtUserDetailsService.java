package com.nashtech.assetmanagementwebservice.service;


import com.nashtech.assetmanagementwebservice.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.User.UserBuilder;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user =userService.findUserByUsername(username);
        UserBuilder userBuilder =null;
        if(user!=null ) {
            if(!user.getStatus().equals("enabled")){
                throw new DisabledException("User is disabled");
            }
            userBuilder= org.springframework.security.core.userdetails.User.withUsername(username);
            userBuilder.password(user.getPassword());
            userBuilder.roles(user.getAuthority().getAuthority());
        }else {
            throw new UsernameNotFoundException("Username not found");
        }
        return userBuilder.build();
    }
}