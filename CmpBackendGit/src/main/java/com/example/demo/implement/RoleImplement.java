package com.example.demo.implement;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.RoleDto;
import com.example.demo.entities.Role;
import com.example.demo.repository.RoleRepository;
import com.example.demo.service.RoleService;

@Service
public class RoleImplement implements RoleService {
	
	@Autowired
	private RoleRepository roleRepository;

		@Override
		public Object createRole(RoleDto roleDto) {
			
			Map<String,Object> map =new HashMap<>();
			Role role=new Role();
			
			role.setRoleName(roleDto.getRoleName());
			roleRepository.save(role);
			map.put("status", "successfully");
			map.put("message", "create is successfully");
			
			return map;
		}

}
