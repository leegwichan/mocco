package com.team_60.Mocco.study_member.repository;

import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study_member.entity.StudyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface StudyMemberRepository extends JpaRepository<StudyMember, Long> {
    Long countByStudy(Study study);
    Optional<StudyMember> findByStudyAndMember(Study study, Member member);
    List<StudyMember> findByStudy(Study study);
}
