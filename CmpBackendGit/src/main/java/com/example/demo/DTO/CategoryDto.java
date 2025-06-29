package com.example.demo.DTO;

import java.util.Date;

import lombok.Data;

@Data
public class CategoryDto {
	
	private int categoryId;
	private String categoryType;
	private String discription;
	private Date  createdAt;
	private Date updatedAt;
	private int createdBy;
	private int updatedBy;
	private Integer userId;
	private int points;
}
