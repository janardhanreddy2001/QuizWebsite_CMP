package com.example.demo.Service;

import java.util.List;

import com.example.demo.DTO.CategoryDto;

public interface CategoryService {

	Object createCategory(CategoryDto categoryDto);

	List<CategoryDto> fetchAllCategory();

	Object fetchByIdCategory(int categoryId);

	Object updateCategory(CategoryDto categoryDto, int categoryId);

	Object deleteCategory(int categoryId);

}
