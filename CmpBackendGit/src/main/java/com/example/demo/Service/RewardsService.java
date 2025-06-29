package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.ContentDto;
import com.example.demo.DTO.RewardsDto;
import com.example.demo.Entities.Rewards;

public interface RewardsService {

	Object createReward(RewardsDto rewardsDto);

	List<Object> fetchAllReward();

	Object fetchByIdContent(int rewardId);

	Object fetchByIdReward(int rewardId);

	Object updateByIdReward(RewardsDto rewardsDto, int rewardId);
	Object deleteReward(Integer rewardId);


	



}
