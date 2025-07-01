package com.example.demo.repository; 

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Category;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
    int countByCategoryTypeIgnoreCase(String categoryType);
}
