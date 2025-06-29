package com.example.demo.Controller;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.RoleDto;
import com.example.demo.Service.RoleService;

@RestController
@CrossOrigin
public class RoleController {
	@Autowired
	private RoleService roleService;
	@PostMapping("/createRole")
	public ResponseEntity<Object> createRole(@RequestBody RoleDto roleDto){
		
		Object response=roleService.createRole(roleDto);
		return  ResponseEntity.ok(response);
	}

}
