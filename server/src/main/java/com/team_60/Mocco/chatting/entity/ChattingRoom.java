package com.team_60.Mocco.chatting.entity;

import com.team_60.Mocco.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ChattingRoom extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long chatting_room_id;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private ChattingRoomType chattingRoomType = ChattingRoomType.STUDY;

    public enum ChattingRoomType{
        STUDY("STUDY");

        @Getter
        private String type;

        ChattingRoomType(String type){
            this.type = type;
        }
    }

}
