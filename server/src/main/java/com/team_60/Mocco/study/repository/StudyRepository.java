package com.team_60.Mocco.study.repository;

import com.team_60.Mocco.study.entity.Study;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;
import java.util.List;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {
    Optional<Study> findByStudyId(long studyId);
    Page<Study> findByStudyStatus(Study.StudyStatus status, Pageable pageable);

    Page<Study> findBySummaryContaining(String summary, Pageable pageable);
    List<Study> findByStudyStatusAndStartDateBefore(Study.StudyStatus studyStatus, LocalDate startDate);
    List<Study> findByStudyStatusAndEndDateBefore(Study.StudyStatus studyStatus,LocalDate endDate);
    List<Study> findByStudyStatusAndEndDate(Study.StudyStatus studyStatus,LocalDate endDate);
}
