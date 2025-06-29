package com.example.demo.implement;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import com.example.demo.DTO.LoginDto;
import com.example.demo.DTO.UserDto;
import com.example.demo.Entities.Role;
import com.example.demo.Entities.User;
import com.example.demo.Reposiotry.RoleRepository;
import com.example.demo.Reposiotry.UserRepository;
import com.example.demo.Service.UserService;


@Service
public class UserImplement implements UserService{
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	@Override
	public Object createRole(UserDto userDto) {
		
		Map<String,Object> response=new HashMap<>();
		
		if(userRepository.countByEmailId(userDto.getEmailId())>0) {
			
			response.put("Status", "fail");
			response.put("message", "alread email is existed");
			
		}
		else {
		
		User user=new User();
		
		int user1=userDto.getRoleId();
		Role userId=roleRepository.findById(user1).orElseThrow(()-> new RuntimeException("find not found"));
		user.setRole(userId);
		user.setCreatedBy(user1);
		
		
		user.setAddress(userDto.getAddress());
		user.setCity(userDto.getCity());
		user.setPincode(userDto.getPincode());
		user.setContact(userDto.getContact());
		user.setEmailId(userDto.getEmailId());
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setPassword(userDto.getPassword());
		user.setPincode(userDto.getPincode());
		user.setState(userDto.getState());
		
		userRepository.save(user);
		response.put("status", "successfully");
		response.put("message", "create successfully");
		}
		return response;
		
	}

	@Override
	public List<Object> userFetchAll() {
		
		List<Object> response =new ArrayList();
		List<User> user=userRepository.findAll();
		
		for(User use:user) {
			UserDto user1=new UserDto();
			user1.setAddress(use.getAddress());	
			user1.setCity(use.getCity());
			user1.setContact(use.getContact());
			user1.setEmailId(use.getEmailId());
			user1.setPassword(use.getPassword());
			user1.setState(use.getState());
			user1.setFirstName(use.getFirstName());
			user1.setLastName(use.getLastName());
			user1.setPincode(use.getPincode());
			user1.setUserId(use.getUserId());
			response.add(user1);
		}
		
		return response;
	}

	@Override
	public Object fuserFetchId(int userId) {

		UserDto userDto=new UserDto();
		User user=userRepository.findById(userId).orElseThrow(()-> new RuntimeException("record not fouund"));
		userDto.setAddress(user.getAddress());
		userDto.setCity(user.getCity());	
		userDto.setAddress(user.getAddress());
		userDto.setEmailId(user.getEmailId());
		userDto.setFirstName(user.getFirstName());
		userDto.setLastName(user.getLastName());
		userDto.setPincode(user.getPincode());
		userDto.setUserId(userId);
		return userDto;
	}
	
	@Override
    public Object updateUserDetails(int userId, UserDto userDtoUpd) {
        Optional<User> optionalUser = userRepository.findById((int) userId);
        
        if (optionalUser.isEmpty()) {
            return null; 
        }

        User existingUser = optionalUser.get();

     
        existingUser.setFirstName(userDtoUpd.getFirstName());
        existingUser.setLastName(userDtoUpd.getLastName());
        existingUser.setAddress(userDtoUpd.getAddress());
        existingUser.setCity(userDtoUpd.getCity());
        existingUser.setState(userDtoUpd.getState());
        existingUser.setPincode(userDtoUpd.getPincode());
        int role=userDtoUpd.getRoleId();
        Role userI=roleRepository.findById(role).orElseThrow(()-> new RuntimeException("userId is not found"+role));
        existingUser.setUpdatedBy(userI.getRoleId());;
        existingUser.setContact(userDtoUpd.getContact());
        existingUser.setEmailId(userDtoUpd.getEmailId());
        existingUser.setPassword(userDtoUpd.getPassword());
   

        return userRepository.save(existingUser);
    }
	

	@Override
	public String deleteUser(int userId) {
		userRepository.deleteById(userId);
		return "delete successfully";
	}

	 @Override
	    public Object loginCreate(LoginDto loginDto) {
	        Map<String, Object> response = new HashMap<>();

	        String emailId = loginDto.getEmailId();
	        String password = loginDto.getPassword();

	        Optional<User> login = userRepository.findByEmailId(emailId);  

	        if (login.isEmpty()) {
	            response.put("Status", "Fail");
	            response.put("Message", "EmailId not found");
	            return response;
	        }	        
	        User user = login.get();
	        if (password.equals(user.getPassword())) {
	            response.put("Status", "Success");		
	            response.put("Message", "Login successful");
	            response.put("roleId", user.getRole().getRoleId());
	            response.put("Name", user.getFirstName());
	            response.put("userId", user.getUserId());
	        } else {
	            response.put("Status", "Fail");
	            response.put("Message", "Incorrect password");
	        }

	        return response;
	    }
}


