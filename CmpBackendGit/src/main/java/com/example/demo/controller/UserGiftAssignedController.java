package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserGiftAssignedDto;
import com.example.demo.service.UserGiftAssignedService;

@RestController
@CrossOrigin
public class UserGiftAssignedController {
	
	
	@Autowired
	private UserGiftAssignedService userGiftAssignedService;
	
	@PostMapping("/createUserGiftAssigned")
	public ResponseEntity<Object> UserGiftAssignedCreate(@RequestBody  UserGiftAssignedDto userGiftAssignedDto){
		
		Object response=userGiftAssignedService.UserGiftAssignedCreate(userGiftAssignedDto);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("/fetchAlluserGift")
	public ResponseEntity<List<Object>> fetchAllUserGift( ){
		
		List<Object> response=userGiftAssignedService.fetchAllUserGift();
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}

}
