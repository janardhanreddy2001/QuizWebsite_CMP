package com.example.demo.implement;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.ContentDto;
import com.example.demo.DTO.QuizDto;
import com.example.demo.Entities.Category;
import com.example.demo.Entities.Content;
import com.example.demo.Entities.User;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ContentRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.Service.ContentService;

@Service
public class ContentImplement implements ContentService {
	
	@Autowired
	private ContentRepository contentRepository;
	
	@Autowired 
	private UserRepository userRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public Object createContent(ContentDto contentDto) {
		
		Map<String,Object> response=new HashMap<String, Object>();
		Content content=new Content();
		int user=contentDto.getUserId();
		User userId=userRepository.findById(user).orElseThrow(()-> new RuntimeException("records not found"+user));
		content.setCreatedBy(user);
		content.setUser(userId);
		content.setContent(contentDto.getContent());
		int conetnt=contentDto.getCategoryId();
		Category contentId=categoryRepository.findById(contentDto.getCategoryId()).orElseThrow(()-> new RuntimeException("records is not found"+conetnt))	;	
		content.setCategory(contentId);
		contentRepository.save(content);
		response.put("Status", "Seccuss");
		response.put("Message", "create is successfully ");
	

		return response;
	}

	@Override
	public List<Object> fetchAllContent() {
		
		List<Object> response=new ArrayList<Object>();
		
		List<Content> content=contentRepository.findAll();
		for(Content con:content) {
			ContentDto contentDto=new ContentDto();
			contentDto.setCategoryId(con.getCategory().getCategoryId());
			contentDto.setContentId(con.getContentId());
			contentDto.setContent(con.getContent());
			contentDto.setCreatedAt(con.getCreatedAt());
			contentDto.setUpdatedAt(con.getUpdatedAt());
			contentDto.setCreatedBy(con.getCreatedBy());
			contentDto.setUpdatedBy(con.getUpdatedBy());
			contentDto.setUserId(con.getUser().getUserId());
			response.add(contentDto);
	}
		
		return response;
	}

	@Override
	public Object fetchByIdContent(int contentId) {
		
		Content content=contentRepository.findById(contentId).orElseThrow(()-> new RuntimeException("records is not found"+contentId));
		ContentDto contentDto=new ContentDto();
		contentDto.setCategoryId(content.getCategory().getCategoryId());
		contentDto.setContent(content.getContent());
	
		
		return contentDto;
	}

	@Override
	public Object updateByIdContent(ContentDto contentDto, int contentId) {
		Map<String,Object> response=new HashMap<String, Object>();
		Content con=new Content();
		Content content=contentRepository.findById(contentId).orElseThrow(()-> new RuntimeException("record is not founds"+contentId));
		content.setContent(contentDto.getContent());
		int user=contentDto.getUserId();
		User userId=userRepository.findById(user).orElseThrow(()-> new RuntimeException(" userId record is not found"+user));
		content.setUpdatedBy(user);
		contentRepository.save(content);
		response.put("Status", "Success");
		response.put("Message", "updated is successfully");
		
		return response;
	}

	@Override
	public Object deleteContent(int contentId) {
		
		Map<String,Object> response=new HashMap<String, Object>();
		Content content=contentRepository.findById(contentId).orElseThrow(()-> new RuntimeException("record is not found"+contentId));
		contentRepository.deleteById(contentId);
		response.put("Status", "Success");
		response.put("Message", "Delete is successfuly");
		
	
		return response;
	}

	@Override
	public List<QuizDto> getQuiz(int categoryId, Date createAt) {
	    List<QuizDto> response = new ArrayList<>();
	    List<Content> contentList = contentRepository.findByCategoryCategoryIdAndCreatedAt(categoryId, createAt);
	    
	

	    for (Content con : contentList) {
	        QuizDto quiz = new QuizDto();
	        quiz.setContent(con.getContent());
	        quiz.setCategoryId(con.getCategory().getCategoryId());
	        
	        Category category=con.getCategory();
	        if(category != null) {
	        	quiz.setPoints(category.getPoints());
	        }
	        quiz.setContentId(con.getContentId());
	       
	       
	        response.add(quiz);
	        System.out.println("quiz added");
	    }

	    return response;
	}

	
	

}
