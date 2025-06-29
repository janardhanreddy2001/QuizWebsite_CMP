package com.example.demo.Reposiotry;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Category;

@Repository
public interface CategoryRepository  extends JpaRepository<Category, Integer>{



	int countByCategoryTypeIgnoreCase(String categoryType);

}
