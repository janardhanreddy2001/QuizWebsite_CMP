package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.LoginDto;
import com.example.demo.DTO.UserDto;
import com.example.demo.Entities.User;

public interface UserService {

	Object createRole(UserDto userDto);

	List<Object> userFetchAll();

	Object fuserFetchId(int userId);

	Object updateUserDetails(int userId, UserDto userDtoUpd);


	String deleteUser(int userId);

	 Object loginCreate(LoginDto loginDto);



	

}
