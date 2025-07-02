package com.example.demo.dto;

import java.util.Date;

import lombok.Data;

@Data
public class QuizCheckEntireDto {
	
	private Integer contentId;
	private Integer userId;
	private Date attemptedDate;
	private Integer  categoryId;

}
