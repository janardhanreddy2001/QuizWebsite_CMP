package com.example.demo.Reposiotry;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.DTO.LoginDto;
import com.example.demo.Entities.Role;
import com.example.demo.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

	int countByEmailId(String emailId);



//	Optional<User> findByEmailId(String emailId);
//
//
//
//	Optional<User> findbyEmailId(String emailId);
	Optional<User> findByEmailId(String emailId); 

	

}
