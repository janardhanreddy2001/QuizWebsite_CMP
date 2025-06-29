// File: com.example.demo.implement.RewardsImplement.java
package com.example.demo.implement;

import com.example.demo.Service.RewardsService;
import com.example.demo.DTO.ContentDto;
import com.example.demo.DTO.RewardsDto;
import com.example.demo.Entities.Category;
import com.example.demo.Entities.Content;
import com.example.demo.Entities.Rewards;
import com.example.demo.Entities.User;
import com.example.demo.Reposiotry.RewardsRepository;
import com.example.demo.Reposiotry.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RewardsImplement implements RewardsService { 

    @Autowired
    private RewardsRepository rewardRepository;
    
    @Autowired
    private UserRepository userRepository;

	@Override
	public Object createReward(RewardsDto rewardsDto) {

		Map<String,Object> response=new HashMap<String, Object>();
		Rewards reward=new Rewards();
		Integer user=rewardsDto.getUserId();
		User userId=userRepository.findById(user).orElseThrow(()-> new RuntimeException("records not found"+user));
		reward.setCreatedBy(user);
		reward.setUser(userId);
		reward.setRewardType(rewardsDto.getRewardType());
		
		rewardRepository.save(reward);
	
		response.put("Status", "Seccuss");
		response.put("Message", "create is successfully ");
		return response;
		
	}

	@Override
	public List<Object> fetchAllReward() {
		List<Object> response=new ArrayList<Object>();
		
		List<Rewards> content=rewardRepository.findAll();
		for(Rewards reward:content) {
			RewardsDto rewardDto=new RewardsDto();
			rewardDto.setRewardId(reward.getRewardId());
			rewardDto.setCreatedAt(reward.getCreatedAt());
			rewardDto.setCreatedBy(reward.getCreatedBy());
			rewardDto.setRewardType(reward.getRewardType());
			rewardDto.setUpdatedAt(reward.getUpdatedAt());
			rewardDto.setUpdatedBy(reward.getUpdatedBy());
		
			response.add(rewardDto);
		}
		return response;
		
	}

	@Override
	public Object fetchByIdContent(int rewardId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object fetchByIdReward(int rewardId) {
		
		Rewards reward=rewardRepository.findById(rewardId).orElseThrow(()-> new RuntimeException("records is not found"+rewardId));
		RewardsDto rewardDto=new RewardsDto();
		rewardDto.setCreatedAt(reward.getCreatedAt());
		rewardDto.setCreatedBy(reward.getCreatedBy());
		rewardDto.setRewardType(reward.getRewardType());
		rewardDto.setUpdatedAt(reward.getUpdatedAt());
		rewardDto.setUpdatedBy(reward.getUpdatedBy());
		rewardDto.setUserId(reward.getUser().getUserId());
		rewardDto.setRewardId(reward.getRewardId());
		
		return rewardDto;
	}

	@Override
	public Object updateByIdReward(RewardsDto rewardsDto, int rewardId) {
		Map<String,Object> resopnse=new HashMap<String, Object>();
		Rewards reward=rewardRepository.findById(rewardId).orElseThrow(()-> new RuntimeException("records is not found"+rewardId));
		reward.setRewardType(rewardsDto.getRewardType());
		Integer user=rewardsDto.getUserId();
		User userId=userRepository.findById(user).orElseThrow(()-> new RuntimeException("records not found"+user));
		reward.setUpdatedBy(user);
		rewardRepository.save(reward);
		resopnse.put("Status", "Seccuss");
		resopnse.put("Message", "Delete is successfully ");
		
		return resopnse;
	}

	@Override
	public Object deleteReward(Integer rewardId) {
		Map<String,Object> response=new HashMap<String, Object>();
		Rewards reward=rewardRepository.findById(rewardId).orElseThrow(()-> new RuntimeException("records is not found"+rewardId));
		
		rewardRepository.deleteById(rewardId);
		response.put("Status", "Seccuss");
		response.put("Message", "Delete is successfully ");
		return response;
		
	
	}

    
}