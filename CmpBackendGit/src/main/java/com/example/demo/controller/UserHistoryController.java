package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.QuizCheckEntireDto;
import com.example.demo.dto.UserHistoryDto;
import com.example.demo.service.UserHistoryService;

@RestController
@CrossOrigin
public class UserHistoryController {
	
			@Autowired
			private UserHistoryService userHistoryService;
			
			@PostMapping("/createUserHistrory")
			public ResponseEntity<Object> createUserHistory(@RequestBody UserHistoryDto userHistoryDto){
				
				Object response=userHistoryService.createUserHistory(userHistoryDto);
				return new ResponseEntity<>(HttpStatus.OK);
				
			}
			
			@GetMapping("/fetchAllUserHistory")
			public ResponseEntity<List<Object>> fetchAllUserHistory(){
				List<Object> response=userHistoryService.fetchAllUserHistory();
				return new ResponseEntity<>(response,HttpStatus.OK);
				
			}
			@GetMapping("/fetchAllUserHistoryTop10")
			public ResponseEntity<List<Object>> fetchAllUserHistoryTop10(){
				List<Object> response=userHistoryService.fetchAllUserHistoryTop10();
				return new ResponseEntity<>(response,HttpStatus.OK);
				
			}
			
			@PostMapping("/qiuzChickEntity")
			public ResponseEntity<Object> quizCheckEntire(@RequestBody QuizCheckEntireDto quizCheckEntireDto){
				
				Object response=userHistoryService.quizCheckEntire(quizCheckEntireDto);
				
				return new ResponseEntity<>(response,HttpStatus.OK);
				
			}

}
