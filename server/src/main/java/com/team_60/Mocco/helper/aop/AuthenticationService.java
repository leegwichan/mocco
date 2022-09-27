package com.team_60.Mocco.helper.aop;

import com.team_60.Mocco.comment.entity.Comment;
import com.team_60.Mocco.comment.service.CommentService;
import com.team_60.Mocco.dto.PostDto;
import com.team_60.Mocco.exception.businessLogic.BusinessLogicException;
import com.team_60.Mocco.exception.businessLogic.ExceptionCode;
import com.team_60.Mocco.member.entity.Member;
import com.team_60.Mocco.member.service.MemberService;
import com.team_60.Mocco.proposal.entity.Proposal;
import com.team_60.Mocco.proposal.service.ProposalService;
import com.team_60.Mocco.reply.entity.Reply;
import com.team_60.Mocco.reply.service.ReplyService;
import com.team_60.Mocco.security.filter.JwtTokenProvider;
import com.team_60.Mocco.study.entity.Study;
import com.team_60.Mocco.study.service.StudyService;
import com.team_60.Mocco.study_member.entity.StudyMember;
import com.team_60.Mocco.task_check.entity.TaskCheck;
import com.team_60.Mocco.task_check.service.TaskCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.team_60.Mocco.security.filter.JwtConstants.ACCESS_TOKEN_HEADER;
import static com.team_60.Mocco.security.filter.JwtConstants.TOKEN_HEADER_PREFIX;

@Component
@Profile("!deploy")
public class AuthenticationService {
    public AuthenticationService() {
    }

    public void AuthenticationCheckWithId(String parameterName, long id) { // patch, delete (id값 받는 경우)
    }

    public void AuthenticationCheckWithDto(Object requestBody, HttpServletRequest request){ //post
    }
    public void AuthenticationCheckStudyMember(long studyId){ //studyRoom
    }
    public void getEmailFromToken(HttpServletRequest request){}
}

