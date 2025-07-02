package com.example.demo.entities;

import java.util.Date;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.Data;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "User_id")
    private int userId;
    @Column(name="first_name",length=45)
    private String firstName;
    @Column(name="last_name",length=45)
    private String lastName;
    @Column(name="email_id",length=45)
    private String emailId;
    @Column(name="password",length=15)
    private String password;
    @Column(name="contact",length=10)
    private String contact;
    @Column(name="address",length=250)
    private String address;
    @Column(name="state",length=45)
    private String state;
    @Column(name="city",length=45)
    private String city;
    @Column(name="pin_code",length=6)
    private String pincode;
    @Column(name="create_at")
    private Date createdAt;
    @Column(name="create_by")
    private int createdBy;
    @Column(name="update_by")
    private int updatedBy;
    @Column(name="updated_at")
    private Date updatedAt;
  
    @ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;
    
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Category> category;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
   private List<Content> content;
    
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserHistory> userHistory;
    
    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Rewards> reward;
    
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }
	@PreUpdate
	protected void onUpdate() {
		this.updatedAt = new Date();
	}
	


}
