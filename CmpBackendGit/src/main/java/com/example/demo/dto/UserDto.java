package com.example.demo.dto;

import java.util.Date;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class UserDto {
	
private int userId;
    
    private String firstName;
    private String lastName;
    private String emailId;
    private String password;
    private String contact;
    private String Address;
    private String city;
    private String pincode;
//    private Date createdAt;
//    private int createdBy;
    private String state;

  private Integer roleId;
    
	
	

}
