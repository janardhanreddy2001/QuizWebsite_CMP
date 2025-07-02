package com.example.demo.repository; 

import org.springframework.data.jpa.repository.JpaRepository; // ✅ JPA import
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    int countByCategoryTypeIgnoreCase(String categoryType);
}
