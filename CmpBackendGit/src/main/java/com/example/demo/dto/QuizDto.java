package com.example.demo.dto;

import java.util.Map;

import lombok.Data;

@Data
public class QuizDto {
	
	private Integer categoryId ;
	private Integer contentId;
	private Map<String,Object> content;
	private int points;
	
	

}
