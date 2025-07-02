package com.example.demo.service;

import java.util.Date;
import java.util.List;

import com.example.demo.dto.ContentDto;
import com.example.demo.dto.QuizDto;

public interface ContentService {

	Object createContent(ContentDto contentDto);

	List<Object> fetchAllContent();

	Object fetchByIdContent(int contentId);

	Object updateByIdContent(ContentDto contentDto, int contentId);

	Object deleteContent(int contentId);

	List<QuizDto> getQuiz(int categoryId, Date createAt);

	

}
