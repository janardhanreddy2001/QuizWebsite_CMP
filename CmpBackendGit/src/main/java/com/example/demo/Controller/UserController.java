package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.LoginDto;
import com.example.demo.DTO.UserDto;
import com.example.demo.Entities.Role;
import com.example.demo.Entities.User;
import com.example.demo.Reposiotry.UserRepository;
import com.example.demo.Service.UserService;

@RestController
@CrossOrigin
public class UserController {
	@Autowired
	private UserService userService;
	@PostMapping("/createUser")
	public ResponseEntity<Object> createdUser(@RequestBody UserDto userDto){
		
		Object user=userService.createRole(userDto);
		
		return ResponseEntity.ok(user);
		
	}
	
	@GetMapping("/userFetchAll")
	public ResponseEntity<List<Object>> userFetchAll(){
		List<Object> user=userService.userFetchAll();
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
	
	@GetMapping("/userFetchId/{userId}")
	public ResponseEntity<Object> userFetchId(@PathVariable int userId){
		
		Object response=userService.fuserFetchId(userId);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}

	@PutMapping("/update/{userId}")
	public ResponseEntity<Object> updateUserDeatils(@PathVariable int userId, @RequestBody UserDto userDtoUpd){
		
		Object updUser=userService.updateUserDetails(userId, userDtoUpd);
		return new ResponseEntity<>(updUser, HttpStatus.OK);
	}
	
	@DeleteMapping("/deleteUser/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable("id") int userId) {
	    userService.deleteUser(userId);
	    return ResponseEntity.ok("User deleted successfully with ID: " + userId);
	}

	
	 @PostMapping("/loginCreate")
	    public ResponseEntity<Object> loginCreate(@RequestBody LoginDto loginDto) {
	        Object response = userService.loginCreate(loginDto);
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    }
	}
	

	
	


