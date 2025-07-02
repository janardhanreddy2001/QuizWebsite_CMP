package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.ContentDto;
import com.example.demo.dto.RewardsDto;
import com.example.demo.entities.Rewards;

public interface RewardsService {

	Object createReward(RewardsDto rewardsDto);

	List<Object> fetchAllReward();

	Object fetchByIdContent(int rewardId);

	Object fetchByIdReward(int rewardId);

	Object updateByIdReward(RewardsDto rewardsDto, int rewardId);
	Object deleteReward(Integer rewardId);


	



}
