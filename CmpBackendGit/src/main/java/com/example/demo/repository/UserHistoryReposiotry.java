package com.example.demo.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.User;
import com.example.demo.entities.UserHistory;

@Repository
public interface UserHistoryReposiotry extends JpaRepository<UserHistory, Integer> {

	


	

	

	
	Optional<UserHistory> findTopByUserUserIdOrderByAttemptedDateDesc(Integer userId);

	@Query(value = "SELECT uh.* FROM user_history uh " +
            "JOIN content c ON uh.content_id = c.content_id " +
            "WHERE uh.user_id = :userId AND " +
            "uh.content_id = :contentId AND " +
            "c.category_id = :categoryId AND " +
            "DATE(uh.attempted_date) = :attemptedDate",
    nativeQuery = true)
List<UserHistory> checkIfAttemptedNative(
 @Param("userId") int userId,
 @Param("contentId") int contentId,
 @Param("categoryId") int categoryId,
 @Param("attemptedDate") String attemptedDate  
);

	List<UserHistory> findTop10ByOrderByTotalScoreDesc();
		


	

	




}
