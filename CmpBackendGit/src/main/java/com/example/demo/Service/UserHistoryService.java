package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.QuizCheckEntireDto;
import com.example.demo.DTO.UserHistoryDto;

public interface UserHistoryService {

	Object createUserHistory(UserHistoryDto userHistoryDto);

	List<Object> fetchAllUserHistory();

	Object quizCheckEntire(QuizCheckEntireDto quizCheckEntireDto);

	List<Object> fetchAllUserHistoryTop10();

}
