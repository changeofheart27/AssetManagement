package com.nashtech.assetmanagementwebservice.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateUserRequest {
    @NotNull(message = "Username is required")
    @NotEmpty(message = "Username is required")
    @ApiModelProperty(
            example="thaimeo",
            notes="Username cannot be empty",
            required=true
    )
    @JsonProperty("username")
    private String username;

    @NotNull(message = "First name is required")
    @NotEmpty(message = "First name is required")
    @ApiModelProperty(
            example="Da",
            notes="First name cannot be empty",
            required=true
    )
    @JsonProperty("first_name")
    private String  firstName;

    @NotNull(message = "Last name is required")
    @NotEmpty(message = "Last name is required")
    @ApiModelProperty(
            example="Th",
            notes="Last name cannot be empty",
            required=true
    )
    @JsonProperty("last_name")
    private String lastName;

//    @NotNull(message = "Gender is required")
//    @NotEmpty(message = "Gender  is required")
    @ApiModelProperty(
            example="1",
            notes="Gender cannot be empty , 1-Male , 2-Female",
            required=true
    )
    @JsonProperty("gender")
    private int gender;



  //  @NotNull(message = "  Date Of Birth is required")
//    @NotEmpty(message = "Date Of Birth is required")
    @ApiModelProperty(
            example="1999-06-02T21:33:45.249967",
            notes="Birth Date  cannot be empty",
            required=true
    )
    @JsonProperty("dob")
    private LocalDateTime dob;


 //   @NotNull(message = "Joined  Date is required")

    @ApiModelProperty(
            example="1999-06-02T21:33:45.249967",
            notes="Joined Date  cannot be empty",
            required=true
    )
    @JsonProperty("joined_date")
    private LocalDateTime joinedDate;

 //   @NotNull(message = "Location is required")
  //  @NotEmpty(message = "Location is required")
    @ApiModelProperty(
            example="HN",
            notes="Location cannot be empty",
            required=true
    )
    @JsonProperty("location")
    private String location;
}
