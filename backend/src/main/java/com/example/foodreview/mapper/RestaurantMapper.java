package com.example.foodreview.mapper;

import com.example.foodreview.dto.RestaurantRequest;
import com.example.foodreview.dto.RestaurantResponse;
import com.example.foodreview.entities.Restaurant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring", uses = {ReviewMapper.class})
public interface RestaurantMapper {

    Restaurant toEntity(RestaurantRequest request);

    RestaurantResponse toResponse(Restaurant restaurant);

    @Mapping(target = "id", ignore = true)
    void updateEntityFromRequest(RestaurantRequest request, @MappingTarget Restaurant restaurant);
}