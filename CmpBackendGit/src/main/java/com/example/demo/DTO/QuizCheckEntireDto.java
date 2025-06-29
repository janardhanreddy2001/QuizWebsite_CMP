package com.example.demo.DTO;

import java.util.Date;

import lombok.Data;

@Data
public class QuizCheckEntireDto {
	
	private Integer contentId;
	private Integer userId;
	private Date attemptedDate;
	private Integer  categoryId;

}
