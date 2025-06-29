package com.example.demo.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.CategoryDto;
import com.example.demo.Reposiotry.UserRepository;
import com.example.demo.Service.CategoryService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@CrossOrigin
public class CategoryController {
	
	
	@Autowired
	private CategoryService categoryService;
	
	
	@PostMapping("/createCategory")
	public ResponseEntity<Object> createCategory(@RequestBody CategoryDto categoryDto){
		
		Object  category=categoryService.createCategory(categoryDto);
		return new ResponseEntity<>(category,HttpStatus.OK);
		
	}
	
	@GetMapping("/fetchAllCategory")
	public ResponseEntity<List<CategoryDto>> fetchAllCategory(){
		List<CategoryDto> response=categoryService.fetchAllCategory();
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@GetMapping("/fetchByIdCategory/{categoryId}")
	public ResponseEntity<Object> fetchByIdCategory(@PathVariable int categoryId) {
		
		Object response=categoryService.fetchByIdCategory(categoryId);
		
		return new ResponseEntity<Object>(response,HttpStatus.OK);
	}
	
	@PutMapping("/updateCategory/{categoryId}")
	public ResponseEntity<Object> updateCategory( @RequestBody CategoryDto categoryDto,@PathVariable int categoryId) {
		
		Object response=categoryService.updateCategory(categoryDto,categoryId);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
	@DeleteMapping("deleteCategory/{categoryId}")
	public  ResponseEntity<Object> deleteCategory(@PathVariable int categoryId){
		Object response=categoryService.deleteCategory(categoryId);
		
		return new ResponseEntity<>(response,HttpStatus.OK);
	}
	
}
