package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.CategoryDto;

public interface CategoryService {

	Object createCategory(CategoryDto categoryDto);

	List<CategoryDto> fetchAllCategory();

	Object fetchByIdCategory(int categoryId);

	Object updateCategory(CategoryDto categoryDto, int categoryId);

	Object deleteCategory(int categoryId);

}
