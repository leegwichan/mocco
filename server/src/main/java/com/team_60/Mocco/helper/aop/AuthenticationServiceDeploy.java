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
@Profile("deploy")
public class AuthenticationServiceDeploy {
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private MemberService memberService;
    @Autowired
    private StudyService studyService;
    @Autowired
    private CommentService commentService;
    @Autowired
    private ReplyService replyService;
    @Autowired
    private ProposalService proposalService;
    @Autowired
    private TaskCheckService taskCheckService;

    private final List<String> idList = List.of("studyId","memberId","commentId","replyList","proposalId","taskCheckId");

    public AuthenticationServiceDeploy() {
    }

    public void AuthenticationCheckWithId(String parameterName, long id) { // patch, delete (id값 받는 경우)
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        //request 헤더에 들어오는 토큰에 있는 정보와 매개변수로 받는 ID의 멤버 정보가 일치하는지 확인
        Member member = new Member();
            switch (parameterName) {
                case "memberId":
                    member = memberService.findVerifiedMember(id);
                    break;
                case "studyId":
                    Study study = studyService.findVerifiedStudy(id);
                    member = study.getTeamLeader();
                    break;
                case "commentId":
                    Comment comment = commentService.findVerifiedComment(id);
                    member = comment.getMember();
                    break;
                case "replyId":
                    Reply reply = replyService.findVerifiedReply(id);
                    member = reply.getMember();
                    break;
                case "proposalId":
                    Proposal proposal = proposalService.findVerifiedProposal(id);
                    member = proposal.getMember();
                    break;
                case "taskCheckId":
                    TaskCheck taskCheck = taskCheckService.findVerifiedTaskCheck(id);
                    member = taskCheck.getMember();
                    break;
                default:
                    throw new BusinessLogicException(ExceptionCode.PARAMETER_NOT_FOUND);
            }
            if(!member.getEmail().equals(getEmailFromToken(request))){
                throw new BusinessLogicException(ExceptionCode.DIFFERENT_USER_FROM_TOKEN);
            }
        }
    public void AuthenticationCheckWithDto(Object requestBody, HttpServletRequest request){ //post
        if(requestBody instanceof PostDto){
            Member member = memberService.findVerifiedMember(((PostDto) requestBody).getMemberId());
            if(!member.getEmail().equals(getEmailFromToken(request)))  {
                throw new BusinessLogicException(ExceptionCode.DIFFERENT_USER_FROM_TOKEN);
            }
        }
    }
    public void AuthenticationCheckStudyMember(long studyId){ //studyRoom
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        List<StudyMember> studyMemberList = studyService.findVerifiedStudy(studyId).getStudyMemberList();
        studyMemberList.stream().forEach(n -> {if(!n.getMember().getEmail().equals(getEmailFromToken(request)))
            throw new BusinessLogicException(ExceptionCode.NOT_STUDY_MEMBER);});
    }
    public String getEmailFromToken(HttpServletRequest request){
        if( request.getHeader(ACCESS_TOKEN_HEADER) != null) {
            String accessToken = request.getHeader(ACCESS_TOKEN_HEADER).substring(TOKEN_HEADER_PREFIX.length());
            return jwtTokenProvider.getEmail(accessToken);
        }
        throw new BusinessLogicException(ExceptionCode.BAD_REQUEST_TOKEN);
    }
}
