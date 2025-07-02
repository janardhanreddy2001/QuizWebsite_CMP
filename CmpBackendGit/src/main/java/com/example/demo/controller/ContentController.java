package com.example.demo.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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

import com.example.demo.dto.ContentDto;
import com.example.demo.dto.QuizDto;
import com.example.demo.service.ContentService;

@CrossOrigin
@RestController
public class ContentController {

	
	@Autowired
	private ContentService contentService;
	
	@PostMapping("/createContent")
	public ResponseEntity<Object> createContent(@RequestBody ContentDto contentDto){
		
		Object response=contentService.createContent(contentDto);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("/fetchAllContent")
	public ResponseEntity<List<Object>> fetchAllContent(){
		
		List<Object> response=contentService.fetchAllContent();
		
	return new ResponseEntity<>(response,HttpStatus.OK);
		
	}
	@GetMapping("/fetchByIdContent/{contentId}")
	public ResponseEntity<Object> fetchByIdContent(@PathVariable int contentId){
		
		Object response =contentService.fetchByIdContent(contentId);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
		
	}
	
	@PutMapping("/updateByIdContent/{contentId}")
	public ResponseEntity<Object> updateByIdContent(@RequestBody ContentDto contentDto,@PathVariable int contentId){
		
		Object response=contentService.updateByIdContent(contentDto,contentId);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
		
	}
	
	@DeleteMapping("/deleteContent/{contentId}")
	public ResponseEntity<Object> deleteContent(@PathVariable int contentId){
		
		Object response=contentService.deleteContent(contentId);
		return new ResponseEntity<>(response,HttpStatus.OK);
		
	}
	
	
	@GetMapping("/getByQuiz/{category_id}/{createAt}")
	public ResponseEntity<List<QuizDto>> getQuiz(
	        @PathVariable("category_id") int categoryId,
	        @PathVariable("createAt") @DateTimeFormat(pattern = "yyyy-MM-dd") Date createAt) {

	    List<QuizDto> response = contentService.getQuiz(categoryId, createAt);
	    return new ResponseEntity<>(response, HttpStatus.OK);
	}

}
