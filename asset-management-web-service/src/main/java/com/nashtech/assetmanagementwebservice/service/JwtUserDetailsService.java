package com.nashtech.assetmanagementwebservice.service;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.User.UserBuilder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class JwtUserDetailsService implements UserDetailsService  {
    @Autowired
    private UserService userService;



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       com.nashtech.assetmanagementwebservice.entity.User user = userService.findUserByUsername(username);
        UserBuilder userBuilder =null;
        if(user!=null) {
            userBuilder= User.withUsername(username);
            userBuilder.password(new BCryptPasswordEncoder().encode(user.getPassword()));
            userBuilder.roles(user.getAuthority().getAuthority());
        }else {
            throw new UsernameNotFoundException("Username not found");
        }
        return userBuilder.build();
    }
}