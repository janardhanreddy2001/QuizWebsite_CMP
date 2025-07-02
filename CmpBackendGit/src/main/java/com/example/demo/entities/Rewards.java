package com.example.demo.Entities;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

import com.example.demo.json.MapToJsonConverter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "rewarding")
public class Rewards {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reward_id")
    private Integer rewardId;
    
    @Lob
	@Convert(converter = MapToJsonConverter.class)
	@Column(name = "reward_type")
	private Map<String, Object> rewardType;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "updated_by")
    private Integer updatedBy;

    @Column(name = "created_at")
    private Date createdAt;

    @Column(name = "updated_at")
    private Date updatedAt;

//    @OneToMany(mappedBy = "reward", cascade = CascadeType.ALL)
//    @JsonIgnore
//    private List<TopScoreUsers> topScoreUsers;
    
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    
    @OneToMany(mappedBy = "rewards",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserGiftAssigned> userGiftAssigneds;

    @PrePersist
    public void onCreate() {
       this.createdAt=new Date();
    }

    @PreUpdate
    public void onUpdate() {
        this.updatedAt =new Date();
    }
}