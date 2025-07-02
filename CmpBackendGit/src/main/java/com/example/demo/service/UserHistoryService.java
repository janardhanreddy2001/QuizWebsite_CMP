package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.QuizCheckEntireDto;
import com.example.demo.dto.UserHistoryDto;

public interface UserHistoryService {

	Object createUserHistory(UserHistoryDto userHistoryDto);

	List<Object> fetchAllUserHistory();

	Object quizCheckEntire(QuizCheckEntireDto quizCheckEntireDto);

	List<Object> fetchAllUserHistoryTop10();

}
