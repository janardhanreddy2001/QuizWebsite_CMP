package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.UserGiftAssignedDto;

public interface UserGiftAssignedService {

	Object UserGiftAssignedCreate(UserGiftAssignedDto userGiftAssignedDto);

	List<Object> fetchAllUserGift();

}
