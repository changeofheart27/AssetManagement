package com.nashtech.assetmanagementwebservice.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateUserRequest {
    @NotNull(message = "Username is required")
    @NotEmpty(message = "Username is required")
    @ApiModelProperty(
            example="daoninhthai",
            notes="Username cannot be empty",
            required=true
    )
    @JsonProperty("username")
    private String username;

    @NotNull(message = "First name is required")
    @NotEmpty(message = "First name is required")
    @ApiModelProperty(
            example="Dao",
            notes="First name cannot be empty",
            required=true
    )
    @JsonProperty("first_name")
    private String  firstName;

    @NotNull(message = "Last name is required")
    @NotEmpty(message = "Last name is required")
    @ApiModelProperty(
            example="Thai",
            notes="Last name cannot be empty",
            required=true
    )
    @JsonProperty("last_name")
    private String lastName;

    @NotNull(message = "Gender is required")
//    @NotEmpty(message = "Gender  is required")
    @ApiModelProperty(
            example="1",
            notes="Gender cannot be empty , 1-Male , 2-Female",
            required=true
    )
    @JsonProperty("gender")
    private int gender;



    @NotNull(message = "  Date Of Birth is required")
//    @NotEmpty(message = "Date Of Birth is required")
    @ApiModelProperty(
            example="2021-08-03T04:26:55.426Z",
            notes="Birth Date  cannot be empty",
            required=true
    )
    @JsonProperty("dob")
    private Date dob;

    @NotNull(message = "Staff Code is required")
    @NotEmpty(message = "Staff Code is required")
    @ApiModelProperty(
            example="NV1234",
            notes="Staff Code cannot be empty",
            required=true
    )
    @JsonProperty("staff_code")
    private String staffCode;

    @NotNull(message = "Joined  Date is required")

    @ApiModelProperty(
            example="2021-08-03T04:26:55.426Z",
            notes="Joined Date  cannot be empty",
            required=true
    )
    @JsonProperty("joined_date")
    private Date joinedDate;

    @NotNull(message = "Location is required")
    @NotEmpty(message = "Location is required")
    @ApiModelProperty(
            example="HN",
            notes="Location cannot be empty",
            required=true
    )
    @JsonProperty("location")
    private String location;
}
