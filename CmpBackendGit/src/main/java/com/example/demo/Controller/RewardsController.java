package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ContentDto;
import com.example.demo.DTO.RewardsDto;
import com.example.demo.Entities.Rewards;
import com.example.demo.Service.RewardsService;

@RestController
@CrossOrigin
public class RewardsController {
    @Autowired
    private RewardsService rewardService;

    @PostMapping("/createReward")
	public ResponseEntity<Object> createReward(@RequestBody RewardsDto rewardsDto){
		
		Object response=rewardService.createReward(rewardsDto);
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
    @GetMapping("/fetchAllReward")
	public ResponseEntity<List<Object>> fetchAllReward(){
		
		List<Object> response=rewardService.fetchAllReward();
		
	return new ResponseEntity<>(response,HttpStatus.OK);
		
	}

	@GetMapping("/fetchByIdReward/{rewardId}")
	public ResponseEntity<Object> fetchByIdReward(@PathVariable int rewardId){
		
		Object response =rewardService.fetchByIdReward(rewardId);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
		
	}
	@PutMapping("/updateByIdReward/{rewardId}")
	public ResponseEntity<Object> updateByIdReward(@RequestBody RewardsDto rewardsDto,@PathVariable int rewardId){
		
		Object response=rewardService.updateByIdReward(rewardsDto,rewardId);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
		
	}
	@DeleteMapping("/deleteReward/{rewardId}")
	public ResponseEntity<Object> deleteReward(@PathVariable int rewardId){
		
		Object response=rewardService.deleteReward(rewardId);
		return new ResponseEntity<>(response,HttpStatus.OK);
		
	}
}