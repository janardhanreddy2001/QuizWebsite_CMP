package com.example.demo.DTO;

import java.util.Date;
import java.util.Map;

import lombok.Data;

@Data
public class ContentDto {
	
	private int contentId;
	private Map<String,Object> content;
	private Date createdAt;
	private Date updatedAt;
	private Integer createdBy;
	private Integer updatedBy;
	private Integer categoryId;
	private Integer userId;

}
