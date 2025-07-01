package com.example.demo.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Content;

@Repository
public interface ContentRepository extends JpaRepository<Content, Integer> {

	@Query("SELECT c FROM Content c WHERE c.category.categoryId = :categoryId AND DATE(c.createdAt) = :createdAt")
	List<Content> findByCategoryCategoryIdAndCreatedAt(@Param("categoryId") int categoryId, @Param("createdAt") Date createdAt);


	

}
