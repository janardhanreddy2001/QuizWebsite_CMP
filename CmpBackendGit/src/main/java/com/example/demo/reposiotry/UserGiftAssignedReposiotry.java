package com.example.demo.Reposiotry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.UserGiftAssigned;


@Repository
public interface UserGiftAssignedReposiotry extends JpaRepository<UserGiftAssigned, Integer>{

}
