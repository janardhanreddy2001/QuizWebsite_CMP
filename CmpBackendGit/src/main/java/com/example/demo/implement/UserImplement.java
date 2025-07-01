package com.example.demo.implement;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.LoginDto;
import com.example.demo.DTO.UserDto;
import com.example.demo.Entities.Role;
import com.example.demo.Entities.User;
import com.example.demo.repository.RoleRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.Service.UserService;

@Service
public class UserImplement implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Map<String, Object> createRole(UserDto userDto) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.countByEmailId(userDto.getEmailId()) > 0) {
            response.put("status", "fail");
            response.put("message", "Email already exists");
        } else {
            User user = new User();
            int roleId = userDto.getRoleId();
            Role role = roleRepository.findById(roleId)
                    .orElseThrow(() -> new RuntimeException("Role not found with ID: " + roleId));

            user.setRole(role);
            user.setCreatedBy(roleId);
            user.setAddress(userDto.getAddress());
            user.setCity(userDto.getCity());
            user.setPincode(userDto.getPincode());
            user.setContact(userDto.getContact());
            user.setEmailId(userDto.getEmailId());
            user.setFirstName(userDto.getFirstName());
            user.setLastName(userDto.getLastName());
            user.setPassword(userDto.getPassword());
            user.setState(userDto.getState());

            userRepository.save(user);
            response.put("status", "success");
            response.put("message", "User created successfully");
        }

        return response;
    }

    @Override
    public List<UserDto> userFetchAll() {
        List<UserDto> response = new ArrayList<>();
        List<User> users = userRepository.findAll();

        for (User user : users) {
            UserDto dto = new UserDto();
            dto.setAddress(user.getAddress());
            dto.setCity(user.getCity());
            dto.setContact(user.getContact());
            dto.setEmailId(user.getEmailId());
            dto.setPassword(user.getPassword());
            dto.setState(user.getState());
            dto.setFirstName(user.getFirstName());
            dto.setLastName(user.getLastName());
            dto.setPincode(user.getPincode());
            dto.setUserId(user.getUserId());
            dto.setRoleId(user.getRole().getRoleId());
            response.add(dto);
        }

        return response;
    }

    @Override
    public UserDto fuserFetchId(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        UserDto userDto = new UserDto();
        userDto.setAddress(user.getAddress());
        userDto.setCity(user.getCity());
        userDto.setEmailId(user.getEmailId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setPincode(user.getPincode());
        userDto.setUserId(userId);
        userDto.setRoleId(user.getRole().getRoleId());

        return userDto;
    }

    @Override
    public Map<String, Object> updateUserDetails(int userId, UserDto userDtoUpd) {
        Optional<User> optionalUser = userRepository.findById(userId);
        Map<String, Object> response = new HashMap<>();

        if (optionalUser.isEmpty()) {
            response.put("status", "fail");
            response.put("message", "User not found");
            return response;
        }

        User existingUser = optionalUser.get();
        existingUser.setFirstName(userDtoUpd.getFirstName());
        existingUser.setLastName(userDtoUpd.getLastName());
        existingUser.setAddress(userDtoUpd.getAddress());
        existingUser.setCity(userDtoUpd.getCity());
        existingUser.setState(userDtoUpd.getState());
        existingUser.setPincode(userDtoUpd.getPincode());

        int roleId = userDtoUpd.getRoleId();
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found with ID: " + roleId));
        existingUser.setUpdatedBy(roleId);
        existingUser.setRole(role);
        existingUser.setContact(userDtoUpd.getContact());
        existingUser.setEmailId(userDtoUpd.getEmailId());
        existingUser.setPassword(userDtoUpd.getPassword());

        userRepository.save(existingUser);

        response.put("status", "success");
        response.put("message", "User updated successfully");

        return response;
    }

    @Override
    public String deleteUser(int userId) {
        if (!userRepository.existsById(userId)) {
            return "User not found";
        }
        userRepository.deleteById(userId);
        return "User deleted successfully";
    }

    @Override
    public Map<String, Object> loginCreate(LoginDto loginDto) {
        Map<String, Object> response = new HashMap<>();
        String emailId = loginDto.getEmailId();
        String password = loginDto.getPassword();

        Optional<User> login = userRepository.findByEmailId(emailId);

        if (login.isEmpty()) {
            response.put("status", "fail");
            response.put("message", "Email ID not found");
            return response;
        }

        User user = login.get();
        if (password.equals(user.getPassword())) {
            response.put("status", "success");
            response.put("message", "Login successful");
            response.put("roleId", user.getRole().getRoleId());
            response.put("name", user.getFirstName());
            response.put("userId", user.getUserId());
        } else {
            response.put("status", "fail");
            response.put("message", "Incorrect password");
        }

        return response;
    }
}
