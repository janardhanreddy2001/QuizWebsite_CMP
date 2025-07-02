package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Rewards;

public interface RewardsRepository extends JpaRepository<Rewards, Integer> {
}
