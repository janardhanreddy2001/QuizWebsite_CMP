package com.example.demo.implement;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.QuizCheckEntireDto;
import com.example.demo.DTO.UserHistoryDto;
import com.example.demo.Entities.Content;
import com.example.demo.Entities.User;
import com.example.demo.Entities.UserHistory;
import com.example.demo.repostory.ContentRepository;
import com.example.demo.repository.UserHistoryReposiotry;
import com.example.demo.repository.UserRepository;
import com.example.demo.Service.UserHistoryService;

@Service
public class UserHistoryImplement implements UserHistoryService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private UserHistoryReposiotry userHistoryReposiotry;

    @Override
    public Object createUserHistory(UserHistoryDto userHistoryDto) {
        Map<String, Object> response = new HashMap<>();

        UserHistory userHistory = new UserHistory();

        User user = userRepository.findById(userHistoryDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found: " + userHistoryDto.getUserId()));
        userHistory.setUser(user);

        Content content = contentRepository.findById(userHistoryDto.getContentId())
                .orElseThrow(() -> new RuntimeException("Content not found: " + userHistoryDto.getContentId()));
        userHistory.setContent(content);

        userHistory.setResponseContent(userHistoryDto.getResponseContent());
        userHistory.setEachQuestionpoints(userHistoryDto.getEachQuestionpoints());

        Optional<UserHistory> lastRecordOpt = userHistoryReposiotry
                .findTopByUserUserIdOrderByAttemptedDateDesc(userHistoryDto.getUserId());

        long previousScore = lastRecordOpt.map(UserHistory::getTotalScore).orElse(0L);
        long currentScore = previousScore + (userHistoryDto.getTotalScore() != null ? userHistoryDto.getTotalScore() : 0L);

        userHistory.setTotalScore(currentScore);

        userHistoryReposiotry.save(userHistory);
        response.put("Status", "Success");
        response.put("Message", "User history created successfully");

        return response;
    }

    @Override
    public List<Object> fetchAllUserHistory() {
        List<Object> response = new ArrayList<>();

        List<UserHistory> userHistoryList = userHistoryReposiotry.findAll();
        for (UserHistory userHistory : userHistoryList) {
            UserHistoryDto userHistoryDto = new UserHistoryDto();

            userHistoryDto.setAttemptedDate(userHistory.getAttemptedDate());
            userHistoryDto.setResponseContent(userHistory.getResponseContent());
            userHistoryDto.setContentId(userHistory.getContent().getContentId());
            userHistoryDto.setHistoryId(userHistory.getHistoryId());
            userHistoryDto.setTotalScore(userHistory.getTotalScore());
            userHistoryDto.setEachQuestionpoints(userHistory.getEachQuestionpoints());
            userHistoryDto.setUserId(userHistory.getUser().getUserId());
            response.add(userHistoryDto);
        }

        return response;
    }

    @Override
    public Object quizCheckEntire(QuizCheckEntireDto dto) {
        Map<String, Object> response = new HashMap<>();

        int userId = dto.getUserId();
        int contentId = dto.getContentId();
        int categoryId = dto.getCategoryId();

        String attemptedDate = new SimpleDateFormat("yyyy-MM-dd").format(dto.getAttemptedDate());

        List<UserHistory> result = userHistoryReposiotry
                .checkIfAttemptedNative(userId, contentId, categoryId, attemptedDate);

        if (!result.isEmpty()) {
            response.put("Status", "Fail");
            response.put("Message", "Quiz already attempted.");
        } else {
            response.put("Status", "Success");
            response.put("Message", "You may take the quiz.");
        }

        return response;
    }

    @Override
    public List<Object> fetchAllUserHistoryTop10() {
        List<Object> response = new ArrayList<>();

        List<UserHistory> userHistoryList = userHistoryReposiotry.findTop10ByOrderByTotalScoreDesc();

        for (UserHistory userHistory : userHistoryList) {
            UserHistoryDto userHistoryDto = new UserHistoryDto();
            userHistoryDto.setAttemptedDate(userHistory.getAttemptedDate());
            userHistoryDto.setResponseContent(userHistory.getResponseContent());
            userHistoryDto.setContentId(userHistory.getContent().getContentId());
            userHistoryDto.setHistoryId(userHistory.getHistoryId());
            userHistoryDto.setTotalScore(userHistory.getTotalScore());
            userHistoryDto.setEachQuestionpoints(userHistory.getEachQuestionpoints());
            userHistoryDto.setUserId(userHistory.getUser().getUserId());
            response.add(userHistoryDto);
        }

        return response;
    }
}
