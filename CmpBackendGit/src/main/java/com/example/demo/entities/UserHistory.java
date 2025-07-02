package com.example.demo.Entities;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.example.demo.json.MapToJsonConverter;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import lombok.Data;

@Data
@Entity
public class UserHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="history_id")
	private int historyId;
	@Column(name="attempted_date")
	private Date attemptedDate;
	@Column(name="total_score")
	private Long totalScore;
	@Column(name="each_question_points")
	private int eachQuestionpoints;

	
	@Lob
	@Convert(converter = MapToJsonConverter.class)
	@Column(name="response_content")
	private Map<String,Object>  responseContent;
	
	@ManyToOne
	@JoinColumn(name="content_id")
	private Content content;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
	@OneToMany(mappedBy = "userHistory", cascade = CascadeType.ALL)
	private List<UserGiftAssigned> userGiftAssigned;


	
	@PrePersist
	protected void OnAttempedDate() {
		this.attemptedDate=new Date();
	}

}
