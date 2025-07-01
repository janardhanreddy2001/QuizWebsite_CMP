package com.example.demo.reposiotry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

}
