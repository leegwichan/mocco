package com.team_60.Mocco.alarm.repository;

import com.team_60.Mocco.alarm.entity.Alarm;
import com.team_60.Mocco.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    List<Alarm> findByMember(Member member);

    void deleteAllByMember(Member member);
}
