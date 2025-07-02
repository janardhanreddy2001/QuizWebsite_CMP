package com.example.demo.implement;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ContentDto;
import com.example.demo.dto.QuizDto;
import com.example.demo.entities.Category;
import com.example.demo.entities.Content;
import com.example.demo.entities.User;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ContentRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.ContentService;

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

    Map<String, Object> response = new HashMap<>();

    Content content = new Content();

    int userId = contentDto.getUserId();
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User record not found: " + userId));

    content.setCreatedBy(userId);
    content.setUser(user);
    content.setContent(contentDto.getContent());

    int categoryId = contentDto.getCategoryId();
    Category category = categoryRepository.findById(categoryId)
        .orElseThrow(() -> new RuntimeException("Category record not found: " + categoryId));

    content.setCategory(category);

    contentRepository.save(content);

    response.put("Status", "Success");
    response.put("Message", "Content created successfully");

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
