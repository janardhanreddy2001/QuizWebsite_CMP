package com.example.demo.Service;

import java.util.Date;
import java.util.List;

import com.example.demo.DTO.ContentDto;
import com.example.demo.DTO.QuizDto;

public interface ContentService {

	Object createContent(ContentDto contentDto);

	List<Object> fetchAllContent();

	Object fetchByIdContent(int contentId);

	Object updateByIdContent(ContentDto contentDto, int contentId);

	Object deleteContent(int contentId);

	List<QuizDto> getQuiz(int categoryId, Date createAt);

	

}
