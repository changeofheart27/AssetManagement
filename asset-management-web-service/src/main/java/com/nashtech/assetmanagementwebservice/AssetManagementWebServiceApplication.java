package com.nashtech.assetmanagementwebservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })

public class AssetManagementWebServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AssetManagementWebServiceApplication.class, args);
	}

}
