package com.example.foodreview.services;

import com.example.foodreview.dto.RestaurantRequest;
import com.example.foodreview.dto.RestaurantResponse;
import com.example.foodreview.entities.Restaurant;
import com.example.foodreview.exception.ResourceNotFoundException;
import com.example.foodreview.mapper.RestaurantMapper;
import com.example.foodreview.repositories.RestaurantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;
    private final RestaurantMapper restaurantMapper;

    public List<RestaurantResponse> findAll() {
        return restaurantRepository.findAll().stream()
                .map(restaurantMapper::toResponse)
                .toList();
    }

    public RestaurantResponse findById(Long id) {
        return restaurantRepository.findById(id)
                .map(restaurantMapper::toResponse)
                .orElseThrow(()-> new ResourceNotFoundException("Restaurant not found"));
    }

    public RestaurantResponse createRestaurant(RestaurantRequest request) {
        Restaurant restaurant = restaurantMapper.toEntity(request);
        Restaurant saved = restaurantRepository.save(restaurant);
        return restaurantMapper.toResponse(saved);
    }

    public RestaurantResponse updateRestaurant(Long id, RestaurantRequest request) {
        Restaurant restaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant not found"));
        restaurantMapper.updateEntityFromRequest(request, restaurant);
        Restaurant updated = restaurantRepository.save(restaurant);
        return restaurantMapper.toResponse(updated);
    }

    public void deleteById(Long id) {
        if(!restaurantRepository.existsById(id)) {
            throw new ResourceNotFoundException("Restaurant not found");
        }
        restaurantRepository.deleteById(id);
    }
}
