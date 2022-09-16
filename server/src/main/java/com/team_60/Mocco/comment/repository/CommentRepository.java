package com.team_60.Mocco.comment.repository;

import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.study.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByStudyOrderByStudyDesc(Study study);
}
