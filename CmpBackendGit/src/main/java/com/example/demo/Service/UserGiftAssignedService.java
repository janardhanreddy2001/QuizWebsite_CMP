package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.UserGiftAssignedDto;

public interface UserGiftAssignedService {

	Object UserGiftAssignedCreate(UserGiftAssignedDto userGiftAssignedDto);

	List<Object> fetchAllUserGift();

}
