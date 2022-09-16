package com.team_60.Mocco.reply.service;

import com.team_60.Mocco.reply.entity.Reply;

public interface ReplyService {

    Reply findReply(long replyId);
    Reply createReply(Reply reply);
    Reply updateReply(Reply reply);
    Reply deleteReply(long replyId);

}
