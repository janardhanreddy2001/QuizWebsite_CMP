package com.example.demo.implement;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.CategoryDto;
import com.example.demo.Entities.Category;
import com.example.demo.Entities.User;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.Service.CategoryService;

@Service
public class CategoryImplement implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRespository;

    @Override
    public Object createCategory(CategoryDto categoryDto) {
        Map<String, Object> response = new HashMap<>();

        if (categoryRepository.countByCategoryTypeIgnoreCase(categoryDto.getCategoryType()) > 0) {
            response.put("Status", "Fail");
            response.put("Message", "Category already exists");
        } else {
            Category category = new Category();
            User user = userRespository.findById(categoryDto.getUserId()).orElse(null);

            if (user == null) {
                throw new RuntimeException("User not found: " + categoryDto.getUserId());
            }

            category.setUser(user);
            category.setCreatedBy(user.getCreatedBy());
            category.setCategoryType(categoryDto.getCategoryType());
            category.setDiscription(categoryDto.getDiscription());
            category.setPoints(categoryDto.getPoints());

            categoryRepository.save(category);

            response.put("Status", "Success");
            response.put("Message", "Category created successfully");
        }

        return response;
    }

    @Override
    public List<CategoryDto> fetchAllCategory() {
        List<CategoryDto> responseDto = new ArrayList<>();
        List<Category> categoryAll = categoryRepository.findAll();

        for (Category category : categoryAll) {
            CategoryDto categoryDto = new CategoryDto();
            categoryDto.setCategoryId(category.getCategoryId());
            categoryDto.setCategoryType(category.getCategoryType());
            categoryDto.setCreatedAt(category.getCreatedAt());
            categoryDto.setPoints(category.getPoints());
            categoryDto.setDiscription(category.getDiscription());
            categoryDto.setCreatedBy(category.getCreatedBy());
            categoryDto.setUpdatedAt(category.getUpdatedAt());
            categoryDto.setUpdatedBy(category.getUpdatedBy());

            responseDto.add(categoryDto);
        }

        return responseDto;
    }

    @Override
    public Object fetchByIdCategory(int categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Record not found: " + categoryId));

        CategoryDto categoryDto = new CategoryDto();
        categoryDto.setCategoryId(categoryId);
        categoryDto.setCategoryType(category.getCategoryType());
        categoryDto.setCreatedAt(category.getCreatedAt());
        categoryDto.setDiscription(category.getDiscription());
        categoryDto.setPoints(category.getPoints());
        categoryDto.setCreatedBy(category.getCreatedBy());

        return categoryDto;
    }

    @Override
    public Object updateCategory(CategoryDto categoryDto, int categoryId) {
        Category category = categoryRepository.findById(categoryId).orElse(null);

        if (category == null) {
            throw new RuntimeException("Record not found: " + categoryId);
        }

        category.setCategoryType(categoryDto.getCategoryType());
        category.setDiscription(categoryDto.getDiscription());
        category.setPoints(categoryDto.getPoints());

        int userId = category.getUser().getUserId();
        category.setUpdatedBy(userId);

        categoryRepository.save(category);
        return categoryDto;
    }

    @Override
    public Object deleteCategory(int categoryId) {
        Map<String, Object> response = new HashMap<>();

        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Record not found in category table: " + categoryId));

        categoryRepository.deleteById(categoryId);
        response.put("Status", "Success");
        response.put("Message", "Category deleted successfully: " + categoryId);

        return response;
    }
}
