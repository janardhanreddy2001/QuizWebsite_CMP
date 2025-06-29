package com.example.demo.DTO;

import java.util.Date;
import java.util.Map;

import lombok.Data;

@Data
public class UserGiftAssignedDto {
	
	private int giftAssignedId;
	private Date assigned;
	private Integer historyId;
	private Integer rewardId;
	


}
