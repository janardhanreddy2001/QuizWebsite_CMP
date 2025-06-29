package com.example.demo.DTO;

import java.util.Date;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class RewardsDto {
    private Integer rewardId;
    private Map<String,Object> rewardType;
    private Integer createdBy;
    private Integer updatedBy;
    private Date createdAt;
    private Date updatedAt;
    private Integer userId;
  //  private List<Integer> topScoreUserIds;
}