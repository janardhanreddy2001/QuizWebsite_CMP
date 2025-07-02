package com.example.demo.implement;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.UserGiftAssignedDto;
import com.example.demo.entities.Rewards;
import com.example.demo.entities.UserGiftAssigned;
import com.example.demo.entities.UserHistory;
import com.example.demo.repository.RewardsRepository;
import com.example.demo.repository.UserGiftAssignedReposiotry;
import com.example.demo.repository.UserHistoryReposiotry;
import com.example.demo.service.UserGiftAssignedService;

@Service
public class UserGiftAssignedImplement implements UserGiftAssignedService {
	
	@Autowired
	private UserGiftAssignedReposiotry userGiftAssignedReposiotry;
	
	@Autowired
	private UserHistoryReposiotry userHistoryReposiotry;
	
	@Autowired
	private RewardsRepository rewardsRepository;

	@Override
	public Object UserGiftAssignedCreate(UserGiftAssignedDto userGiftAssignedDto) {
		
		Map<String, Object> response=new HashMap<String, Object>();
		UserGiftAssigned userGiftAssigned=new UserGiftAssigned();
		
		Integer historyId=userGiftAssignedDto.getHistoryId();
		UserHistory userHistory=userHistoryReposiotry.findById(historyId).orElseThrow(()-> new RuntimeException("records is not found"+userGiftAssignedDto.getHistoryId()));
		userGiftAssigned.setUserHistory(userHistory);
		Rewards reward=rewardsRepository.findById(userGiftAssignedDto.getRewardId()).orElseThrow(()-> new RuntimeException("records is not found"+userGiftAssignedDto.getRewardId()));
		userGiftAssigned.setRewards(reward);
		
		userGiftAssigned.setAssigned(userGiftAssignedDto.getAssigned());
		
		userGiftAssignedReposiotry.save(userGiftAssigned);
		
		response.put("Status", "Success");
		response.put("Message", "create is Successfuly");
		
		return response;
	}

	@Override
	public List<Object> fetchAllUserGift() {
		
		List<Object> response=new ArrayList<Object>();
		
		List<UserGiftAssigned> userGiftAssigned=userGiftAssignedReposiotry.findAll();
		
		for(UserGiftAssigned  userGift:userGiftAssigned) {
			UserGiftAssignedDto userGiftDto=new UserGiftAssignedDto();
			userGiftDto.setGiftAssignedId(userGift.getGiftAssignedId());
			userGiftDto.setAssigned(userGift.getAssigned());
			userGiftDto.setHistoryId(userGift.getUserHistory().getHistoryId());
			userGiftDto.setRewardId(userGift.getRewards().getRewardId());		
			response.add(userGiftDto);
			
		}
		return response;
	}

}
