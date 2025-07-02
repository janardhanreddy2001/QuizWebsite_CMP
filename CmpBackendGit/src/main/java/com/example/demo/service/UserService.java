package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.LoginDto;
import com.example.demo.dto.UserDto;
import com.example.demo.entities.User;

public interface UserService {

	Object createRole(UserDto userDto);

	List<Object> userFetchAll();

	Object fuserFetchId(int userId);

	Object updateUserDetails(int userId, UserDto userDtoUpd);


	String deleteUser(int userId);

	 Object loginCreate(LoginDto loginDto);



	

}
