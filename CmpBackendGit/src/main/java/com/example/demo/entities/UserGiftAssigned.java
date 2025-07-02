package com.example.demo.Entities;

import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.Data;

@Data
@Entity
public class UserGiftAssigned {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="gift_assigned_id")
	private int giftAssignedId;
	
	private Date assigned;
	
	@ManyToOne
	@JoinColumn(name = "history_id")
	private UserHistory userHistory;  

	
	
	@ManyToOne
	@JoinColumn(name="reward_id")
	private Rewards rewards;
	
	
	
	 @PrePersist
	 protected void OnAssigned() {
		 this.assigned=new Date();
		 
	 }
	

}
