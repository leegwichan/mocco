package com.team_60.Mocco.alarm.mapper;

import com.team_60.Mocco.alarm.dto.AlarmDto;
import com.team_60.Mocco.alarm.entity.Alarm;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AlarmMapper {

    List<AlarmDto.Response> alarmsToAlarmResponseDtos(List<Alarm> alarms);
}
