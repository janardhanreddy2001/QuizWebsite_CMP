package com.example.demo.DTO;

import java.util.Date;
import java.util.Map;

import lombok.Data;

@Data
public class UserHistoryDto {
	
	private Map<String,Object> responseContent;
	private Long totalScore;
	private int eachQuestionpoints;
	private int historyId;
	private Integer userId;
	private Integer contentId;
	private Date attemptedDate;


}
