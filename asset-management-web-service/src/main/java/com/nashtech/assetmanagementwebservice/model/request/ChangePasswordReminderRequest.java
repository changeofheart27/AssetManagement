package com.nashtech.assetmanagementwebservice.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChangePasswordReminderRequest {
    @ApiModelProperty(
            example="TRUE",
            notes=" password Change Reminder cannot be empty , 1-TRUE , 2-FALSE",
            required=true
    )
    @JsonProperty("password_change_reminder")
    private String passwordChangeReminder;
}
