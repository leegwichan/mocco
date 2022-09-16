package com.team_60.Mocco.study.service;

import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.repository.StudyRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class StudyServiceImpl implements StudyService{

    private final StudyRepository studyRepository;

    @Override
    public Study createStudy(Study study) {
        //taskList 가 null 인지 체크(null 불가) 15개 이하
        //인원이 2명 이상 5명 이하인지 확인
        //스터디 기간 최소 7일 최대 180일
        //멤버에 스터디 아이디 추가
        return null;
    }

    @Override
    public Study updateStudy(long studyId) {
        //아이디로 스터디 찾기
        //작성자와 패치 날린사람 동일인이지 확인
        //작성자가 스터디 가지고 있는지 확인..? 필요한가?
        //taskList 가 null 인지 체크(null 불가) 15개 이하
        //인원이 2명 이상 5명 이하인지 확인
        //스터디 기간 최소 7일 최대 180일
        return null;
    }

    @Override
    public void deleteStudy(long studyId) {

    }

    @Override
    public Study findStudy(long studyId) {
        return null;
    }

    @Override
    public Page<Study> findStudies(int page, int size) {
        return null;
    }

    @Override
    public Page<Study> searchStudies(String query, int page, int size) {
        return null;
    }

        //studyId에 맞는 스터디 반환
    @Override
    public Study findVerifiedStudy(long studyId) {
        Optional<Study> optionalStudy = studyRepository.findById(studyId);
        Study findStudy = optionalStudy.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.STUDY_NOT_FOUND));
        return findStudy;
    }

    private void validateStudy(Study study){
        //스터디 유효성 검사?
        //taskList 가 null 인지 체크(null 불가) 15개 이하
        //인원이 2명 이상 5명 이하인지 확인
        //스터디 기간 최소 7일 최대 180일
    }
}
